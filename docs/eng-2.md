# Engineer 2: Public Site & Blog Features

## Overview

You are responsible for the public-facing website and blog functionality. This includes refreshing the design, updating content, building the blog index and post pages, implementing MDX rendering, and adding SEO features.

## Your Responsibilities

1. Update home page design and content (Head of AI role)
2. Implement design system refresh inspired by samwho.dev
3. Build blog index page with filtering and search
4. Create blog post detail pages with MDX rendering
5. Set up MDX processing pipeline
6. Implement SEO features (metadata, sitemap, RSS)
7. Performance optimization

## Dependencies

**You need from Engineer 1**:
- Supabase credentials (URL and anon key)
- Database schema created
- Confirmation that sample data exists

You can start with mock data and swap in real Supabase queries once Engineer 1 completes Phase 2 (Days 3-4).

---

## Phase 1: Design System Refresh (Days 1-3)

### Task 1.1: Update Color Palette

Inspired by samwho.dev, refine the dark theme palette.

**File**: `tailwind.config.js`

Update the config with custom colors:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0f172a', // slate-900
          secondary: '#1e293b', // slate-800
          tertiary: '#334155', // slate-700
        },
        foreground: {
          DEFAULT: '#f1f5f9', // slate-100
          secondary: '#cbd5e1', // slate-300
          muted: '#94a3b8', // slate-400
        },
        accent: {
          primary: '#3b82f6', // blue-500
          secondary: '#8b5cf6', // violet-500
          hover: '#2563eb', // blue-600
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#f1f5f9',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
            },
            h1: { color: '#f1f5f9' },
            h2: { color: '#f1f5f9' },
            h3: { color: '#f1f5f9' },
            h4: { color: '#f1f5f9' },
            strong: { color: '#f1f5f9' },
            code: { color: '#f1f5f9' },
            blockquote: { color: '#cbd5e1' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

Install typography plugin:

```bash
npm install @tailwindcss/typography
```

### Task 1.2: Create Reusable Components

**File**: `src/components/ui/Card.tsx`

```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-background-secondary rounded-lg p-6 border border-slate-700 ${
        hover ? 'transition-transform hover:scale-105 hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

**File**: `src/components/ui/Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors'

  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-accent-hover',
    secondary: 'bg-background-tertiary text-foreground hover:bg-slate-600',
    ghost: 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

**File**: `src/components/ui/Badge.tsx`

```typescript
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    primary: 'bg-blue-900 text-blue-300',
    secondary: 'bg-purple-900 text-purple-300',
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}
```

### Task 1.3: Update Global Styles

**File**: `src/app/globals.css`

Add smooth transitions and refined styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
  }

  a {
    @apply text-accent-primary hover:text-accent-hover transition-colors;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply text-foreground font-bold;
  }
}

@layer components {
  .prose-invert {
    @apply prose prose-slate max-w-none;
  }

  .link-underline {
    @apply underline decoration-2 decoration-accent-primary underline-offset-4 hover:decoration-accent-hover transition-colors;
  }
}

/* Code highlighting */
pre[class*="language-"] {
  @apply bg-slate-800 rounded-lg p-4 overflow-x-auto;
}

code[class*="language-"] {
  @apply text-sm;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Selection */
::selection {
  @apply bg-accent-primary/30;
}
```

---

## Phase 2: Home Page Refresh (Days 4-5)

### Task 2.1: Update About Section

**File**: `src/components/About.tsx`

Update content to reflect Head of AI role:

```typescript
export function About() {
  return (
    <section id="about">
      <div className="h-16 flex flex-col justify-center">
        <h2 className="uppercase font-bold tracking-widest text-lg">About</h2>
      </div>
      <div className="flex flex-col gap-6 text-foreground-secondary leading-relaxed">
        <p>
          I'm the <span className="text-foreground font-semibold">Head of AI at Honor Education</span>,
          where I lead research projects and leverage artificial intelligence to transform our platform.
          With a background in full-stack development and graphic design, I bring a unique perspective
          to building AI-powered solutions.
        </p>
        <p>
          My journey in tech started in 2010 when I got curious about "viewing page source" and fell
          in love with not only designing for the web, but building it. Since then, I've progressed
          through companies ranging from large enterprises to innovative startups, including{' '}
          <a href="https://ameriprise.com" target="_blank" className="link-underline">
            Ameriprise Financial
          </a>,{' '}
          <a href="https://vsco.co" target="_blank" className="link-underline">
            VSCO
          </a>, and{' '}
          <a href="https://docusign.com" target="_blank" className="link-underline">
            DocuSign
          </a>.
        </p>
        <p>
          These days, I spend my time working across the entire platform at{' '}
          <a href="https://honor.education" target="_blank" className="link-underline">
            Honor Education
          </a>—from native clients to Java backends, with TypeScript, Python, and AI models
          in between. I'm passionate about the intersection of engineering leadership and
          cutting-edge AI technology.
        </p>
        <p>
          When I'm not writing code or leading AI initiatives, you can find me{' '}
          <a href="https://www.strava.com/athletes/33433580" target="_blank" className="link-underline">
            on my bike
          </a>{' '}
          exploring Minneapolis, MN, or discovering great coffee shops and breweries with excellent IPAs.
        </p>
      </div>
    </section>
  )
}
```

### Task 2.2: Create "What I Do" Section

**File**: `src/components/WhatIDo.tsx`

```typescript
import { Card } from './ui/Card'

const areas = [
  {
    title: 'AI Leadership',
    description: 'Leading research and development of AI solutions that transform educational technology.',
    icon: '🤖',
  },
  {
    title: 'Engineering Management',
    description: 'Building and mentoring high-performing engineering teams across the full stack.',
    icon: '👥',
  },
  {
    title: 'Full-Stack Development',
    description: 'Architecting and building scalable systems from native apps to backend services.',
    icon: '💻',
  },
  {
    title: 'Research & Innovation',
    description: 'Exploring cutting-edge technologies and translating research into production systems.',
    icon: '🔬',
  },
]

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-12">
      <div className="h-16 flex flex-col justify-center">
        <h2 className="uppercase font-bold tracking-widest text-lg">What I Do</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {areas.map((area) => (
          <Card key={area.title} hover>
            <div className="text-4xl mb-4">{area.icon}</div>
            <h3 className="text-xl font-bold text-foreground mb-2">{area.title}</h3>
            <p className="text-foreground-secondary">{area.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
```

### Task 2.3: Create Recent Posts Preview

**File**: `src/components/RecentPosts.tsx`

```typescript
import Link from 'next/link'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { formatDistance } from 'date-fns'

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  published_at: string
  post_tags: { tags: { name: string } }[]
}

interface RecentPostsProps {
  posts: Post[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
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
```

### Task 2.4: Update Home Page

**File**: `src/app/page.tsx`

```typescript
import { About } from '@/components/About'
import { WhatIDo } from '@/components/WhatIDo'
import { Experience } from '@/components/Experience'
import { RecentPosts } from '@/components/RecentPosts'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  // Fetch recent published posts
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      slug,
      title,
      excerpt,
      published_at,
      post_tags (
        tags (
          name
        )
      )
    `)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <>
      <About />
      <WhatIDo />
      {posts && posts.length > 0 && <RecentPosts posts={posts} />}
      <Experience />
    </>
  )
}
```

---

## Phase 3: MDX Setup (Days 6-7)

### Task 3.1: Install MDX Dependencies

```bash
npm install next-mdx-remote rehype-highlight rehype-slug rehype-autolink-headings remark-gfm gray-matter reading-time
```

### Task 3.2: Create MDX Utilities

**File**: `src/lib/mdx.ts`

```typescript
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export async function serializeMDX(content: string) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
    },
  })

  return mdxSource
}

export function getReadingTime(content: string) {
  return readingTime(content)
}

export function extractFrontmatter(content: string) {
  const { data, content: markdownContent } = matter(content)
  return { frontmatter: data, content: markdownContent }
}
```

### Task 3.3: Create MDX Component

**File**: `src/components/MDXContent.tsx`

```typescript
'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'

const components = {
  img: (props: any) => (
    <Image
      {...props}
      width={800}
      height={600}
      className="rounded-lg"
      alt={props.alt || ''}
    />
  ),
  a: (props: any) => (
    <Link
      {...props}
      className="text-accent-primary hover:text-accent-hover underline"
    />
  ),
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent-primary pl-4 italic my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-slate-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  )
}
```

### Task 3.4: Add Syntax Highlighting Styles

**File**: `src/app/globals.css` (add to existing file)

```css
/* Add at the end of the file */
@import 'highlight.js/styles/github-dark.css';
```

---

## Phase 4: Blog Pages (Days 8-11)

### Task 4.1: Create Blog Index Page

**File**: `src/app/blog/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDistance } from 'date-fns'
import Image from 'next/image'

interface SearchParams {
  tag?: string
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('posts')
    .select(`
      *,
      post_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('published', true)
    .order('published_at', { ascending: false })

  // Filter by tag if specified
  if (searchParams.tag) {
    const { data: tagData } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', searchParams.tag)
      .single()

    if (tagData) {
      const { data: postIds } = await supabase
        .from('post_tags')
        .select('post_id')
        .eq('tag_id', tagData.id)

      const ids = postIds?.map(pt => pt.post_id) || []
      query = query.in('id', ids)
    }
  }

  const { data: posts } = await query

  // Get all tags for filter
  const { data: allTags } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-foreground-secondary text-lg">
          Thoughts on AI, leadership, and software engineering.
        </p>
      </div>

      {/* Tag filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/blog">
          <Badge variant={!searchParams.tag ? 'primary' : 'default'}>
            All
          </Badge>
        </Link>
        {allTags?.map((tag) => (
          <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
            <Badge variant={searchParams.tag === tag.slug ? 'primary' : 'default'}>
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
              {post.cover_image && (
                <div className="mb-4 -mx-6 -mt-6">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                {post.post_tags.map((pt: any) => (
                  <Badge key={pt.tags.id}>{pt.tags.name}</Badge>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2 hover:text-accent-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-foreground-secondary mb-3">{post.excerpt}</p>
              <p className="text-sm text-foreground-muted">
                {formatDistance(new Date(post.published_at), new Date(), { addSuffix: true })}
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
```

### Task 4.2: Create Blog Post Page

**File**: `src/app/blog/[slug]/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { serializeMDX, getReadingTime } from '@/lib/mdx'
import { MDXContent } from '@/components/MDXContent'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import Image from 'next/image'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

async function getPost(slug: string) {
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      post_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return post
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
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)

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

  // Get related posts by tags
  const supabase = await createClient()
  const tagIds = post.post_tags.map((pt: any) => pt.tags.id)

  const { data: relatedPosts } = await supabase
    .from('posts')
    .select(`
      id,
      slug,
      title,
      excerpt,
      post_tags!inner (
        tag_id
      )
    `)
    .eq('published', true)
    .neq('id', post.id)
    .in('post_tags.tag_id', tagIds)
    .limit(3)

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
```

---

## Phase 5: SEO & Performance (Days 12-14)

### Task 5.1: Create Sitemap

**File**: `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at')
    .eq('published', true)

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
```

### Task 5.2: Create RSS Feed

**File**: `src/app/feed.xml/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://briansteele.dev'

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Brian Steele - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Thoughts on AI, leadership, and software engineering</description>
    <language>en</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts?.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
```

### Task 5.3: Create robots.txt

**File**: `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://briansteele.dev'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Task 5.4: Update Root Layout Metadata

**File**: `src/app/layout.tsx`

```typescript
import './globals.css'
import { Inter } from 'next/font/google'
import { Header, ContentContainer, MainContainer } from '@/components'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Brian Steele - Head of AI at Honor Education',
    template: '%s | Brian Steele',
  },
  description: 'Head of AI at Honor Education. Writing about AI, leadership, and software engineering.',
  keywords: ['AI', 'Leadership', 'Software Engineering', 'Full Stack', 'Machine Learning'],
  authors: [{ name: 'Brian Steele' }],
  creator: 'Brian Steele',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://briansteele.dev',
    siteName: 'Brian Steele',
    title: 'Brian Steele - Head of AI at Honor Education',
    description: 'Head of AI at Honor Education. Writing about AI, leadership, and software engineering.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brian Steele',
    description: 'Head of AI at Honor Education',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background leading-relaxed`}>
        <div className="relative">
          <MainContainer>
            <main className="flex min-h-screen flex-col items-start px-8 gap-6 md:gap-12 md:flex-row">
              <Header />
              <ContentContainer>{children}</ContentContainer>
            </main>
          </MainContainer>
        </div>
      </body>
    </html>
  )
}
```

### Task 5.5: Performance Optimization

Add these optimizations:

1. **Image Optimization**: Already using Next.js Image component
2. **Font Optimization**: Using Next.js font optimization
3. **ISR**: Added `revalidate` to blog post pages
4. **Caching**: Added cache headers to RSS feed

**File**: `next.config.js` (add compression and optimization)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
```

---

## Phase 6: Testing & Polish (Day 15-16)

### Task 6.1: Create Loading States

**File**: `src/app/blog/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-slate-700 rounded animate-pulse w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-background-secondary rounded-lg p-6">
            <div className="h-6 bg-slate-700 rounded animate-pulse mb-4" />
            <div className="h-4 bg-slate-700 rounded animate-pulse mb-2" />
            <div className="h-4 bg-slate-700 rounded animate-pulse w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

**File**: `src/app/blog/[slug]/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-12 bg-slate-700 rounded animate-pulse mb-4" />
      <div className="h-4 bg-slate-700 rounded animate-pulse w-1/4 mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-slate-700 rounded animate-pulse" />
        <div className="h-4 bg-slate-700 rounded animate-pulse" />
        <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
      </div>
    </div>
  )
}
```

### Task 6.2: Create Not Found Page

**File**: `src/app/not-found.tsx`

```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-foreground-secondary mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent-primary text-white rounded-md hover:bg-accent-hover transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
```

### Task 6.3: Accessibility Audit

Run these checks:

1. **Keyboard Navigation**: Tab through all interactive elements
2. **ARIA Labels**: Add where needed
3. **Color Contrast**: Use a contrast checker tool
4. **Alt Text**: Ensure all images have alt text
5. **Semantic HTML**: Use proper heading hierarchy

### Task 6.4: Mobile Testing

Test on various screen sizes:
- Mobile (375px)
- Tablet (768px)
- Desktop (1024px+)

Fix any responsive issues.

---

## Testing Checklist

- [ ] Home page displays with updated content
- [ ] "What I Do" section renders correctly
- [ ] Recent posts show on home page (once data exists)
- [ ] Blog index page displays all published posts
- [ ] Tag filtering works
- [ ] Blog post pages render MDX correctly
- [ ] Code syntax highlighting works
- [ ] Images load and are optimized
- [ ] Related posts show up
- [ ] Sitemap generates at `/sitemap.xml`
- [ ] RSS feed generates at `/feed.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] Loading states work
- [ ] 404 page displays correctly
- [ ] Mobile responsive
- [ ] Lighthouse score 90+

---

## Handoff to Engineer 1

Coordinate on:
- Confirm Supabase read queries work
- Share any component patterns for admin to use
- Verify image URLs from Supabase Storage work with Next.js Image

---

## Notes

- You can start with mock data and swap to Supabase queries once Engineer 1 has the database ready
- Focus on design quality - this is the public face of the site
- Test MDX rendering thoroughly with various content types
- Ensure mobile experience is excellent
- Keep accessibility in mind throughout

## Questions?

Contact the team if you encounter:
- Issues with MDX rendering
- Next.js Image optimization problems
- Performance bottlenecks
- Design questions
