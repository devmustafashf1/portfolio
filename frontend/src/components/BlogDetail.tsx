import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Pin, User, Eye, Share2, Copy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  readTime: number;
  author: string;
  isPinned: boolean;
  views: number;
}

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareText, setShareText] = useState("Share");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        const res = await fetch(`https://portfolio-sm6r.onrender.com/read/${id}`);
        if (!res.ok) {
          navigate("/blog");
          return;
        }

        const data = await res.json();

        const mappedBlog: BlogPost = {
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content, // MARKDOWN FIELD
          tags: data.tags,
          createdAt: data.created_at,
          readTime: data.read_time,
          author: data.author,
          isPinned: data.pinned,
          views: parseInt(localStorage.getItem(`blog_views_${data.id}`) || "0"),
        };

        setBlog(mappedBlog);

        const currentViews = localStorage.getItem(`blog_views_${data.id}`);
        const newViews = currentViews ? parseInt(currentViews) + 1 : 1;
        localStorage.setItem(`blog_views_${data.id}`, newViews.toString());

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog", err);
        navigate("/blog");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setShareText("Copied!");
      setTimeout(() => setShareText("Share"), 1500);
    } catch {
      setShareText("Error");
      setTimeout(() => setShareText("Share"), 1500);
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied!");
    } catch {}
  };

  if (loading || !blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">

        {/* Back */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-10"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Main Card */}
        <article className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              {blog.isPinned && (
                <div className="flex items-center gap-2 text-cyan-400 mb-4">
                  <Pin className="w-4 h-4" /> <span>Pinned Post</span>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {blog.title}
              </h1>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg"
            >
              <Share2 className="w-4 h-4" /> {shareText}
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-slate-400 text-sm mb-8">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {blog.author}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {blog.readTime} min
            </span>

            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {blog.views} views
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* MARKDOWN RENDERING */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            className="prose prose-invert max-w-none"
            components={{
              code({ inline, children, className, ...props }) {
                const codeText = String(children).replace(/\n$/, "");
                const language = className?.replace("language-", "");

                return !inline ? (
                  <div className="relative group">
                    <button
                      onClick={() => copyCode(codeText)}
                      className="absolute top-2 right-2 bg-slate-700 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <pre className="rounded-lg border border-slate-700 overflow-auto">
                      <code className={className} {...props}>
                        {codeText}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-slate-700/40 px-1 py-0.5 rounded">
                    {children}
                  </code>
                );
              },

              img({ src, alt }) {
                return (
                  <img
                    src={src || ""}
                    alt={alt || ""}
                    className="rounded-lg border border-slate-700 cursor-zoom-in hover:opacity-90 transition"
                    onClick={() => window.open(src, "_blank")}
                  />
                );
              },
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
