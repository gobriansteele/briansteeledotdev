import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}

export async function requireAdmin() {
  const user = await requireAuth()

  const adminEmail = process.env.ADMIN_EMAIL

  if (user.email !== adminEmail) {
    redirect('/')
  }

  return user
}
