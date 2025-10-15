'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export async function uploadImage(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file provided')
  }

  // Create unique filename with timestamp
  const timestamp = Date.now()
  const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName)

  revalidatePath('/admin/media')

  return { fileName, publicUrl }
}

export async function deleteImage(fileName: string) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase.storage
    .from('blog-images')
    .remove([fileName])

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`)
  }

  revalidatePath('/admin/media')
}
