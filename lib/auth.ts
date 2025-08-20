import { supabaseAdmin } from './supabase'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const SESSION_COOKIE_NAME = 'augment_session'
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

// Generate secure session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Create user session
export async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)

  const { error } = await supabaseAdmin
    .from('sessions')
    .insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString()
    })

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`)
  }

  return token
}

// Validate session token
export async function validateSession(token: string) {
  const { data: session, error } = await supabaseAdmin
    .from('sessions')
    .select(`
      *,
      user:users(*)
    `)
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !session) {
    return null
  }

  return {
    session,
    user: session.user
  }
}

// Get current user from session
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!sessionToken) {
    return null
  }

  return await validateSession(sessionToken)
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_MS / 1000,
    path: '/'
  })
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Delete session from database
export async function deleteSession(token: string) {
  await supabaseAdmin
    .from('sessions')
    .delete()
    .eq('token', token)
}

// Clean expired sessions
export async function cleanExpiredSessions() {
  await supabaseAdmin
    .from('sessions')
    .delete()
    .lt('expires_at', new Date().toISOString())
}
