import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageView from "./ResizableImageView";

export type ImageAlign = "left" | "center" | "right" | "full";

export interface ResizableImageAttrs {
  src: string;
  alt?: string | null;
  title?: string | null;
  align?: ImageAlign;
  width?: number | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      setResizableImage: (attrs: ResizableImageAttrs) => ReturnType;
    };
  }
}

const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  atom: true,
  draggable: true,
  inline: false,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      align: { default: "center" },
      width: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[data-align]",
        getAttrs: (el) => {
          const element = el as HTMLElement;
          const styleWidth = element.style.width
            ? parseInt(element.style.width, 10)
            : null;
          return {
            src: element.getAttribute("src"),
            alt: element.getAttribute("alt"),
            title: element.getAttribute("title"),
            align: element.getAttribute("data-align") || "center",
            width: Number.isFinite(styleWidth) ? styleWidth : null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, align, width } = HTMLAttributes as ResizableImageAttrs;
    return [
      "img",
      mergeAttributes({
        src,
        alt: alt || undefined,
        title: title || undefined,
        class: "blog-img",
        "data-align": align || "center",
        style: width ? `width:${width}px` : undefined,
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },

  addCommands() {
    return {
      setResizableImage:
        (attrs: ResizableImageAttrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { align: "center", width: null, ...attrs },
          });
        },
    };
  },
});

export default ResizableImage;
