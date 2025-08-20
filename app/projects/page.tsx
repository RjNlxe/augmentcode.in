'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import type { Project } from '@/lib/supabase'
import ProjectCard from '@/components/ProjectCard'
import MainNavigation from '@/components/MainNavigation'
import Link from 'next/link'
import { Grid, List, Filter, Clock, TrendingUp } from 'lucide-react'

type FilterType = 'all' | 'popular' | 'latest'
type ViewMode = 'grid' | 'list'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchProjects()
  }, [filter])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      let orderBy = 'created_at'
      let orderDirection = 'desc'

      if (filter === 'popular') {
        orderBy = 'hearts_count'
      } else if (filter === 'latest') {
        orderBy = 'created_at'
      }

      const response = await fetch(
        `/api/projects?status=approved&orderBy=${orderBy}&orderDirection=${orderDirection}&limit=50`
      )
      
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

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filterButtons = [
    { key: 'all', label: 'All Projects', icon: Filter },
    { key: 'popular', label: 'Popular', icon: TrendingUp },
    { key: 'latest', label: 'Latest', icon: Clock },
  ] as const

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />

      <MainNavigation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-space tracking-tight">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Projects</span>
          </h1>
          <p className="text-zinc-400 font-space text-lg max-w-2xl mx-auto">
            Discover amazing projects built by the Augment Code community
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-zinc-400 font-space"
            />
          </div>

          {/* Filters and View Mode */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {/* Filter Buttons */}
            <div className="flex gap-2 bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-1.5">
              {filterButtons.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 font-space ${
                    filter === key
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                      : 'text-white/90 hover:text-white hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-1.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-white/90 hover:text-white hover:bg-emerald-500/10'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-white/90 hover:text-white hover:bg-emerald-500/10'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500/20 border-t-emerald-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Filter size={32} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 font-space">
              {searchTerm ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-zinc-400 font-space">
              {searchTerm ? 'Try adjusting your search terms.' : 'Be the first to share your project with the community!'}
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Create Project Button for authenticated users */}
        {user && (
          <div className="fixed bottom-6 right-6 z-50">
            <Link
              href="/my-projects"
              className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl p-4 shadow-2xl shadow-emerald-500/25 transition-all duration-300 hover:scale-110 border border-emerald-400/20 backdrop-blur-sm"
            >
              <span className="sr-only">My Projects</span>
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
