import { MetadataRoute } from 'next'
import { getMockPosts } from '@/lib/mockData'

export default function sitemap(): MetadataRoute.Sitemap {
  // Using mock data for now - Engineer 1 will replace with Supabase queries
  const posts = getMockPosts()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://briansteele.dev'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  const blogPages = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  })) || []

  return [...staticPages, ...blogPages]
}
