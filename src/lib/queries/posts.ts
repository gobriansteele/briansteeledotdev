import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@supabase/supabase-js'
import { PostWithTags, Tag } from '@/types/blog'

/**
 * Create a client for build-time operations (no cookies)
 */
function createBuildTimeClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

interface GetPublishedPostsOptions {
  limit?: number
  tagSlug?: string
}

/**
 * Get published posts with optional filtering
 * @param options - Query options (limit, tagSlug)
 * @returns Array of published posts with tags
 */
export async function getPublishedPosts(
  options: GetPublishedPostsOptions = {}
): Promise<PostWithTags[]> {
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select(
      `
      *,
      post_tags (
        tags (
          id,
          name,
          slug,
          created_at
        )
      )
    `
    )
    .eq('published', true)
    .order('published_at', { ascending: false })

  // Apply tag filter if specified
  if (options.tagSlug) {
    // We need to filter posts that have this tag
    // First get the posts with the tag relation, then filter client-side
    // or use a more complex query
    const { data: posts, error } = await query

    if (error) {
      console.error('Error fetching posts:', error)
      return []
    }

    // Filter posts by tag slug
    const filtered =
      posts?.filter((post) =>
        post.post_tags.some((pt: any) => pt.tags?.slug === options.tagSlug)
      ) || []

    return options.limit ? filtered.slice(0, options.limit) : filtered
  }

  // Apply limit if specified
  if (options.limit) {
    query = query.limit(options.limit)
  }

  const { data: posts, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return posts || []
}

/**
 * Get a single published post by slug
 * @param slug - Post slug
 * @returns Post with tags or null if not found
 */
export async function getPostBySlug(
  slug: string
): Promise<PostWithTags | null> {
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      post_tags (
        tags (
          id,
          name,
          slug,
          created_at
        )
      )
    `
    )
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return post
}

/**
 * Get all tags
 * @returns Array of all tags
 */
export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createClient()

  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  return tags || []
}

/**
 * Get related posts by tag similarity
 * @param currentPostId - Current post ID to exclude
 * @param tagIds - Array of tag IDs to match
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts
 */
export async function getRelatedPosts(
  currentPostId: string,
  tagIds: string[],
  limit: number = 3
): Promise<PostWithTags[]> {
  if (tagIds.length === 0) {
    return []
  }

  const supabase = await createClient()

  // Get all published posts with tags
  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      post_tags (
        tags (
          id,
          name,
          slug,
          created_at
        )
      )
    `
    )
    .eq('published', true)
    .neq('id', currentPostId)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  if (!posts) {
    return []
  }

  // Filter and sort by number of matching tags
  const postsWithMatchCount = posts
    .map((post) => {
      const postTagIds = post.post_tags.map((pt: any) => pt.tags?.id)
      const matchCount = postTagIds.filter((id: string) =>
        tagIds.includes(id)
      ).length
      return { post, matchCount }
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)

  return postsWithMatchCount.slice(0, limit).map(({ post }) => post)
}

/**
 * Get all published post slugs (for static generation at build time)
 * Uses a build-time client that doesn't require cookies
 * @returns Array of post slugs
 */
export async function getAllPublishedSlugs(): Promise<string[]> {
  // Use build-time client for generateStaticParams (no request context)
  const supabase = createBuildTimeClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)

  if (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }

  return posts?.map((post) => post.slug) || []
}
