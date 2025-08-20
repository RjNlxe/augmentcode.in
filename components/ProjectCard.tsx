'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { Project } from '@/lib/supabase'
import { Heart, ExternalLink, Github, User, Calendar } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { getGuestId } from '@/lib/guest-id'

interface ProjectCardProps {
  project: Project
  viewMode: 'grid' | 'list'
}

export default function ProjectCard({ project, viewMode }: ProjectCardProps) {
  const [hearted, setHearted] = useState(false)
  const [heartsCount, setHeartsCount] = useState(project.hearts_count)
  const [loading, setLoading] = useState(false)
  const [guestId, setGuestId] = useState<string>('')
  const { user } = useAuth()

  useEffect(() => {
    // Initialize guest ID for non-logged in users
    if (!user) {
      const id = getGuestId()
      setGuestId(id)

      // Check if guest has already hearted this project
      checkGuestHeartStatus(id)
    }
  }, [user, project.id])

  const checkGuestHeartStatus = async (guestId: string) => {
    try {
      const response = await fetch(`/api/projects/${project.id}/guest-heart-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_id: guestId })
      })

      if (response.ok) {
        const data = await response.json()
        setHearted(data.hearted)
      }
    } catch (error) {
      console.error('Error checking guest heart status:', error)
    }
  }

  const handleHeart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (loading) return

    setLoading(true)
    try {
      let endpoint: string
      let body: any = {}

      if (user) {
        // Logged in user
        endpoint = `/api/projects/${project.id}/hearts`
      } else {
        // Guest user
        endpoint = `/api/projects/${project.id}/guest-heart`
        body.guest_id = guestId
      }

      const method = hearted ? 'DELETE' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined
      })

      if (response.ok) {
        const data = await response.json()
        setHearted(!hearted)
        setHeartsCount(data.heartsCount || (hearted ? heartsCount - 1 : heartsCount + 1))
      } else {
        const errorData = await response.json()
        console.error('Heart error:', errorData.error)
        // Show user-friendly message for guests who already liked
        if (!user && errorData.error.includes('already liked')) {
          alert('You have already liked this project!')
        }
      }
    } catch (error) {
      console.error('Failed to toggle heart:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (viewMode === 'list') {
    return (
      <div className="group bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-emerald-500/5 cursor-pointer"
           onClick={() => window.location.href = `/projects/${project.id}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {project.icon_url && (
                <img
                  src={project.icon_url}
                  alt={`${project.title} icon`}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              <h3 className="text-lg font-semibold text-white font-space group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
            </div>

            <p className="text-zinc-400 mb-3 line-clamp-2 font-space">
              {project.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-zinc-500 font-space">
              <div className="flex items-center gap-1">
                <User size={14} />
                {project.user?.name || 'Anonymous'}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(project.created_at)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            {/* Links */}
            <div className="flex gap-2">
              {project.website_url && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.website_url, '_blank')
                  }}
                  className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <ExternalLink size={16} />
                </button>
              )}
              {project.github_url && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.github_url, '_blank')
                  }}
                  className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <Github size={16} />
                </button>
              )}
            </div>

            {/* Heart Button - Available for everyone */}
            <button
              onClick={handleHeart}
              disabled={loading}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                hearted
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 border border-zinc-700 hover:border-red-500/30'
              }`}
              title={user ? 'Like this project' : 'Like this project (as guest)'}
            >
              <Heart size={14} fill={hearted ? 'currentColor' : 'none'} />
              {heartsCount}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl overflow-hidden hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-500/5 cursor-pointer"
         onClick={() => window.location.href = `/projects/${project.id}`}>
      {project.icon_url && (
        <div className="aspect-video bg-zinc-800/50 flex items-center justify-center">
          <img
            src={project.icon_url}
            alt={`${project.title} icon`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 font-space group-hover:text-emerald-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-zinc-400 mb-4 line-clamp-3 font-space">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-space">
            <User size={14} />
            {project.user?.name || 'Anonymous'}
          </div>

          <div className="flex items-center gap-2">
            {/* Links */}
            {project.website_url && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.website_url, '_blank')
                }}
                className="p-1 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <ExternalLink size={16} />
              </button>
            )}
            {project.github_url && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.github_url, '_blank')
                }}
                className="p-1 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <Github size={16} />
              </button>
            )}

            {/* Heart Button - Available for everyone */}
            <button
              onClick={handleHeart}
              disabled={loading}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors ${
                hearted
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 border border-zinc-700 hover:border-red-500/30'
              }`}
              title={user ? 'Like this project' : 'Like this project (as guest)'}
            >
              <Heart size={14} fill={hearted ? 'currentColor' : 'none'} />
              {heartsCount}
            </button>
          </div>
        </div>

        <div className="mt-3 text-xs text-zinc-500 font-space">
          {formatDate(project.created_at)}
        </div>
      </div>
    </div>
  )
}
