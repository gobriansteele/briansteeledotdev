'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { checkTagExists } from '@/lib/queries/tags'

export type TagFormData = {
  name: string
  slug: string
}

/**
 * Generate a URL-friendly slug from a string (non-exported utility)
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Create a new tag
 */
export async function createTag(formData: TagFormData) {
  const supabase = await createClient()

  // Validate input
  if (!formData.name.trim()) {
    throw new Error('Tag name is required')
  }

  if (!formData.slug.trim()) {
    throw new Error('Tag slug is required')
  }

  // Check for duplicates
  const { nameExists, slugExists } = await checkTagExists(
    formData.name,
    formData.slug
  )

  if (nameExists) {
    throw new Error(`A tag with the name "${formData.name}" already exists`)
  }

  if (slugExists) {
    throw new Error(`A tag with the slug "${formData.slug}" already exists`)
  }

  // Create tag
  const { data: tag, error } = await supabase
    .from('tags')
    .insert({
      name: formData.name.trim(),
      slug: formData.slug.trim(),
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create tag: ${error.message}`)
  }

  revalidatePath('/admin/tags')
  revalidatePath('/admin/posts/new')
  revalidatePath('/admin/posts/[id]/edit')
  revalidatePath('/blog')

  return tag
}

/**
 * Update an existing tag
 */
export async function updateTag(tagId: string, formData: TagFormData) {
  const supabase = await createClient()

  // Validate input
  if (!formData.name.trim()) {
    throw new Error('Tag name is required')
  }

  if (!formData.slug.trim()) {
    throw new Error('Tag slug is required')
  }

  // Check for duplicates (excluding current tag)
  const { nameExists, slugExists } = await checkTagExists(
    formData.name,
    formData.slug,
    tagId
  )

  if (nameExists) {
    throw new Error(`A tag with the name "${formData.name}" already exists`)
  }

  if (slugExists) {
    throw new Error(`A tag with the slug "${formData.slug}" already exists`)
  }

  // Update tag
  const { error } = await supabase
    .from('tags')
    .update({
      name: formData.name.trim(),
      slug: formData.slug.trim(),
    })
    .eq('id', tagId)

  if (error) {
    throw new Error(`Failed to update tag: ${error.message}`)
  }

  revalidatePath('/admin/tags')
  revalidatePath('/admin/posts/new')
  revalidatePath('/admin/posts/[id]/edit')
  revalidatePath('/blog')
}

/**
 * Delete a tag and remove it from all posts
 */
export async function deleteTag(tagId: string) {
  const supabase = await createClient()

  // First, delete all post_tags associations
  const { error: postTagsError } = await supabase
    .from('post_tags')
    .delete()
    .eq('tag_id', tagId)

  if (postTagsError) {
    throw new Error(`Failed to remove tag associations: ${postTagsError.message}`)
  }

  // Then delete the tag itself
  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId)

  if (error) {
    throw new Error(`Failed to delete tag: ${error.message}`)
  }

  revalidatePath('/admin/tags')
  revalidatePath('/admin/posts')
  revalidatePath('/admin/posts/new')
  revalidatePath('/admin/posts/[id]/edit')
  revalidatePath('/blog')
}
