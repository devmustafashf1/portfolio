import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Pin,
  User,
  Eye,
  Send,
  Plus,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Blog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareStates, setShareStates] = useState<{ [key: string]: string }>({});
  const [editorOpen, setEditorOpen] = useState(false);
  const [newMarkdown, setNewMarkdown] = useState("");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('https://portfolio-sm6r.onrender.com/read');
        const data = await res.json();

        const mappedBlogs: BlogPost[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content, // MARKDOWN FIELD
          tags: item.tags || [],
          createdAt: item.created_at,
          readTime: item.read_time,
          author: item.author,
          isPinned: item.pinned,
          views: parseInt(localStorage.getItem(`blog_views_${item.id}`) || '0'),
        }));

        mappedBlogs.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setBlogs(mappedBlogs);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blogs', err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleShare = async (blogId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#/blog/${blogId}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setShareStates(prev => ({ ...prev, [blogId]: 'Link copied!' }));
      setTimeout(() => {
        setShareStates(prev => ({ ...prev, [blogId]: 'Share' }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      setShareStates(prev => ({ ...prev, [blogId]: 'Copy failed' }));
      setTimeout(() => {
        setShareStates(prev => ({ ...prev, [blogId]: 'Share' }));
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">

        {/* Top Bar */}
          <div className="flex items-center mb-12 relative">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          
            {/* Blog Title */}
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-bold text-white">
              Blog
            </h1>
          </div>


        {/* Blog List */}
        {loading ? (
          <div className="text-center py-16 text-slate-400">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 text-slate-400">No blog posts yet.</div>
        ) : (
          <div className="space-y-8">
            {blogs.map((post, index) => (
              <motion.article
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all cursor-pointer relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {post.isPinned && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-cyan-400">
                    <Pin className="w-4 h-4" />
                    <span className="text-xs font-medium">Pinned</span>
                  </div>
                )}

                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors pr-16">
                  {post.title}
                </h2>

                <p className="text-slate-300 mb-4">{post.excerpt}</p>

                <button
                  onClick={(e) => handleShare(post.id, e)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 rounded-lg"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>{shareStates[post.id] || 'Share'}</span>
                </button>
              </motion.article>
            ))}
          </div>
        )}

        {/* MARKDOWN EDITOR MODAL */}
        <AnimatePresence>
          {editorOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-2xl w-full shadow-xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">New Blog (Markdown)</h2>
                  <button onClick={() => setEditorOpen(false)}>
                    <X className="w-6 h-6 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <textarea
                  value={newMarkdown}
                  onChange={(e) => setNewMarkdown(e.target.value)}
                  className="w-full h-72 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                  placeholder="Write markdown here..."
                />

                <p className="text-sm text-slate-500 mt-2">
                  ⚠ Send this markdown to backend developer to store in the <strong>content</strong> field.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Blog;
