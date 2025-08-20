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

    // Check if guest has hearted this project
    const { data: existingHeart } = await supabase
      .from('hearts')
      .select('id')
      .eq('project_id', projectId)
      .eq('guest_id', guest_id)
      .single()

    return NextResponse.json({ 
      hearted: !!existingHeart 
    })

  } catch (error) {
    console.error('Guest heart status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
