import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, ArrowLeft, Save } from 'lucide-react'

interface Work {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  projectUrl?: string
}

interface AdminPanelProps {
  onBack: () => void
}

const AdminPanel = ({ onBack }: AdminPanelProps) => {
  const [works, setWorks] = useState<Work[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    imageUrl: '',
    projectUrl: ''
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

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Work
          </button>
        </div>

        {/* Add Work Form */}
        {showAddForm && (
          <motion.div
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8"
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
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400"
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
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400"
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
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400 h-24 resize-none"
                  placeholder="Brief description of the project"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400"
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
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-slate-400"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-slate-700 rounded-lg text-slate-300 hover:border-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Work
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Works List */}
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
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                    <p className="text-slate-400 mb-3">{work.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-700/50 px-3 py-1 rounded-full text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors ml-4"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel