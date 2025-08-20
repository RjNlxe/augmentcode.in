'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import type { Project, Comment } from '@/lib/supabase'
import CommentSection from '@/components/CommentSection'
import MainNavigation from '@/components/MainNavigation'
import { getGuestId } from '@/lib/guest-id'
import Link from 'next/link'
import { Heart, ExternalLink, Github as GitHubIcon, User, Calendar, Share2 } from 'lucide-react'

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [hearted, setHearted] = useState(false)
  const [heartsCount, setHeartsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [heartLoading, setHeartLoading] = useState(false)
  const [guestId, setGuestId] = useState<string>('')
  const { user } = useAuth()

  useEffect(() => {
    if (params.id) {
      fetchProject()
      fetchComments()

      if (user) {
        checkIfHearted()
      } else {
        // Initialize guest ID and check guest heart status
        const id = getGuestId()
        setGuestId(id)
        checkGuestHeartStatus(id)
      }
    }
  }, [params.id, user])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data.project)
        setHeartsCount(data.project.hearts_count)
      } else if (response.status === 404) {
        // Project not found or not approved
        setProject(null)
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}/comments`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }

  const checkIfHearted = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}/hearts/check`)
      if (response.ok) {
        const data = await response.json()
        setHearted(data.hearted)
      }
    } catch (error) {
      console.error('Failed to check heart status:', error)
    }
  }

  const checkGuestHeartStatus = async (guestId: string) => {
    try {
      const response = await fetch(`/api/projects/${params.id}/guest-heart-status`, {
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

  const handleHeart = async () => {
    if (heartLoading) return

    setHeartLoading(true)
    try {
      let endpoint: string
      let body: any = {}

      if (user) {
        // Logged in user
        endpoint = `/api/projects/${params.id}/hearts`
      } else {
        // Guest user
        endpoint = `/api/projects/${params.id}/guest-heart`
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
      setHeartLoading(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.description,
          url: url,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.error('Failed to copy link:', error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This project doesn't exist or hasn't been approved yet.
          </p>
          <Link
            href="/projects"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Projects
          </Link>
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="text-emerald-400 hover:text-emerald-300 font-medium font-space transition-colors duration-300"
          >
            ← Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 mb-8 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {project.icon_url && (
                <img
                  src={project.icon_url}
                  alt={`${project.title} icon`}
                  className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/20"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-space">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-zinc-400 font-space">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    {project.user?.name || 'Anonymous'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {formatDate(project.created_at)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <Share2 size={20} />
              </button>

              {/* Heart Button - Available for everyone */}
              <button
                onClick={handleHeart}
                disabled={heartLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 font-space ${
                  hearted
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-zinc-800/60 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 border border-zinc-700 hover:border-red-500/30'
                }`}
                title={user ? 'Like this project' : 'Like this project (as guest)'}
              >
                <Heart size={18} fill={hearted ? 'currentColor' : 'none'} />
                {heartsCount}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-lg leading-relaxed mb-6 font-space">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-4">
            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-space shadow-lg shadow-emerald-500/20"
              >
                <ExternalLink size={16} />
                Visit Website
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/60 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700/60 hover:border-zinc-600 transition-all duration-300 font-space"
              >
                <GitHubIcon size={16} />
                View on GitHub
              </a>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection
          projectId={project.id}
          comments={comments}
          onCommentsUpdate={setComments}
        />
      </div>
    </div>
  )
}
