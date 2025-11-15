import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Pin, User } from 'lucide-react';

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
}

interface BlogProps {
  onBack: () => void;
}

interface BlogDetailProps {
  blog: BlogPost;
  onBack: () => void;
}

const BlogDetail = ({ blog, onBack }: BlogDetailProps) => {
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

const Blog = ({ onBack }: BlogProps) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  // Mock data - replace with actual data from your backend
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with React and TypeScript',
      excerpt: 'Learn how to set up a modern React project with TypeScript for better development experience.',
      content: 'React and TypeScript make a powerful combination for building modern web applications. In this comprehensive guide, we\'ll walk through setting up a new React project with TypeScript from scratch.\n\nFirst, let\'s create a new React app with TypeScript template:\n\n```bash\nnpx create-react-app my-app --template typescript\n```\n\nThis command creates a new React application with TypeScript configuration already set up. The TypeScript compiler will help catch errors at compile time, making your code more robust and maintainable.\n\nNext, we\'ll explore the key benefits of using TypeScript with React:\n\n1. **Type Safety**: Catch errors before runtime\n2. **Better IDE Support**: Enhanced autocomplete and refactoring\n3. **Improved Code Documentation**: Types serve as documentation\n4. **Easier Refactoring**: Confident code changes with type checking\n\nLet\'s look at a simple component example:\n\n```tsx\ninterface Props {\n  name: string;\n  age: number;\n}\n\nconst UserCard: React.FC<Props> = ({ name, age }) => {\n  return (\n    <div>\n      <h2>{name}</h2>\n      <p>Age: {age}</p>\n    </div>\n  );\n};\n```\n\nThis approach ensures that your components receive the correct props and helps prevent runtime errors.',
      tags: ['React', 'TypeScript', 'Web Development'],
      createdAt: '2024-01-15',
      readTime: 5,
      author: 'GM',
      isPinned: true
    },
    {
      id: '2',
      title: 'Building Responsive UIs with Tailwind CSS',
      excerpt: 'Discover the power of utility-first CSS framework for creating beautiful responsive designs.',
      content: 'Tailwind CSS revolutionizes the way we write CSS by providing utility classes that can be composed to build any design directly in your markup.\n\nUnlike traditional CSS frameworks that provide pre-designed components, Tailwind gives you low-level utility classes that let you build completely custom designs without ever leaving your HTML.\n\n## Getting Started\n\nInstall Tailwind CSS in your project:\n\n```bash\nnpm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n```\n\n## Key Benefits\n\n1. **Rapid Development**: Build faster with utility classes\n2. **Consistent Design**: Predefined spacing and color scales\n3. **Responsive Design**: Mobile-first responsive modifiers\n4. **Small Bundle Size**: Only the CSS you use gets included\n\n## Example Usage\n\n```html\n<div class="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">\n  <img class="w-full h-48 object-cover rounded-t-lg" src="image.jpg" alt="Card">\n  <div class="pt-4">\n    <h2 class="text-xl font-bold text-gray-800">Card Title</h2>\n    <p class="text-gray-600 mt-2">Card description goes here.</p>\n  </div>\n</div>\n```\n\nThis approach leads to faster development and more maintainable code.',
      tags: ['CSS', 'Tailwind', 'UI/UX'],
      createdAt: '2024-01-10',
      readTime: 8,
      author: 'GM',
      isPinned: false
    }
  ];
  
  // Sort blogs: pinned first, then by date
  const sortedBlogs = [...blogPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  if (selectedBlog) {
    return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-6 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
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

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            sortedBlogs.map((post, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;