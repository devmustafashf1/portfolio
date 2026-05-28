import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Eye, LogOut, Pencil, Pin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Tab = "write" | "preview";

const EMPTY = { title: "", excerpt: "", content: "", tags: "", readTime: 5, pinned: false };

export default function WriteBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [tab, setTab] = useState<Tab>("write");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof EMPTY, val: string | number | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.content.trim() || !form.excerpt.trim()) {
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/[0.05] sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-[#555] hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <div className="w-px h-4 bg-white/[0.07]" />
            <div className="flex items-center gap-2">
              <Pencil className="w-3.5 h-3.5 text-[#7B5CF6]" />
              <span className="text-sm font-medium">Blog Editor</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Write / Preview toggle */}
            <div className="flex items-center bg-[#0f0f0f] border border-white/[0.06] rounded-lg p-0.5">
              {(["write", "preview"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                    tab === t
                      ? "bg-[#7B5CF6] text-white"
                      : "text-[#555] hover:text-white"
                  }`}
                >
                  {t === "write" ? <><Pencil className="w-3 h-3 inline mr-1" />Write</> : <><Eye className="w-3 h-3 inline mr-1" />Preview</>}
                </button>
              ))}
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-[#555] hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Success toast */}
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
            {/* Title */}
            <div>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Post title..."
                className="w-full bg-transparent text-2xl md:text-3xl font-bold text-white placeholder-[#333] focus:outline-none"
              />
            </div>

            <div className="h-px bg-white/[0.04]" />

            {/* Excerpt */}
            <div>
              <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={2}
                placeholder="A short description shown on the blog list..."
                className="w-full bg-[#141414] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors resize-none"
              />
            </div>

            {/* Tags + Read time + Pinned */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">Tags</label>
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

            {/* Pinned toggle */}
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

          {/* Editor / Preview */}
          <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
            {tab === "write" ? (
              <textarea
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={`## Start writing...\n\nSupports **markdown** — headings, lists, code blocks, links, everything.`}
                className="w-full bg-transparent px-6 py-6 text-sm text-[#ccc] placeholder-[#333] focus:outline-none font-mono leading-relaxed resize-none"
                style={{ minHeight: "480px" }}
              />
            ) : (
              <div className="px-6 py-6 min-h-[480px]">
                {form.content.trim() ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-8 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h3>,
                      p: ({ children }) => <p className="text-[#888] leading-relaxed mb-4">{children}</p>,
                      ul: ({ children }) => <ul className="space-y-1.5 mb-4 pl-1">{children}</ul>,
                      ol: ({ children }) => <ol className="space-y-1.5 mb-4 pl-4 list-decimal">{children}</ol>,
                      li: ({ children }) => (
                        <li className="flex gap-2 text-[#888]">
                          <span className="text-[#7B5CF6] mt-1.5 text-xs shrink-0">▸</span>
                          <span>{children}</span>
                        </li>
                      ),
                      strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-[#7B5CF6]/40 pl-4 my-5 text-[#666] italic">{children}</blockquote>
                      ),
                      code: ({ children, className }) => {
                        const isBlock = className?.includes("language-");
                        return isBlock ? (
                          <pre className="bg-[#141414] border border-white/[0.07] rounded-xl px-5 py-4 overflow-x-auto text-sm text-[#ccc] font-mono my-4">
                            <code>{String(children).replace(/\n$/, "")}</code>
                          </pre>
                        ) : (
                          <code className="text-[#7B5CF6] bg-[#7B5CF6]/10 px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      },
                      hr: () => <hr className="border-white/[0.06] my-6" />,
                    }}
                  >
                    {form.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-[#333] text-sm">Nothing to preview yet. Start writing on the Write tab.</p>
                )}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-4">
              {error}
            </p>
          )}

          {/* Publish */}
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
    </div>
  );
}
