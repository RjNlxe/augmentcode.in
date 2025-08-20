import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser/public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface User {
  id: string
  name: string
  x_profile?: string
  email?: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  user_id: string
  token: string
  expires_at: string
  created_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  description: string
  icon_url?: string
  website_url?: string
  github_url?: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  hearts_count: number
  created_at: string
  updated_at: string
  user?: User
}

export interface Comment {
  id: string
  project_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user?: User
}

export interface Heart {
  id: string
  project_id: string
  user_id?: string
  guest_id?: string
  created_at: string
  user?: User
}
