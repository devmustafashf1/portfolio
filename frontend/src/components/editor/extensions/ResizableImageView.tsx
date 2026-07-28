import { useCallback, useRef, useState } from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, Maximize2, Trash2 } from "lucide-react";
import type { ImageAlign } from "./resizableImage";

const MIN_WIDTH = 120;

const ALIGN_OPTIONS: { value: ImageAlign; icon: typeof AlignLeft; label: string }[] = [
  { value: "left", icon: AlignLeft, label: "Float left" },
  { value: "center", icon: AlignCenter, label: "Center" },
  { value: "right", icon: AlignRight, label: "Float right" },
  { value: "full", icon: Maximize2, label: "Full width" },
];

export default function ResizableImageView({
  node,
  updateAttributes,
  deleteNode,
  selected,
  editor,
}: NodeViewProps) {
  const { src, alt, align, width } = node.attrs as {
    src: string;
    alt: string | null;
    align: ImageAlign;
    width: number | null;
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<number | null>(null);

  const maxWidth = useCallback(() => {
    const containerWidth =
      editor?.view?.dom?.getBoundingClientRect().width || 680;
    if (align === "left" || align === "right") {
      return Math.round(containerWidth * 0.65);
    }
    return Math.round(containerWidth);
  }, [align, editor]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = imgRef.current?.offsetWidth || width || 300;
    const cap = maxWidth();
    setDragging(true);
    document.body.style.userSelect = "none";

    const onMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const next = Math.min(Math.max(startWidth + delta, MIN_WIDTH), cap);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        updateAttributes({ width: next });
      });
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.userSelect = "";
      setDragging(false);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <NodeViewWrapper
      as="div"
      className="blog-img-node group/img"
      data-align={align}
      data-selected={selected || undefined}
      ref={wrapperRef}
      style={width ? { width: `${width}px` } : undefined}
    >
      <div className="relative inline-block max-w-full">
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          className={`blog-img block max-w-full rounded-xl transition-shadow ${
            selected ? "ring-2 ring-[#7B5CF6]" : ""
          }`}
          style={width ? { width: `${width}px`, height: "auto" } : undefined}
          draggable={false}
        />

        {/* Floating align/delete toolbar */}
        <div
          contentEditable={false}
          className={`absolute top-2 right-2 flex items-center gap-1 bg-[#0f0f0f]/95 border border-white/[0.08] rounded-lg p-1 shadow-lg transition-opacity ${
            selected ? "opacity-100" : "opacity-0 group-hover/img:opacity-100"
          }`}
        >
          {ALIGN_OPTIONS.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              type="button"
              title={label}
              onClick={() => updateAttributes({ align: value })}
              className={`p-1.5 rounded-md transition-colors ${
                align === value
                  ? "bg-[#7B5CF6] text-white"
                  : "text-[#666] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
          <div className="w-px h-4 bg-white/[0.08] mx-0.5" />
          <button
            type="button"
            title="Delete image"
            onClick={() => deleteNode()}
            className="p-1.5 rounded-md text-[#666] hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Resize handle */}
        <div
          contentEditable={false}
          onPointerDown={handlePointerDown}
          className={`absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-sm bg-[#7B5CF6] border border-white/40 cursor-nwse-resize transition-opacity ${
            selected || dragging ? "opacity-100" : "opacity-0 group-hover/img:opacity-100"
          }`}
        />
      </div>
    </NodeViewWrapper>
  );
}
