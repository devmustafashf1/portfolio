import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Work {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  projectUrl?: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  createdAt: string
  readTime: number
  author: string
  isPinned: boolean
  views: number
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'works' | 'blogs'>('works')
  const [works, setWorks] = useState<Work[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    imageUrl: '',
    projectUrl: ''
  })
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    readTime: 5,
    author: 'GM',
    isPinned: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newWork: Work = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: formData.imageUrl || undefined,
      projectUrl: formData.projectUrl || undefined
    }

    // TODO: Replace with actual API call
    console.log('Adding new work:', newWork)
    
    setWorks([...works, newWork])
    setFormData({ title: '', description: '', tags: '', imageUrl: '', projectUrl: '' })
    setShowAddForm(false)
  }

  const handleDelete = async (id: string) => {
    // TODO: Replace with actual API call
    console.log('Deleting work:', id)
    setWorks(works.filter(work => work.id !== id))
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title: blogFormData.title,
      content: blogFormData.content,
      excerpt: blogFormData.excerpt,
      tags: blogFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString().split('T')[0],
      readTime: blogFormData.readTime,
      author: blogFormData.author,
      isPinned: blogFormData.isPinned,
      views: 0
    }

    // TODO: Replace with actual API call
    console.log('Adding new blog:', newBlog)
    
    setBlogs([...blogs, newBlog])
    setBlogFormData({ title: '', content: '', excerpt: '', tags: '', readTime: 5, author: 'GM', isPinned: false })
    setShowAddForm(false)
  }

  const handleBlogDelete = async (id: string) => {
    // TODO: Replace with actual API call
    console.log('Deleting blog:', id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            {activeTab === 'works' ? 'Add Work' : 'Add Blog'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8">
          <button
            onClick={() => setActiveTab('works')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'works'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Works
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'blogs'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Blogs
          </button>
        </div>

        {/* Add Work Form */}
        {showAddForm && activeTab === 'works' && (
          <motion.div
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Work</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="Project title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 h-20 sm:h-24 resize-none text-sm sm:text-base"
                  placeholder="Brief description of the project"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 sm:px-6 py-2 border border-slate-700 rounded-lg text-slate-300 hover:border-slate-600 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 sm:px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <Save className="w-4 h-4" />
                  Save Work
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Add Blog Form */}
        {showAddForm && activeTab === 'blogs' && (
          <motion.div
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Blog</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={blogFormData.title}
                    onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="Blog title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={blogFormData.author}
                    onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={blogFormData.readTime}
                    onChange={(e) => setBlogFormData({ ...blogFormData, readTime: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                    placeholder="5"
                    min="1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blogFormData.isPinned}
                      onChange={(e) => setBlogFormData({ ...blogFormData, isPinned: e.target.checked })}
                      className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-slate-300">Pin this blog</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={blogFormData.excerpt}
                  onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 h-16 sm:h-20 resize-none text-sm sm:text-base"
                  placeholder="Brief description of the blog post"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Content *
                </label>
                <textarea
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 h-32 sm:h-40 resize-none text-sm sm:text-base"
                  placeholder="Full blog content (supports markdown)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={blogFormData.tags}
                  onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 text-sm sm:text-base"
                  placeholder="React, TypeScript, Web Development"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 sm:px-6 py-2 border border-slate-700 rounded-lg text-slate-300 hover:border-slate-600 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 sm:px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <Save className="w-4 h-4" />
                  Save Blog
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'works' ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Manage Works ({works.length})
            </h2>
            
            {works.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                <p className="text-slate-400">No works added yet. Click "Add Work" to get started.</p>
              </div>
            ) : (
              works.map((work) => (
                <motion.div
                  key={work.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 hover:border-slate-700 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">{work.title}</h3>
                      <p className="text-slate-400 mb-3 text-sm sm:text-base break-words">{work.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-700/50 px-2 sm:px-3 py-1 rounded-full text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(work.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Manage Blogs ({blogs.length})
            </h2>
            
            {blogs.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                <p className="text-slate-400">No blogs added yet. Click "Add Blog" to get started.</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 hover:border-slate-700 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white break-words">{blog.title}</h3>
                        {blog.isPinned && (
                          <span className="text-cyan-400 text-xs bg-cyan-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                            📌 Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 mb-2 text-sm sm:text-base break-words">{blog.excerpt}</p>
                      <p className="text-slate-500 text-xs sm:text-sm mb-3">By {blog.author} • {blog.createdAt} • {blog.readTime} min read • {blog.views} views</p>
                      <div className="flex gap-2 flex-wrap">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-700/50 px-2 sm:px-3 py-1 rounded-full text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleBlogDelete(blog.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel