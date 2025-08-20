'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import type { Project } from '@/lib/supabase'
import MainNavigation from '@/components/MainNavigation'
import Link from 'next/link'
import { CheckCircle, XCircle, AlertCircle, Trash2, Eye, ExternalLink, Github, User, Calendar } from 'lucide-react'

type TabType = 'pending' | 'approved' | 'all'

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user?.is_admin) {
      fetchProjects()
    }
  }, [user, activeTab])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const status = activeTab === 'all' ? '' : `status=${activeTab}`
      const response = await fetch(`/api/projects?${status}&orderBy=created_at&orderDirection=desc&limit=100`)
      
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

  const handleStatusUpdate = async (projectId: string, newStatus: 'approved' | 'rejected' | 'suspended') => {
    setActionLoading(projectId)
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const data = await response.json()
        setProjects(prev => prev.map(p => p.id === projectId ? data.project : p))
      } else {
        alert('Failed to update project status')
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      alert('Failed to update project status')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to permanently delete this project? This action cannot be undone.')) {
      return
    }

    setActionLoading(projectId)
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
    } finally {
      setActionLoading(null)
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to access the admin dashboard.
          </p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
        </div>
        </div>
      </div>
    )
  }

  if (!user.is_admin) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have permission to access this page.
          </p>
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Projects
          </Link>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 font-space">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Dashboard</span>
          </h1>
          <p className="text-zinc-400 font-space">
            Manage project submissions and approvals
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-1.5">
              <nav className="flex space-x-2">
                {[
                  { key: 'pending', label: 'Pending', count: projects.filter(p => p.status === 'pending').length },
                  { key: 'approved', label: 'Approved', count: projects.filter(p => p.status === 'approved').length },
                  { key: 'all', label: 'All Projects', count: projects.length },
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as TabType)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 font-space ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                        : 'text-white/90 hover:text-white hover:bg-emerald-500/10'
                    }`}
                  >
                    {label} ({loading ? '...' : count})
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No projects found for this category.
            </p>
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
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-space ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-zinc-400 mb-3 font-space">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3 font-space">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {project.user?.name || 'Anonymous'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(project.created_at)}
                      </div>
                      {project.hearts_count > 0 && (
                        <span className="text-red-400">❤️ {project.hearts_count}</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {project.website_url && (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <ExternalLink size={14} />
                          Website
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
                        >
                          <Github size={14} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {project.status === 'approved' && (
                      <a
                        href={`/projects/${project.id}`}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        title="View Project"
                      >
                        <Eye size={16} />
                      </a>
                    )}
                    
                    {project.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(project.id, 'approved')}
                          disabled={actionLoading === project.id}
                          className="p-2 text-gray-500 hover:text-green-600 transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                        
                        <button
                          onClick={() => handleStatusUpdate(project.id, 'rejected')}
                          disabled={actionLoading === project.id}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    
                    {project.status === 'approved' && (
                      <button
                        onClick={() => handleStatusUpdate(project.id, 'suspended')}
                        disabled={actionLoading === project.id}
                        className="p-2 text-gray-500 hover:text-orange-600 transition-colors disabled:opacity-50"
                        title="Suspend"
                      >
                        <AlertCircle size={16} />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={actionLoading === project.id}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Delete"
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
