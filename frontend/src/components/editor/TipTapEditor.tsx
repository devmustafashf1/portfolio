import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  Sparkles,
  SquareCode,
  Strikethrough,
  Undo2,
  Wand2,
} from "lucide-react";
import ResizableImage from "./extensions/resizableImage";
import { uploadImage } from "../../lib/uploadImage";
import { improveText, structureSegments } from "../../lib/ai";
import { applyStructuredSegments, splitIntoSegments, TextSegment } from "../../lib/editorText";
import "../../styles/blogContent.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export interface TipTapEditorHandle {
  editor: Editor | null;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? "bg-[#7B5CF6] text-white" : "text-[#666] hover:text-white hover:bg-white/[0.06]"
      }`}
    >
      {children}
    </button>
  );
}

const TipTapEditor = forwardRef<TipTapEditorHandle, Props>(function TipTapEditor(
  { value, onChange },
  ref
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [aiBusy, setAiBusy] = useState<"improve" | "structure" | null>(null);
  const [aiError, setAiError] = useState("");
  const [canImprove, setCanImprove] = useState(false);

  const updateSelectionState = useCallback((editorInstance: Editor) => {
    const { from, to, empty } = editorInstance.state.selection;
    if (empty) {
      setCanImprove(false);
      return;
    }
    let hasImage = false;
    editorInstance.state.doc.nodesBetween(from, to, (node) => {
      if (node.type.name === "resizableImage") hasImage = true;
    });
    const sameParent = editorInstance.state.selection.$from.sameParent(
      editorInstance.state.selection.$to
    );
    const text = editorInstance.state.doc.textBetween(from, to, " ").trim();
    setCanImprove(!hasImage && sameParent && text.length > 0);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing... insert images anytime with the toolbar.",
      }),
      ResizableImage,
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
      updateSelectionState(e);
    },
    onSelectionUpdate: ({ editor: e }) => updateSelectionState(e),
    editorProps: {
      attributes: {
        class: "blog-content focus:outline-none min-h-[420px]",
      },
    },
  });

  useImperativeHandle(ref, () => ({ editor }), [editor]);

  // Keep editor in sync if the parent resets `value` (e.g. after publish clears the form)
  useEffect(() => {
    if (editor && value === "" && editor.getHTML() !== "<p></p>" && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleImagePick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    setUploadError("");
    setUploading(true);
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setResizableImage({ src: url, alt: file.name }).run();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Failed to upload image");
      setTimeout(() => setUploadError(""), 4000);
    } finally {
      setUploading(false);
    }
  };

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImprove = async () => {
    if (!editor || !canImprove) return;
    const { from, to } = editor.state.selection;
    const original = editor.state.doc.textBetween(from, to, " ");
    if (!original.trim()) return;

    setAiError("");
    setAiBusy("improve");
    try {
      const { text } = await improveText(original);
      editor.chain().focus().insertContentAt({ from, to }, text).run();
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Failed to improve text");
      setTimeout(() => setAiError(""), 5000);
    } finally {
      setAiBusy(null);
    }
  };

  const handleStructure = async () => {
    if (!editor) return;
    const segments = splitIntoSegments(editor);
    const textSegments = segments.filter((s): s is TextSegment => s.type === "text");

    if (!textSegments.length) {
      setAiError("Add some text before formatting with headings.");
      setTimeout(() => setAiError(""), 4000);
      return;
    }

    setAiError("");
    setAiBusy("structure");
    try {
      const { segments: htmlResults } = await structureSegments(textSegments.map((s) => s.text));
      applyStructuredSegments(editor, segments, htmlResults);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Failed to restructure content");
      setTimeout(() => setAiError(""), 5000);
    } finally {
      setAiBusy(null);
    }
  };

  if (!editor) return null;

  return (
    <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-white/[0.06]">
        <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-white/[0.07] mx-1" />

        <ToolbarButton title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-white/[0.07] mx-1" />

        <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <SquareCode className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-white/[0.07] mx-1" />

        <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Insert image" onClick={handleImagePick} disabled={uploading}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
        </ToolbarButton>

        <div className="w-px h-5 bg-white/[0.07] mx-1" />

        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="w-4 h-4" />
        </ToolbarButton>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* AI assist row — never touches images */}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-[#7B5CF6]/[0.03]">
        <span className="text-[10px] font-medium text-[#7B5CF6] uppercase tracking-wider px-1">AI</span>
        <button
          type="button"
          title={canImprove ? "Improve the selected text" : "Select some text within a single paragraph first"}
          onClick={handleImprove}
          disabled={!canImprove || aiBusy !== null}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-white/[0.07] text-[#888] hover:text-white hover:border-[#7B5CF6]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {aiBusy === "improve" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
          Improve selection
        </button>
        <button
          type="button"
          title="Add headings and clean structure to the whole post — images stay exactly where they are"
          onClick={handleStructure}
          disabled={aiBusy !== null}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-white/[0.07] text-[#888] hover:text-white hover:border-[#7B5CF6]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {aiBusy === "structure" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          Add headings
        </button>
      </div>

      {(uploadError || aiError) && (
        <p className="text-xs text-red-400 bg-red-400/10 border-b border-red-400/20 px-4 py-2">
          {uploadError || aiError}
        </p>
      )}

      {/* Editor surface — max-w matches BlogDetail's article width so floats/wrap match published output */}
      <div className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
});

export default TipTapEditor;
