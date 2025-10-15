# Engineer 3: Light Theme Design Refresh

## Overview

You are responsible for redesigning the site with a clean, light theme inspired by samwho.dev. This includes changing from a dark theme to a light one, restructuring the layout from two-column to single-column, updating typography, and refining all UI components for better readability and professional appeal.

## Design Philosophy

The goal is to create a **content-first, readable, professional site** that prioritizes:
- Clean white background with excellent readability
- Single-column layout with centered content
- Simple, elegant typography with generous whitespace
- Minimal animations and effects
- Professional color accents that don't overpower content

## Your Responsibilities

1. Transform color system from dark to light theme
2. Restructure layout from sidebar + content to single column
3. Update typography system
4. Redesign all UI components (Card, Badge, Button, etc.)
5. Refactor Header from sticky sidebar to top navigation
6. Remove/simplify complex animations
7. Ensure mobile responsiveness
8. Test accessibility and performance

---

## Reference: samwho.dev Design Analysis

### Key Characteristics
- **Background**: Pure white `#ffffff`
- **Text**: Warm dark gray `#2e3440` (Nord Polar Night)
- **Max Width**: ~780px centered content
- **Font Stack**: System fonts (Seravek, Gill Sans Nova, Ubuntu, Calibri)
- **Base Font Size**: ~18-19px
- **Line Height**: 1.5
- **Layout**: Single column, sections flow vertically
- **Navigation**: Horizontal social links at top
- **Section Headings**: Large (~32px), bold, often with emoji prefixes
- **Links**: Soft blue `#5e81ac` with hover states
- **Cards/Sections**: Subtle borders, minimal shadows
- **Spacing**: Generous whitespace between sections

---

## Phase 1: Color System Transformation (Days 1-2)

### Current State (Dark Theme)
```javascript
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
}
```

### New Light Theme Palette

**File**: `tailwind.config.js`

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
          DEFAULT: '#ffffff', // Pure white
          secondary: '#f8f9fa', // Very light gray for cards
          tertiary: '#e9ecef', // Light gray for hover states
        },
        foreground: {
          DEFAULT: '#2e3440', // Warm dark gray (primary text)
          secondary: '#4c566a', // Medium gray (secondary text)
          muted: '#6c757d', // Muted gray (tertiary text)
        },
        accent: {
          primary: '#5e81ac', // Soft blue (links, primary actions)
          secondary: '#88c0d0', // Teal (highlights)
          tertiary: '#81a1c1', // Light blue (alt accent)
          hover: '#4c6a8a', // Darker blue (hover state)
        },
        border: {
          DEFAULT: '#dee2e6', // Light border
          secondary: '#adb5bd', // Medium border
        },
        success: '#a3be8c', // Sage green
        warning: '#ebcb8b', // Warm yellow
        error: '#bf616a', // Muted red
        info: '#88c0d0', // Teal
      },
      maxWidth: {
        'content': '780px', // Match samwho.dev
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2e3440',
            maxWidth: 'none',
            a: {
              color: '#5e81ac',
              textDecoration: 'underline',
              textDecorationColor: '#5e81ac',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#4c6a8a',
                textDecorationColor: '#4c6a8a',
              },
            },
            h1: {
              color: '#2e3440',
              fontWeight: '700',
            },
            h2: {
              color: '#2e3440',
              fontWeight: '700',
              fontSize: '2rem',
            },
            h3: {
              color: '#2e3440',
              fontWeight: '600',
            },
            h4: {
              color: '#2e3440',
              fontWeight: '600',
            },
            strong: {
              color: '#2e3440',
              fontWeight: '600',
            },
            code: {
              color: '#2e3440',
              backgroundColor: '#f8f9fa',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#2e3440',
              color: '#d8dee9',
            },
            blockquote: {
              color: '#4c566a',
              borderLeftColor: '#5e81ac',
            },
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

### Typography System

Use system font stack for native feel:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

Or if you prefer the samwho.dev aesthetic:

```css
font-family: Seravek, "Gill Sans Nova", Ubuntu, Calibri,
             "DejaVu Sans", source-sans-pro, sans-serif;
```

---

## Phase 2: Global Styles Update (Day 2)

### File: `src/app/globals.css`

**Replace entire file with:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
    font-size: 18px;
    line-height: 1.6;
  }

  a {
    @apply text-accent-primary hover:text-accent-hover transition-colors duration-200;
  }

  h1 {
    @apply text-foreground font-bold text-4xl mb-4;
  }

  h2 {
    @apply text-foreground font-bold text-3xl mb-3;
  }

  h3 {
    @apply text-foreground font-semibold text-2xl mb-2;
  }

  h4, h5, h6 {
    @apply text-foreground font-semibold;
  }
}

@layer components {
  .section-heading {
    @apply text-2xl font-bold text-foreground mb-6;
  }

  .link-underline {
    @apply underline decoration-2 decoration-accent-primary
           underline-offset-4 hover:decoration-accent-hover
           transition-colors duration-200;
  }

  .prose-light {
    @apply prose prose-lg max-w-none;
  }
}

/* Code highlighting for light theme */
pre[class*="language-"] {
  @apply bg-[#2e3440] rounded-lg p-4 overflow-x-auto text-sm;
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
  @apply bg-accent-secondary/30;
}

/* Import syntax highlighting theme - use a light-friendly dark theme for code */
@import 'highlight.js/styles/nord.css';
```

---

## Phase 3: Layout Restructure (Days 3-4)

### Current Structure
- Two-column layout (1/3 sidebar + 2/3 content)
- Sticky sidebar with header
- Mouse highlight effect
- Content flows beside sidebar

### New Structure
- Single column, centered
- Header at top (not sticky)
- Maximum width of 780px
- All content flows vertically
- Remove mouse highlight effect

### File: `src/app/layout.tsx`

**Replace with:**

```typescript
import './globals.css'
import type { Metadata } from 'next'

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
      <body className="antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
```

### File: `src/app/page.tsx`

**Replace with:**

```typescript
import { About, Experience } from '@/components'
import { WhatIDo } from '@/components/WhatIDo'
import { RecentPosts } from '@/components/RecentPosts'
import { Header } from '@/components/Header'
import { getMockPosts } from '@/lib/mockData'

export default function Home() {
  // Using mock data for now - Engineer 1 will replace with Supabase queries
  const recentPosts = getMockPosts({ limit: 3 })

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Header />

      <main className="mt-16 space-y-20">
        <About />
        <WhatIDo />
        <RecentPosts posts={recentPosts} />
        <Experience />
      </main>
    </div>
  )
}
```

---

## Phase 4: Component Redesign (Days 4-6)

### File: `src/components/Header.tsx`

**Replace with:**

```typescript
import { Avatar } from './Avatar'
import { SocialContacts } from './SocialContacts'

export function Header() {
  return (
    <header className="text-center">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <Avatar />
      </div>

      {/* Name and Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        Brian Steele
      </h1>
      <h2 className="text-xl md:text-2xl text-foreground-secondary mb-6">
        Head of AI at Honor Education
      </h2>

      {/* Social Links - Horizontal */}
      <div className="flex justify-center">
        <SocialContacts />
      </div>
    </header>
  )
}
```

### File: `src/components/SocialContacts.tsx`

**Update to horizontal layout:**

```typescript
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourprofile',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourhandle',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:your@email.com',
    icon: Mail,
  },
]

export function SocialContacts() {
  return (
    <nav className="flex items-center gap-6">
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-secondary hover:text-accent-primary transition-colors"
            aria-label={social.name}
          >
            <Icon size={24} />
          </a>
        )
      })}
    </nav>
  )
}
```

### File: `src/components/Avatar.tsx`

**Update styling for light theme:**

```typescript
import Image from 'next/image'

export function Avatar() {
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border">
      <Image
        src="/avatar.jpg" // Update with your avatar path
        alt="Brian Steele"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
```

### File: `src/components/ui/Card.tsx`

**Replace with light theme version:**

```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-background-secondary
        rounded-lg
        p-6
        border
        border-border
        ${hover ? 'transition-all duration-200 hover:border-accent-primary hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
```

### File: `src/components/ui/Badge.tsx`

**Replace with light theme version:**

```typescript
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-background-tertiary text-foreground-secondary border border-border',
    primary: 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20',
    secondary: 'bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20',
  }

  return (
    <span
      className={`
        inline-block
        px-3
        py-1
        text-xs
        font-medium
        rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
```

### File: `src/components/ui/Button.tsx`

**Update if it exists:**

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
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200'

  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-accent-hover',
    secondary: 'bg-background-tertiary text-foreground hover:bg-border',
    ghost: 'text-foreground-secondary hover:text-foreground hover:bg-background-secondary',
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

### Delete These Files (No Longer Needed)

1. `src/components/MainContainer.tsx` - Remove mouse highlight effect
2. `src/components/ContentContainer.tsx` - No longer need content wrapper
3. `src/hooks/useMouseHighlight.ts` - Remove if exists

---

## Phase 5: Page Component Updates (Days 6-8)

### File: `src/components/About.tsx`

**Update styling:**

```typescript
export function About() {
  return (
    <section id="about">
      <h2 className="section-heading">👋 About</h2>

      <div className="space-y-4 text-foreground-secondary text-lg leading-relaxed">
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
          <a href="https://ameriprise.com" target="_blank" rel="noopener noreferrer" className="link-underline">
            Ameriprise Financial
          </a>,{' '}
          <a href="https://vsco.co" target="_blank" rel="noopener noreferrer" className="link-underline">
            VSCO
          </a>, and{' '}
          <a href="https://docusign.com" target="_blank" rel="noopener noreferrer" className="link-underline">
            DocuSign
          </a>.
        </p>
        <p>
          These days, I spend my time working across the entire platform at{' '}
          <a href="https://honor.education" target="_blank" rel="noopener noreferrer" className="link-underline">
            Honor Education
          </a>—from native clients to Java backends, with TypeScript, Python, and AI models
          in between. I'm passionate about the intersection of engineering leadership and
          cutting-edge AI technology.
        </p>
        <p>
          When I'm not writing code or leading AI initiatives, you can find me{' '}
          <a href="https://www.strava.com/athletes/33433580" target="_blank" rel="noopener noreferrer" className="link-underline">
            on my bike
          </a>{' '}
          exploring Minneapolis, MN, or discovering great coffee shops and breweries with excellent IPAs.
        </p>
      </div>
    </section>
  )
}
```

### File: `src/components/WhatIDo.tsx`

**Update for light theme:**

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
    <section id="what-i-do">
      <h2 className="section-heading">💼 What I Do</h2>

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

### File: `src/components/RecentPosts.tsx`

**Update for light theme:**

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
  if (!posts || posts.length === 0) return null

  return (
    <section id="recent-posts">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-heading mb-0">✍️ Recent Posts</h2>
        <Link
          href="/blog"
          className="text-accent-primary hover:text-accent-hover text-sm font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} hover>
            <Link href={`/blog/${post.slug}`}>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {post.post_tags.map((pt) => (
                    <Badge key={pt.tags.name}>{pt.tags.name}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 hover:text-accent-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground-secondary mb-3">{post.excerpt}</p>
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

### File: `src/components/Experience.tsx`

**Update if it exists - add section heading style:**

```typescript
export function Experience() {
  return (
    <section id="experience">
      <h2 className="section-heading">💼 Experience</h2>

      {/* Your existing experience content with light theme colors */}
      {/* Update text colors to use foreground, foreground-secondary, etc. */}
    </section>
  )
}
```

---

## Phase 6: Blog Pages Update (Days 8-9)

### File: `src/app/blog/page.tsx`

**Update layout and styling:**

```typescript
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDistance } from 'date-fns'
import Image from 'next/image'
import { getMockPosts, mockTags } from '@/lib/mockData'

interface SearchParams {
  tag?: string
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const resolvedParams = await searchParams
  // Using mock data for now - Engineer 1 will replace with Supabase queries
  const posts = getMockPosts({ tag: resolvedParams.tag })
  const allTags = mockTags

  return (
    <div className="max-w-content mx-auto px-6 py-12">
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
                {post.post_tags.map((pt) => (
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

### File: `src/app/blog/[slug]/page.tsx`

**Update layout wrapper:**

Add this wrapper around the existing content:

```typescript
// At the top of the component return
return (
  <div className="max-w-content mx-auto px-6 py-12">
    <article>
      {/* Existing header, content, and related posts */}
    </article>
  </div>
)
```

Update colors throughout to use light theme tokens (`foreground`, `foreground-secondary`, etc.)

### File: `src/components/MDXContent.tsx`

**Update component styles:**

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
      className="rounded-lg border border-border"
      alt={props.alt || ''}
    />
  ),
  a: (props: any) => (
    <Link
      {...props}
      className="text-accent-primary hover:text-accent-hover underline underline-offset-2"
    />
  ),
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-6 mb-3 text-foreground" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-4 mb-2 text-foreground" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-foreground-secondary" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-foreground-secondary" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent-primary bg-background-secondary pl-4 py-2 italic my-4 text-foreground-secondary" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-background-secondary px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-[#2e3440] text-[#d8dee9] p-4 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
  ),
}

interface MDXContentProps {
  source: MDXRemoteSerializeResult
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg prose-light max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  )
}
```

---

## Phase 7: Navigation & Links (Day 9)

### Add Navigation Component

**File**: `src/components/Navigation.tsx` (new file)

```typescript
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  // Add more as needed
]

export function Navigation() {
  return (
    <nav className="mb-8">
      <ul className="flex justify-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-foreground-secondary hover:text-accent-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

Update Header to include Navigation:

```typescript
// In src/components/Header.tsx, add after social contacts:
<Navigation />
```

---

## Phase 8: Mobile & Responsive (Day 10)

### Responsive Breakpoints

Ensure these breakpoints work well:
- Mobile: 320px - 767px (single column, smaller text)
- Tablet: 768px - 1023px (can use 2-column grid for cards)
- Desktop: 1024px+ (max-width: 780px centered)

### Key Responsive Updates

1. **Typography scaling:**
```css
/* Mobile */
@media (max-width: 767px) {
  body { font-size: 16px; }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
}

/* Desktop */
@media (min-width: 768px) {
  body { font-size: 18px; }
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
}
```

2. **Padding adjustments:**
```typescript
// Use responsive padding classes
<div className="px-4 md:px-6 py-8 md:py-12">
```

3. **Grid adjustments:**
```typescript
// Use responsive grid columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
```

---

## Phase 9: Testing & Polish (Day 11-12)

### Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA labels where needed
- [ ] Focus states visible on all interactive elements
- [ ] Skip to main content link (optional but nice)

### Performance Checklist

- [ ] Images optimized (using Next.js Image)
- [ ] Fonts optimized (system fonts = instant)
- [ ] No layout shift (CLS score < 0.1)
- [ ] First contentful paint < 1.8s
- [ ] Lighthouse score 90+ on all metrics

### Browser Testing

Test in:
- Chrome
- Firefox
- Safari
- Edge
- Mobile Safari (iOS)
- Mobile Chrome (Android)

### Visual QA Checklist

- [ ] All text readable with good contrast
- [ ] Spacing consistent throughout
- [ ] Borders and shadows subtle but visible
- [ ] Hover states work on all interactive elements
- [ ] Loading states look good
- [ ] 404 page styled correctly
- [ ] Blog post content renders beautifully
- [ ] Code blocks readable
- [ ] Links clearly identifiable

---

## Migration Strategy

### Step-by-Step Migration

1. **Create feature branch**: `git checkout -b design-refresh`

2. **Start with color system**:
   - Update `tailwind.config.js`
   - Update `globals.css`
   - Test that build doesn't break

3. **Update layout structure**:
   - Update `layout.tsx`
   - Update `page.tsx`
   - Remove old container components

4. **Update components one by one**:
   - Start with Header
   - Then UI components (Card, Badge, Button)
   - Then page sections (About, WhatIDo, etc.)
   - Finally blog pages

5. **Test after each major change**:
   ```bash
   npm run dev
   # Check http://localhost:3000
   ```

6. **Run build to catch errors**:
   ```bash
   npm run build
   ```

7. **Deploy to preview**:
   - Push to branch
   - Deploy to Vercel preview
   - Review in production-like environment

8. **Get feedback and iterate**

9. **Merge to main when ready**

### Rollback Plan

If you need to rollback:
```bash
git checkout main
git branch -D design-refresh
```

All changes are in the feature branch, so main stays safe.

---

## File Structure Summary

### Files to Modify
```
src/
├── app/
│   ├── layout.tsx ..................... (major changes)
│   ├── page.tsx ....................... (major changes)
│   ├── globals.css .................... (complete rewrite)
│   ├── blog/
│   │   ├── page.tsx ................... (styling updates)
│   │   └── [slug]/
│   │       └── page.tsx ............... (styling updates)
├── components/
│   ├── Header.tsx ..................... (major restructure)
│   ├── SocialContacts.tsx ............. (layout change)
│   ├── Avatar.tsx ..................... (styling update)
│   ├── About.tsx ...................... (styling update)
│   ├── WhatIDo.tsx .................... (styling update)
│   ├── RecentPosts.tsx ................ (styling update)
│   ├── Experience.tsx ................. (styling update)
│   ├── MDXContent.tsx ................. (styling update)
│   └── ui/
│       ├── Card.tsx ................... (complete rewrite)
│       ├── Badge.tsx .................. (complete rewrite)
│       └── Button.tsx ................. (styling update)
└── tailwind.config.js ................. (complete rewrite)
```

### Files to Delete
```
src/
├── components/
│   ├── MainContainer.tsx .............. (delete)
│   └── ContentContainer.tsx ........... (delete)
└── hooks/
    └── useMouseHighlight.ts ........... (delete if exists)
```

### Files to Create
```
src/
└── components/
    └── Navigation.tsx ................. (new - optional)
```

---

## Visual Design Reference

### Typography Scale
- **Heading 1**: 40px (2.5rem) - Page titles
- **Heading 2**: 32px (2rem) - Section headings
- **Heading 3**: 24px (1.5rem) - Subsection headings
- **Body**: 18px (1.125rem) - Main content
- **Small**: 14px (0.875rem) - Meta info

### Spacing Scale
- **Section spacing**: 5rem (80px) between major sections
- **Component spacing**: 1.5rem (24px) between components
- **Element spacing**: 0.75rem (12px) between related elements
- **Tight spacing**: 0.5rem (8px) for inline elements

### Border Radius
- **Small**: 0.375rem (6px) - Badges
- **Medium**: 0.5rem (8px) - Cards, buttons
- **Large**: 9999px - Pills, fully rounded

### Shadows (Minimal)
- **Hover**: `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Card**: `0 1px 3px rgba(0, 0, 0, 0.06)`

---

## Questions & Support

If you run into issues:

1. **Color contrast problems**: Use WebAIM contrast checker
2. **Layout breaks**: Check responsive classes at each breakpoint
3. **Build errors**: Check TypeScript types for new color tokens
4. **Design questions**: Reference samwho.dev for inspiration

Coordinate with:
- **Engineer 1**: Supabase data queries still work
- **Designer**: If you need design decisions
- **Brian**: Final approval on look and feel

---

## Success Criteria

The redesign is complete when:

- ✅ Site uses light theme throughout
- ✅ Single-column layout on all pages
- ✅ Typography is readable and professional
- ✅ All components use new color system
- ✅ Mobile experience is excellent
- ✅ Accessibility score is high
- ✅ Performance metrics are good
- ✅ No visual regressions
- ✅ Brian approves the design

---

## Timeline

**Total: 12 days**

- Days 1-2: Color system and global styles
- Days 3-4: Layout restructure
- Days 4-6: Component redesign
- Days 6-8: Page updates
- Days 8-9: Blog pages and MDX
- Day 9: Navigation and links
- Day 10: Responsive refinement
- Days 11-12: Testing, polish, and QA

Good luck! This will transform the site into a clean, professional, content-focused experience. 🎨
