import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Pin, User, Eye } from 'lucide-react';
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

interface BlogDetailProps {
  blog: BlogPost;
  onBack: () => void;
}

const BlogDetail = ({ blog, onBack }: BlogDetailProps) => {
  useEffect(() => {
    const currentViews = localStorage.getItem(`blog_views_${blog.id}`);
    const newViews = currentViews ? parseInt(currentViews) + 1 : 1;
    localStorage.setItem(`blog_views_${blog.id}`, newViews.toString());
  }, [blog.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </button>

        <article className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
          {blog.isPinned && (
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <Pin className="w-4 h-4" />
              <span className="text-sm font-medium">Pinned Post</span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {blog.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By {blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.readTime} min read
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {blog.views} views
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('https://portfolio-sm6r.onrender.com/read');
        const data = await res.json();

        // Map API response to BlogPost type
        const mappedBlogs: BlogPost[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          tags: item.tags,
          createdAt: item.created_at,
          readTime: item.read_time,
          author: item.author,
          isPinned: item.pinned,
          views: parseInt(localStorage.getItem(`blog_views_${item.id}`) || '0')
        }));

        // Sort: pinned first, then newest first
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

  if (selectedBlog) {
    return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Blog
          </h1>
          
          <div></div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 text-slate-400">No blog posts yet. Check back soon!</div>
        ) : (
          <div className="space-y-8">
            {blogs.map((post, index) => (
              <motion.article
                key={post.id}
                onClick={() => setSelectedBlog(post)}
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
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors pr-16">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                      <User className="w-4 h-4" />
                      <span>By {post.author}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views} views
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
