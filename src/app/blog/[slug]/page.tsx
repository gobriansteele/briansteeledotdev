import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serializeMDX, getReadingTime } from '@/lib/mdx'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPublishedSlugs, getRelatedPosts } from '@/lib/queries/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

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
  const slugs = await getAllPublishedSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const mdxContent = await serializeMDX(post.content)
  const readingTime = getReadingTime(post.content)

  // Get related posts by tags
  const tagIds = post.post_tags.map((pt) => pt.tags.id)
  const relatedPosts = await getRelatedPosts(post.id, tagIds, 3)

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <article>
        {/* Header */}
        <header className="mb-8 md:mb-12">
          {post.cover_image && (
            <div className="mb-6 md:mb-8 -mx-6">
              <Image
                src={post.cover_image}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                priority
              />
            </div>
          )}

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {post.post_tags.map((pt) => (
              <Badge key={pt.tags.id}>{pt.tags.name}</Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-foreground-secondary text-sm">
            <span>{post.author}</span>
            <span className="hidden sm:inline">•</span>
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), 'MMMM d, yyyy')}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>{readingTime.text}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-light max-w-none mb-12">
          {mdxContent}
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="border-t border-border pt-8 mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="block p-4 md:p-5 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-all border border-border hover:border-accent-primary"
                >
                  <h3 className="font-semibold mb-2 text-base md:text-lg text-foreground">
                    {related.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export const revalidate = 3600 // Revalidate every hour
