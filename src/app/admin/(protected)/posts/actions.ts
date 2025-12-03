'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type PostFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url?: string
  published: boolean
  tags: string[]
}

export async function createPost(formData: PostFormData) {
  const supabase = await createClient()

  // Insert post
  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      featured_image_url: formData.featured_image_url,
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (postError) {
    throw new Error(`Failed to create post: ${postError.message}`)
  }

  // Insert tags if provided
  if (formData.tags.length > 0) {
    const tagInserts = formData.tags.map((tagId) => ({
      post_id: post.id,
      tag_id: tagId,
    }))

    const { error: tagError } = await supabase
      .from('post_tags')
      .insert(tagInserts)

    if (tagError) {
      throw new Error(`Failed to associate tags: ${tagError.message}`)
    }
  }

  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function updatePost(postId: string, formData: PostFormData) {
  const supabase = await createClient()

  // Get current post to check if we need to set published_at
  const { data: currentPost } = await supabase
    .from('posts')
    .select('published_at')
    .eq('id', postId)
    .single()

  // Update post
  const { error: postError } = await supabase
    .from('posts')
    .update({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      featured_image_url: formData.featured_image_url,
      published: formData.published,
      published_at:
        formData.published && !currentPost?.published_at
          ? new Date().toISOString()
          : currentPost?.published_at,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId)

  if (postError) {
    throw new Error(`Failed to update post: ${postError.message}`)
  }

  // Delete existing tag associations
  await supabase.from('post_tags').delete().eq('post_id', postId)

  // Insert new tag associations
  if (formData.tags.length > 0) {
    const tagInserts = formData.tags.map((tagId) => ({
      post_id: postId,
      tag_id: tagId,
    }))

    const { error: tagError } = await supabase
      .from('post_tags')
      .insert(tagInserts)

    if (tagError) {
      throw new Error(`Failed to associate tags: ${tagError.message}`)
    }
  }

  revalidatePath('/admin/posts')
  revalidatePath(`/admin/posts/${postId}/edit`)
  redirect('/admin/posts')
}

export async function deletePost(postId: string) {
  const supabase = await createClient()

  // Delete tag associations first (foreign key constraint)
  await supabase.from('post_tags').delete().eq('post_id', postId)

  // Delete post
  const { error } = await supabase.from('posts').delete().eq('id', postId)

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`)
  }

  revalidatePath('/admin/posts')
}

export async function togglePublished(postId: string, currentStatus: boolean) {
  const supabase = await createClient()

  const newPublishedStatus = !currentStatus

  // Get current published_at to preserve it if already set
  const { data: currentPost } = await supabase
    .from('posts')
    .select('published_at')
    .eq('id', postId)
    .single()

  const { error } = await supabase
    .from('posts')
    .update({
      published: newPublishedStatus,
      published_at:
        newPublishedStatus && !currentPost?.published_at
          ? new Date().toISOString()
          : currentPost?.published_at,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId)

  if (error) {
    throw new Error(`Failed to toggle publish status: ${error.message}`)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/admin')
}
