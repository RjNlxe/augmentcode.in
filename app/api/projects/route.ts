import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getProjects, createProject } from '@/lib/projects'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as 'pending' | 'approved' | 'rejected' | 'suspended' | null
    const userId = searchParams.get('userId')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
    const orderBy = searchParams.get('orderBy') as 'created_at' | 'hearts_count' | 'title' | null
    const orderDirection = searchParams.get('orderDirection') as 'asc' | 'desc' | null

    const projects = await getProjects({
      status: status || undefined,
      userId: userId || undefined,
      limit,
      offset,
      orderBy: orderBy || undefined,
      orderDirection: orderDirection || undefined
    })

    return NextResponse.json({ projects })

  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionData = await getCurrentUser()
    if (!sessionData) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { title, description, website_url, github_url, icon_url } = await request.json()

    const project = await createProject(sessionData.user.id, {
      title,
      description,
      website_url,
      github_url,
      icon_url
    })

    return NextResponse.json({ project }, { status: 201 })

  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 400 }
    )
  }
}
