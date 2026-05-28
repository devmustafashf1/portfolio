import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, Copy, Pin, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API = `${import.meta.env.VITE_API_URL}/read`;

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  read_time: number;
  author: string;
  pinned: boolean;
}

export default function BlogDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareText, setShareText] = useState("Share");

  useEffect(() => {
    if (!id) return;
    fetch(`${API}/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setBlog)
      .catch(() => navigate("/blog"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareText("Copied!");
      setTimeout(() => setShareText("Share"), 1500);
    } catch {
      setShareText("Error");
      setTimeout(() => setShareText("Share"), 1500);
    }
  };

  const copyCode = async (code: string) => {
    try { await navigator.clipboard.writeText(code); } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="mb-12 h-4 w-24 bg-white/[0.04] rounded animate-pulse" />
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-white/[0.04] rounded w-3/4" />
            <div className="h-5 bg-white/[0.04] rounded w-full" />
            <div className="h-5 bg-white/[0.04] rounded w-5/6" />
            <div className="h-5 bg-white/[0.04] rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Back */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors mb-12"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          All posts
        </button>

        <article>
          {/* Pinned badge */}
          {blog.pinned && (
            <div className="flex items-center gap-2 mb-5">
              <Pin className="w-3.5 h-3.5 text-[#7B5CF6]" />
              <span className="text-xs font-medium text-[#7B5CF6] tracking-wide uppercase">Pinned post</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-[#141414] border border-white/[0.06] rounded-full text-[#555]">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-5">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-4 text-xs text-[#444]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {fmt(blog.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {blog.read_time} min read
              </span>
              <span className="text-[#333]">{blog.author}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition-colors px-3 py-1.5 bg-[#141414] border border-white/[0.07] rounded-lg"
            >
              <Share2 className="w-3 h-3" />
              {shareText}
            </button>
          </div>

          {/* Excerpt lead */}
          <p className="text-base text-[#888] leading-relaxed mb-8 border-l-2 border-[#7B5CF6]/40 pl-4">
            {blog.excerpt}
          </p>

          {/* Markdown content */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl md:text-2xl font-bold text-white mt-10 mb-4 leading-snug">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-white mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[#888] leading-relaxed mb-5">{children}</p>
              ),
              ul: ({ children }) => <ul className="space-y-2 mb-5 pl-1">{children}</ul>,
              ol: ({ children }) => (
                <ol className="space-y-2 mb-5 pl-4 list-decimal">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 text-[#888] leading-relaxed">
                  <span className="text-[#7B5CF6] mt-1.5 text-xs shrink-0">▸</span>
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#7B5CF6]/40 pl-4 my-6 text-[#666] italic">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                const text = String(children).replace(/\n$/, "");
                if (isBlock) {
                  return (
                    <div className="relative group my-5">
                      <button
                        onClick={() => copyCode(text)}
                        className="absolute top-3 right-3 p-1.5 bg-[#1a1a1a] border border-white/[0.07] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#555]" />
                      </button>
                      <pre className="bg-[#0f0f0f] border border-white/[0.07] rounded-xl px-5 py-4 overflow-x-auto text-sm text-[#ccc] font-mono">
                        <code>{text}</code>
                      </pre>
                    </div>
                  );
                }
                return (
                  <code className="text-[#7B5CF6] bg-[#7B5CF6]/10 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              },
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="text-[#7B5CF6] hover:text-[#9B7FF6] underline underline-offset-2 transition-colors">
                  {children}
                </a>
              ),
              hr: () => <hr className="border-white/[0.06] my-8" />,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* Bottom nav */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            All posts
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {shareText}
          </button>
        </div>
      </div>
    </div>
  );
}
