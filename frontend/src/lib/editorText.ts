import { Editor, JSONContent, generateJSON } from "@tiptap/core";

const IMAGE_NODE = "resizableImage";

/** Plain text of the whole post, with every image node skipped entirely. */
export function getPlainTextExcludingImages(editor: Editor): string {
  const parts: string[] = [];
  editor.state.doc.forEach((node) => {
    if (node.type.name === IMAGE_NODE) return;
    const text = node.textContent.trim();
    if (text) parts.push(text);
  });
  return parts.join("\n\n");
}

export interface TextSegment {
  type: "text";
  text: string;
}
export interface ImageSegment {
  type: "image";
  json: JSONContent;
}
export type Segment = TextSegment | ImageSegment;

/**
 * Splits the document into segments at image boundaries: every image becomes
 * its own fixed anchor, and every run of text blocks between images becomes
 * one text segment. Images are never included in a text segment's content,
 * so they can never be sent to (or altered by) the AI.
 */
export function splitIntoSegments(editor: Editor): Segment[] {
  const segments: Segment[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join("\n\n").trim();
    if (text) segments.push({ type: "text", text });
    buffer = [];
  };

  editor.state.doc.forEach((node) => {
    if (node.type.name === IMAGE_NODE) {
      flush();
      segments.push({ type: "image", json: node.toJSON() });
    } else {
      const text = node.textContent.trim();
      if (text) buffer.push(text);
    }
  });
  flush();

  return segments;
}

/**
 * Rebuilds the document from the original segment list, substituting each
 * text segment with the AI's restructured HTML (parsed back into TipTap
 * nodes) while re-inserting every image segment's original JSON untouched
 * and in its original position.
 */
export function applyStructuredSegments(
  editor: Editor,
  segments: Segment[],
  htmlResults: string[]
) {
  let resultIndex = 0;
  const content: JSONContent[] = [];

  for (const segment of segments) {
    if (segment.type === "image") {
      content.push(segment.json);
      continue;
    }
    const html = htmlResults[resultIndex++];
    if (!html) continue;
    const generated = generateJSON(html, editor.extensionManager.extensions);
    if (Array.isArray(generated.content)) content.push(...generated.content);
  }

  editor.chain().focus().setContent({ type: "doc", content }).run();
}
