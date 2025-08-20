import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { guest_id } = await request.json()
    
    if (!guest_id) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin
    const { id: projectId } = await params

    // Check if guest already hearted this project
    const { data: existingHeart } = await supabase
      .from('hearts')
      .select('id')
      .eq('project_id', projectId)
      .eq('guest_id', guest_id)
      .single()

    if (existingHeart) {
      return NextResponse.json(
        { error: 'You have already liked this project' },
        { status: 400 }
      )
    }

    // Add heart
    const { error } = await supabase
      .from('hearts')
      .insert({
        project_id: projectId,
        guest_id: guest_id
      })

    if (error) {
      console.error('Error adding guest heart:', error)
      return NextResponse.json(
        { error: 'Failed to add heart' },
        { status: 500 }
      )
    }

    // Get updated heart count
    const { count } = await supabase
      .from('hearts')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId)

    return NextResponse.json({ 
      success: true, 
      heartsCount: count || 0 
    })

  } catch (error) {
    console.error('Guest heart error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { guest_id } = await request.json()
    
    if (!guest_id) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin
    const { id: projectId } = await params

    // Remove heart
    const { error } = await supabase
      .from('hearts')
      .delete()
      .eq('project_id', projectId)
      .eq('guest_id', guest_id)

    if (error) {
      console.error('Error removing guest heart:', error)
      return NextResponse.json(
        { error: 'Failed to remove heart' },
        { status: 500 }
      )
    }

    // Get updated heart count
    const { count } = await supabase
      .from('hearts')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId)

    return NextResponse.json({ 
      success: true, 
      heartsCount: count || 0 
    })

  } catch (error) {
    console.error('Guest heart removal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
