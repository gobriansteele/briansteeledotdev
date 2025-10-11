// Database types matching Supabase schema

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string | null
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
  author: string
}

export interface PostTag {
  post_id: string
  tag_id: string
}

// Extended types with relations
export interface PostWithTags extends Post {
  post_tags: {
    tags: Tag
  }[]
}

export interface TagWithPostCount extends Tag {
  post_count?: number
}
