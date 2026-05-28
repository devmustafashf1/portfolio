import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Pin, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = `${import.meta.env.VITE_API_URL}/read`;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  read_time: number;
  author: string;
  pinned: boolean;
}

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareStates, setShareStates] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setBlogs(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pinned = blogs.find((b) => b.pinned);
  const rest = blogs.filter((b) => !b.pinned);

  const handleShare = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareStates((p) => ({ ...p, [id]: "Copied!" }));
      setTimeout(() => setShareStates((p) => ({ ...p, [id]: "" })), 2000);
    } catch {
      setShareStates((p) => ({ ...p, [id]: "Failed" }));
      setTimeout(() => setShareStates((p) => ({ ...p, [id]: "" })), 2000);
    }
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors mb-12"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          Back to portfolio
        </button>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-3">Writing</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Thoughts on building & shipping
          </h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
                <div className="h-5 bg-white/[0.04] rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/[0.04] rounded w-full mb-2" />
                <div className="h-4 bg-white/[0.04] rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-16 text-[#444]">No posts yet.</div>
        )}

        {/* Pinned featured post */}
        {!loading && pinned && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-10"
          >
            <div
              onClick={() => navigate(`/blog/${pinned.id}`)}
              className="bg-[#0f0f0f] border border-white/[0.06] hover:border-[#7B5CF6]/30 rounded-2xl p-6 md:p-8 cursor-pointer group transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <Pin className="w-3.5 h-3.5 text-[#7B5CF6]" />
                <span className="text-xs font-medium text-[#7B5CF6] tracking-wide uppercase">Pinned</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold leading-snug mb-3 group-hover:text-[#7B5CF6] transition-colors">
                {pinned.title}
              </h2>

              <p className="text-sm text-[#666] leading-relaxed mb-5">{pinned.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-[#444]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {fmt(pinned.created_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {pinned.read_time} min read
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleShare(pinned.id, e)}
                    className="flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition-colors px-3 py-1.5 bg-[#141414] border border-white/[0.07] rounded-lg"
                  >
                    <Share2 className="w-3 h-3" />
                    {shareStates[pinned.id] || "Share"}
                  </button>
                  <span className="flex items-center gap-1 text-xs text-[#7B5CF6] font-medium group-hover:gap-2 transition-all">
                    Read post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.04]">
                {pinned.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-[#141414] border border-white/[0.06] rounded-full text-[#555]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Divider */}
        {!loading && rest.length > 0 && (
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <span className="text-xs text-[#333] uppercase tracking-widest">All posts</span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>
        )}

        {/* Post list */}
        {!loading && (
          <div className="space-y-3">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-[#0f0f0f] border border-white/[0.06] hover:border-[#7B5CF6]/25 rounded-2xl px-5 py-5 cursor-pointer group transition-all duration-200 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold leading-snug mb-1.5 group-hover:text-[#7B5CF6] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[#333]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {fmt(post.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time} min
                    </span>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[#333]">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#333] group-hover:text-[#7B5CF6] group-hover:translate-x-0.5 transition-all" />
                  <button
                    onClick={(e) => handleShare(post.id, e)}
                    className="flex items-center gap-1 text-xs text-[#444] hover:text-white transition-colors"
                  >
                    <Share2 className="w-3 h-3" />
                    {shareStates[post.id] || "Share"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
