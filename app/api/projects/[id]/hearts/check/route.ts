import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const sessionData = await getCurrentUser()
    if (!sessionData) {
      return NextResponse.json({ hearted: false })
    }

    const { data: heart } = await supabaseAdmin
      .from('hearts')
      .select('id')
      .eq('project_id', id)
      .eq('user_id', sessionData.user.id)
      .single()

    return NextResponse.json({ hearted: !!heart })

  } catch (error) {
    console.error('Check heart error:', error)
    return NextResponse.json({ hearted: false })
  }
}
