'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import type { Comment } from '@/lib/supabase'
import { User, Calendar, MessageCircle } from 'lucide-react'

interface CommentSectionProps {
  projectId: string
  comments: Comment[]
  onCommentsUpdate: (comments: Comment[]) => void
}

export default function CommentSection({ projectId, comments, onCommentsUpdate }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || loading) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }

      const data = await response.json()
      onCommentsUpdate([...comments, data.comment])
      setNewComment('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    } finally {
      setLoading(false)
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

  return (
    <div className="bg-zinc-900/60 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 shadow-lg shadow-emerald-500/5">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={20} className="text-emerald-400" />
        <h2 className="text-xl font-semibold text-white font-space">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this project..."
              rows={3}
              className="w-full px-3 py-2 bg-zinc-800/60 border border-emerald-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-zinc-400 resize-none font-space"
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm mb-4 font-space">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-space shadow-lg shadow-emerald-500/20"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-400">
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </a>{' '}
            to join the discussion
          </p>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {comment.user?.name || 'Anonymous'}
                    </span>
                    {comment.user?.x_profile && (
                      <a
                        href={`https://x.com/${comment.user.x_profile.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {comment.user.x_profile}
                      </a>
                    )}
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={12} />
                      {formatDate(comment.created_at)}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
