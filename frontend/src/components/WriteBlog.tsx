import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Pin, Sparkles } from "lucide-react";
import TipTapEditor, { TipTapEditorHandle } from "./editor/TipTapEditor";
import { getPlainTextExcludingImages } from "../lib/editorText";
import { suggestExcerpt, suggestTags, suggestTitle } from "../lib/ai";

const EMPTY = { title: "", excerpt: "", content: "", tags: "", readTime: 5, pinned: false };

function isContentEmpty(html: string) {
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  const hasImage = /<img/i.test(html);
  return !stripped && !hasImage;
}

export default function WriteBlog() {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef<TipTapEditorHandle>(null);
  const [titleLoading, setTitleLoading] = useState(false);
  const [excerptLoading, setExcerptLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(false);

  const set = (key: keyof typeof EMPTY, val: string | number | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const contentText = () => {
    const editor = editorRef.current?.editor;
    return editor ? getPlainTextExcludingImages(editor) : "";
  };

  const handleSuggestTitle = async () => {
    const text = contentText() || form.excerpt;
    if (!text.trim()) {
      setError("Write some content first, then suggest a title.");
      return;
    }
    setError("");
    setTitleLoading(true);
    try {
      const { title } = await suggestTitle(text);
      set("title", title);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to suggest a title");
    } finally {
      setTitleLoading(false);
    }
  };

  const handleSuggestExcerpt = async () => {
    const text = contentText();
    if (!text.trim()) {
      setError("Write some content first, then suggest an excerpt.");
      return;
    }
    setError("");
    setExcerptLoading(true);
    try {
      const { excerpt } = await suggestExcerpt(text);
      set("excerpt", excerpt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to suggest an excerpt");
    } finally {
      setExcerptLoading(false);
    }
  };

  const handleSuggestTags = async () => {
    const text = contentText() || form.excerpt;
    if (!text.trim()) {
      setError("Write some content first, then suggest tags.");
      return;
    }
    setError("");
    setTagsLoading(true);
    try {
      const { tags } = await suggestTags(text);
      set("tags", tags);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to suggest tags");
    } finally {
      setTagsLoading(false);
    }
  };

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || isContentEmpty(form.content) || !form.excerpt.trim()) {
      setError("Title, excerpt and content are required.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/read/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          tags: form.tags,
          read_time: form.readTime,
          pinned: form.pinned,
          author: "Mustafa Shafique",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Failed to publish");

      setSaved(true);
      setForm(EMPTY);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl px-4 py-3 mb-6"
          >
            <Check className="w-4 h-4" />
            Blog published successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={publish}>
        {/* Meta fields */}
        <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 mb-4 space-y-4">
          <div className="flex items-start gap-2">
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post title..."
              className="flex-1 bg-transparent text-2xl md:text-3xl font-bold text-white placeholder-[#333] focus:outline-none"
            />
            <button
              type="button"
              title="Suggest a title from your content"
              onClick={handleSuggestTitle}
              disabled={titleLoading}
              className="shrink-0 mt-1.5 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-white/[0.07] text-[#888] hover:text-white hover:border-[#7B5CF6]/40 disabled:opacity-40 transition-colors"
            >
              {titleLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Suggest</span>
            </button>
          </div>

          <div className="h-px bg-white/[0.04]" />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-[#555] uppercase tracking-wider">Excerpt</label>
              <button
                type="button"
                title="Suggest an excerpt from your content"
                onClick={handleSuggestExcerpt}
                disabled={excerptLoading}
                className="flex items-center gap-1 text-[10px] text-[#666] hover:text-[#7B5CF6] disabled:opacity-40 transition-colors"
              >
                {excerptLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Suggest
              </button>
            </div>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              placeholder="A short description shown on the blog list..."
              className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-[#555] uppercase tracking-wider">Tags</label>
                <button
                  type="button"
                  title="Suggest tags from your content"
                  onClick={handleSuggestTags}
                  disabled={tagsLoading}
                  className="flex items-center gap-1 text-[10px] text-[#666] hover:text-[#7B5CF6] disabled:opacity-40 transition-colors"
                >
                  {tagsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Suggest
                </button>
              </div>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="React, TypeScript, Backend"
                className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Read time (min)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={form.readTime}
                onChange={(e) => set("readTime", parseInt(e.target.value) || 5)}
                className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <div
              onClick={() => set("pinned", !form.pinned)}
              className={`w-9 h-5 rounded-full transition-colors relative ${form.pinned ? "bg-[#7B5CF6]" : "bg-[#222]"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.pinned ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
            <span className="flex items-center gap-1.5 text-sm text-[#666]">
              <Pin className="w-3.5 h-3.5" />
              Pin this post
            </span>
          </label>
        </div>

        {/* Rich editor — doubles as the live preview, matches the published post 1:1 */}
        <div className="mb-4">
          <TipTapEditor ref={editorRef} value={form.content} onChange={(html) => set("content", html)} />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] disabled:opacity-60 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 group"
        >
          {saving ? "Publishing..." : "Publish post"}
          {!saving && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
        </button>
      </form>
    </div>
  );
}
