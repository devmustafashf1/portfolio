import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Pin, User, Eye, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareText, setShareText] = useState('Share');

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        const res = await fetch(`https://portfolio-sm6r.onrender.com/read/${id}`);
        if (!res.ok) {
          navigate('/blog');
          return;
        }
        
        const data = await res.json();
        const mappedBlog: BlogPost = {
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          tags: data.tags,
          createdAt: data.created_at,
          readTime: data.read_time,
          author: data.author,
          isPinned: data.pinned,
          views: parseInt(localStorage.getItem(`blog_views_${data.id}`) || '0')
        };

        setBlog(mappedBlog);
        
        // Update view count
        const currentViews = localStorage.getItem(`blog_views_${data.id}`);
        const newViews = currentViews ? parseInt(currentViews) + 1 : 1;
        localStorage.setItem(`blog_views_${data.id}`, newViews.toString());
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blog', err);
        navigate('/blog');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setShareText('Link copied!');
        setTimeout(() => setShareText('Share'), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setShareText('Link copied!');
        setTimeout(() => setShareText('Share'), 2000);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      setShareText('Copy failed');
      setTimeout(() => setShareText('Share'), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">
          <div className="text-center py-16 text-slate-400">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </button>

        <article className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {blog.isPinned && (
                <div className="flex items-center gap-2 text-cyan-400 mb-4">
                  <Pin className="w-4 h-4" />
                  <span className="text-sm font-medium">Pinned Post</span>
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {blog.title}
              </h1>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              {shareText}
            </button>
          </div>
          
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

export default BlogDetail;