import { supabaseAdmin } from './supabase'
import type { Project } from './supabase'

// Validate project data
export function validateProject(data: {
  title: string
  description: string
  website_url?: string
  github_url?: string
  icon_url?: string
}) {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push('Description is required')
  }

  if (!data.website_url && !data.github_url) {
    errors.push('Either website URL or GitHub URL is required')
  }

  // Validate URLs if provided
  if (data.website_url) {
    try {
      new URL(data.website_url)
    } catch {
      errors.push('Invalid website URL')
    }
  }

  if (data.github_url) {
    try {
      const url = new URL(data.github_url)
      if (!url.hostname.includes('github.com')) {
        errors.push('GitHub URL must be from github.com')
      }
    } catch {
      errors.push('Invalid GitHub URL')
    }
  }

  if (data.icon_url) {
    try {
      new URL(data.icon_url)
    } catch {
      errors.push('Invalid icon URL')
    }
  }

  return errors
}

// Get projects with filters
export async function getProjects(filters: {
  status?: 'pending' | 'approved' | 'rejected' | 'suspended'
  userId?: string
  limit?: number
  offset?: number
  orderBy?: 'created_at' | 'hearts_count' | 'title'
  orderDirection?: 'asc' | 'desc'
} = {}) {
  let query = supabaseAdmin
    .from('projects')
    .select(`
      *,
      user:users!projects_user_id_fkey(id, name, x_profile)
    `)

  if (filters.status) {
    query = query.eq('status', filters.status)
  }

  if (filters.userId) {
    query = query.eq('user_id', filters.userId)
  }

  const orderBy = filters.orderBy || 'created_at'
  const orderDirection = filters.orderDirection || 'desc'
  query = query.order(orderBy, { ascending: orderDirection === 'asc' })

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return data as Project[]
}

// Get single project
export async function getProject(id: string, includeUser = true) {
  if (includeUser) {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select(`
        *,
        user:users!projects_user_id_fkey(id, name, x_profile)
      `)
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(`Failed to fetch project: ${error.message}`)
    }

    return data as Project
  } else {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(`Failed to fetch project: ${error.message}`)
    }

    return data as Project
  }
}

// Create project
export async function createProject(userId: string, projectData: {
  title: string
  description: string
  website_url?: string
  github_url?: string
  icon_url?: string
}) {
  const errors = validateProject(projectData)
  if (errors.length > 0) {
    throw new Error(errors.join(', '))
  }

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert({
      user_id: userId,
      title: projectData.title.trim(),
      description: projectData.description.trim(),
      website_url: projectData.website_url?.trim() || null,
      github_url: projectData.github_url?.trim() || null,
      icon_url: projectData.icon_url?.trim() || null,
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`)
  }

  return data as Project
}

// Update project
export async function updateProject(id: string, userId: string, projectData: {
  title?: string
  description?: string
  website_url?: string
  github_url?: string
  icon_url?: string
}) {
  // Validate if provided
  if (projectData.title !== undefined || projectData.description !== undefined || 
      projectData.website_url !== undefined || projectData.github_url !== undefined) {
    const errors = validateProject({
      title: projectData.title || '',
      description: projectData.description || '',
      website_url: projectData.website_url,
      github_url: projectData.github_url,
      icon_url: projectData.icon_url
    })
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }
  }

  const updateData: any = { updated_at: new Date().toISOString() }
  
  if (projectData.title !== undefined) updateData.title = projectData.title.trim()
  if (projectData.description !== undefined) updateData.description = projectData.description.trim()
  if (projectData.website_url !== undefined) updateData.website_url = projectData.website_url?.trim() || null
  if (projectData.github_url !== undefined) updateData.github_url = projectData.github_url?.trim() || null
  if (projectData.icon_url !== undefined) updateData.icon_url = projectData.icon_url?.trim() || null

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`)
  }

  return data as Project
}

// Update project status (admin only)
export async function updateProjectStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'suspended') {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update project status: ${error.message}`)
  }

  return data as Project
}

// Delete project
export async function deleteProject(id: string, userId?: string) {
  let query = supabaseAdmin
    .from('projects')
    .delete()
    .eq('id', id)

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { error } = await query

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`)
  }
}
