'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import type { Project } from '@/lib/supabase'
import ProjectForm from '@/components/ProjectForm'
import MainNavigation from '@/components/MainNavigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react'

export default function MyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchMyProjects()
    }
  }, [user])

  const fetchMyProjects = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch(`/api/projects?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSuccess = (project: Project) => {
    setProjects(prev => [project, ...prev])
    setShowCreateForm(false)
  }

  const handleEditSuccess = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p))
    setEditingProject(null)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProjects(prev => prev.filter(p => p.id !== projectId))
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete project')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />
      case 'suspended':
        return <AlertCircle size={16} className="text-orange-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'suspended':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

        <MainNavigation />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-24 h-24 bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4 font-space">
            Authentication Required
          </h1>
          <p className="text-zinc-400 mb-6 font-space">
            Please sign in to view your projects.
          </p>
          <a
            href="/login"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-space shadow-lg shadow-emerald-500/20"
          >
            Sign In
          </a>
        </div>
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

        <MainNavigation />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-emerald-400 hover:text-emerald-300 font-medium font-space transition-colors duration-300"
            >
              ← Back to My Projects
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Project
            </h1>
            <ProjectForm
              onSuccess={handleCreateSuccess}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      </div>
    )
  }

  if (editingProject) {
    return (
      <div className="min-h-screen bg-black">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

        <MainNavigation />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => setEditingProject(null)}
              className="text-emerald-400 hover:text-emerald-300 font-medium font-space transition-colors duration-300"
            >
              ← Back to My Projects
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Edit Project
            </h1>
            <ProjectForm
              project={editingProject}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditingProject(null)}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

      <MainNavigation />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 font-space">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Projects</span>
            </h1>
            <p className="text-zinc-400 font-space">
              Manage your submitted projects
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-space shadow-lg shadow-emerald-500/20 hover:scale-105"
          >
            <Plus size={20} />
            Create Project
          </button>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first project to get started
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-space shadow-lg shadow-emerald-500/20"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-all duration-300 shadow-lg shadow-emerald-500/5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white font-space">
                        {project.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium font-space ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-zinc-400 mb-3 line-clamp-2 font-space">
                      {project.description}
                    </p>

                    <div className="text-sm text-zinc-500 font-space">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                      {project.hearts_count > 0 && (
                        <span className="ml-4 text-red-400">❤️ {project.hearts_count}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {project.status === 'approved' && (
                      <Link
                        href={`/projects/${project.id}`}
                        className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
                        title="View Project"
                      >
                        <Eye size={16} />
                      </Link>
                    )}

                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
                      title="Edit Project"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
