import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createSession, setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { name, xProfile, email } = await request.json()

    // Validate input
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Check if user exists by email (for admin) or create new user
    let user
    if (email) {
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (existingUser) {
        user = existingUser
      } else {
        // Create new user with email
        const { data: newUser, error } = await supabaseAdmin
          .from('users')
          .insert({
            name: name.trim(),
            x_profile: xProfile?.trim() || null,
            email: email.trim()
          })
          .select()
          .single()

        if (error) {
          return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
          )
        }
        user = newUser
      }
    } else {
      // Create new user without email (regular user)
      const { data: newUser, error } = await supabaseAdmin
        .from('users')
        .insert({
          name: name.trim(),
          x_profile: xProfile?.trim() || null
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Failed to create user' },
          { status: 500 }
        )
      }
      user = newUser
    }

    // Create session
    const sessionToken = await createSession(user.id)

    // Set cookie
    const response = NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        x_profile: user.x_profile,
        is_admin: user.is_admin
      }
    })

    response.cookies.set('augment_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
