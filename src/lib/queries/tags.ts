import { createClient } from '@/lib/supabase/server'
import { Tag, TagWithPostCount } from '@/types/blog'

/**
 * Get all tags with post count
 * @returns Array of tags with post counts
 */
export async function getAllTagsWithPostCount(): Promise<TagWithPostCount[]> {
  const supabase = await createClient()

  // Get all tags
  const { data: tags, error: tagsError } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  if (tagsError) {
    console.error('Error fetching tags:', tagsError)
    return []
  }

  if (!tags) {
    return []
  }

  // Get post counts for each tag
  const tagsWithCount: TagWithPostCount[] = await Promise.all(
    tags.map(async (tag) => {
      const { count, error: countError } = await supabase
        .from('post_tags')
        .select('*', { count: 'exact', head: true })
        .eq('tag_id', tag.id)

      if (countError) {
        console.error(`Error counting posts for tag ${tag.id}:`, countError)
      }

      return {
        ...tag,
        post_count: count || 0,
      }
    })
  )

  return tagsWithCount
}

/**
 * Get a single tag by ID
 * @param id - Tag ID
 * @returns Tag or null if not found
 */
export async function getTagById(id: string): Promise<Tag | null> {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from('tags')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching tag:', error)
    return null
  }

  return tag
}

/**
 * Get a tag by slug
 * @param slug - Tag slug
 * @returns Tag or null if not found
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const supabase = await createClient()

  const { data: tag, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching tag by slug:', error)
    return null
  }

  return tag
}

/**
 * Get posts associated with a tag
 * @param tagId - Tag ID
 * @returns Array of post IDs
 */
export async function getPostIdsByTagId(tagId: string): Promise<string[]> {
  const supabase = await createClient()

  const { data: postTags, error } = await supabase
    .from('post_tags')
    .select('post_id')
    .eq('tag_id', tagId)

  if (error) {
    console.error('Error fetching posts for tag:', error)
    return []
  }

  return postTags?.map((pt) => pt.post_id) || []
}

/**
 * Check if a tag name or slug already exists
 * @param name - Tag name
 * @param slug - Tag slug
 * @param excludeId - Optional tag ID to exclude (for updates)
 * @returns Object indicating if name or slug exists
 */
export async function checkTagExists(
  name: string,
  slug: string,
  excludeId?: string
): Promise<{ nameExists: boolean; slugExists: boolean }> {
  const supabase = await createClient()

  let nameQuery = supabase
    .from('tags')
    .select('id')
    .ilike('name', name)

  let slugQuery = supabase
    .from('tags')
    .select('id')
    .eq('slug', slug)

  if (excludeId) {
    nameQuery = nameQuery.neq('id', excludeId)
    slugQuery = slugQuery.neq('id', excludeId)
  }

  const [{ data: nameData }, { data: slugData }] = await Promise.all([
    nameQuery.single(),
    slugQuery.single(),
  ])

  return {
    nameExists: !!nameData,
    slugExists: !!slugData,
  }
}
