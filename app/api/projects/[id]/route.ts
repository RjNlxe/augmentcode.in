import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getProject, updateProject, deleteProject, updateProjectStatus } from '@/lib/projects'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await getProject(id)
    return NextResponse.json({ project })

  } catch (error) {
    console.error('Get project error:', error)
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    )
  }
}

export async function PUT(
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

    const body = await request.json()

    // Check if this is a status update (admin only)
    if ('status' in body) {
      if (!sessionData.user.is_admin) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }

      const project = await updateProjectStatus(id, body.status)
      return NextResponse.json({ project })
    }

    // Regular project update
    const { title, description, website_url, github_url, icon_url } = body

    const project = await updateProject(id, sessionData.user.id, {
      title,
      description,
      website_url,
      github_url,
      icon_url
    })

    return NextResponse.json({ project })

  } catch (error) {
    console.error('Update project error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update project' },
      { status: 400 }
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

    // Admin can delete any project, users can only delete their own
    const userId = sessionData.user.is_admin ? undefined : sessionData.user.id

    await deleteProject(id, userId)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 400 }
    )
  }
}
