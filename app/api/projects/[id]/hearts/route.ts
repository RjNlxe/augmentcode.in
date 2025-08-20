import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

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

    // Add heart (will fail if already exists due to unique constraint)
    const { error } = await supabaseAdmin
      .from('hearts')
      .insert({
        project_id: id,
        user_id: sessionData.user.id
      })

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'Already hearted' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Add heart error:', error)
    return NextResponse.json(
      { error: 'Failed to add heart' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    const { error } = await supabaseAdmin
      .from('hearts')
      .delete()
      .eq('project_id', id)
      .eq('user_id', sessionData.user.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Remove heart error:', error)
    return NextResponse.json(
      { error: 'Failed to remove heart' },
      { status: 500 }
    )
  }
}
