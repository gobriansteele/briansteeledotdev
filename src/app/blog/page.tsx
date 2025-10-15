import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Navigation } from '@/components/Navigation'
import { formatDistance } from 'date-fns'
import Image from 'next/image'
import { getPublishedPosts, getAllTags } from '@/lib/queries/posts'

interface SearchParams {
  tag?: string
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedParams = await searchParams
  const posts = await getPublishedPosts({ tagSlug: resolvedParams.tag })
  const allTags = await getAllTags()

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Navigation />

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-foreground-secondary text-lg">
          Thoughts on AI, leadership, and software engineering.
        </p>
      </div>

      {/* Tag filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Link href="/blog">
          <Badge variant={!resolvedParams.tag ? 'primary' : 'default'}>
            All
          </Badge>
        </Link>
        {allTags?.map((tag) => (
          <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
            <Badge variant={resolvedParams.tag === tag.slug ? 'primary' : 'default'}>
              {tag.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts?.map((post) => (
          <Card key={post.id} hover>
            <Link href={`/blog/${post.slug}`}>
              {post.featured_image_url && (
                <div className="mb-4 -mx-6 -mt-6">
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                {post.post_tags.map((pt) => (
                  <Badge key={pt.tags.id}>{pt.tags.name}</Badge>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2 hover:text-accent-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-foreground-secondary mb-3">{post.excerpt}</p>
              <p className="text-sm text-foreground-muted">
                {post.published_at && formatDistance(new Date(post.published_at), new Date(), { addSuffix: true })}
              </p>
            </Link>
          </Card>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground-secondary">No posts found.</p>
        </div>
      )}
    </div>
  )
}
