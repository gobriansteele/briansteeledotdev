import Link from 'next/link'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { formatDistance } from 'date-fns'
import { PostWithTags } from '@/types/blog'

interface RecentPostsProps {
  posts: PostWithTags[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section id="recent-posts" className="py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="uppercase font-bold tracking-widest text-lg">Recent Posts</h2>
        <Link href="/blog" className="text-accent-primary hover:text-accent-hover text-sm">
          View all →
        </Link>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} hover>
            <Link href={`/blog/${post.slug}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {post.post_tags.map((pt) => (
                    <Badge key={pt.tags.name}>{pt.tags.name}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 hover:text-accent-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground-secondary mb-2">{post.excerpt}</p>
                <p className="text-sm text-foreground-muted">
                  {formatDistance(new Date(post.published_at), new Date(), { addSuffix: true })}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
