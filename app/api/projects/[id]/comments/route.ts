import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if project exists and is approved
    const { data: project } = await supabaseAdmin
      .from('projects')
      .select('id, status')
      .eq('id', id)
      .eq('status', 'approved')
      .single()

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Fetch comments
    const { data: comments, error } = await supabaseAdmin
      .from('comments')
      .select(`
        *,
        user:users(id, name, x_profile)
      `)
      .eq('project_id', id)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ comments })

  } catch (error) {
    console.error('Get comments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sessionData = await getCurrentUser()
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { content } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      )
    }

    // Check if project exists and is approved
    const { data: project } = await supabaseAdmin
      .from('projects')
      .select('id, status')
      .eq('id', id)
      .eq('status', 'approved')
      .single()

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Create comment
    const { data: comment, error } = await supabaseAdmin
      .from('comments')
      .insert({
        project_id: id,
        user_id: sessionData.user.id,
        content: content.trim()
      })
      .select(`
        *,
        user:users(id, name, x_profile)
      `)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ comment }, { status: 201 })

  } catch (error) {
    console.error('Create comment error:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
