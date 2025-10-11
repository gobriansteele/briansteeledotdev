import { notFound } from 'next/navigation'
import { serializeMDX, getReadingTime } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getMockPost, getMockPosts } from '@/lib/mockData'

interface Props {
  params: { slug: string }
}

// Using mock data for now - Engineer 1 will replace with Supabase queries
async function getPost(slug: string) {
  return getMockPost(slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
      images: post.cover_image ? [post.cover_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export async function generateStaticParams() {
  // Using mock data for now - Engineer 1 will replace with Supabase queries
  const posts = getMockPosts()

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const mdxSource = await serializeMDX(post.content)
  const readingTime = getReadingTime(post.content)

  // Get related posts by tags (simplified for mock data)
  const tagIds = post.post_tags.map((pt: any) => pt.tags.id)
  const allPosts = getMockPosts()
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .filter((p) => p.post_tags.some((pt) => tagIds.includes(pt.tags.id)))
    .slice(0, 3)

  return (
    <article>
      {/* Header */}
      <header className="mb-8">
        {post.cover_image && (
          <div className="mb-8 -mx-8">
            <Image
              src={post.cover_image}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-96 object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          {post.post_tags.map((pt: any) => (
            <Badge key={pt.tags.id}>{pt.tags.name}</Badge>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-foreground-secondary text-sm">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.published_at}>
            {format(new Date(post.published_at), 'MMMM d, yyyy')}
          </time>
          <span>•</span>
          <span>{readingTime.text}</span>
        </div>
      </header>

      {/* Content */}
      <div className="mb-12">
        <MDXContent source={mdxSource} />
      </div>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="border-t border-slate-700 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((related: any) => (
              <a
                key={related.id}
                href={`/blog/${related.slug}`}
                className="block p-4 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
              >
                <h3 className="font-semibold mb-2">{related.title}</h3>
                <p className="text-sm text-foreground-secondary">{related.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export const revalidate = 3600 // Revalidate every hour
