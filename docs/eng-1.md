# Engineer 1: Infrastructure & Admin Panel

## Overview

You are responsible for the backend infrastructure and admin panel. This includes upgrading dependencies, setting up Supabase, implementing authentication, and building the complete admin interface for content management.

## Your Responsibilities

1. Upgrade Next.js, React, and all dependencies
2. Set up Supabase project (database, auth, storage)
3. Implement authentication with Google OAuth
4. Build admin panel layout and navigation
5. Create post management interface (CRUD operations)
6. Implement media library for image uploads
7. Build tag management system
8. Create Server Actions for admin operations

## Dependencies

**None** - You can start immediately!

You'll be providing the foundation that Engineer 2 needs, so prioritize getting the Supabase setup done first.

---

## Phase 1: Dependency Upgrades (Days 1-2)

### Task 1.1: Upgrade Core Dependencies

**File**: `package.json`

Update the following dependencies:

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "framer-motion": "^11.5.0"
  }
}
```

Add new dependencies:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/ssr": "^0.1.0",
    "date-fns": "^3.0.0"
  }
}
```

**Commands**:
```bash
npm install next@latest react@latest react-dom@latest
npm install @supabase/supabase-js @supabase/ssr date-fns
npm install -D @types/react@latest @types/react-dom@latest typescript@latest
```

### Task 1.2: Test Existing Site

After upgrades, verify the site still works:

```bash
npm run dev
```

Visit `http://localhost:3000` and check:
- Home page renders
- Navigation works
- No console errors
- Styles are intact

**Note**: Fix any breaking changes from Next.js 15 or React 19. Check the console for warnings.

### Task 1.3: Update Next.js Config

**File**: `next.config.js`

Update to Next.js 15 format if needed:

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
  },
}

module.exports = nextConfig
```

---

## Phase 2: Supabase Setup (Days 3-4)

### Task 2.1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project (choose a region close to your users)
3. Save credentials:
   - Project URL
   - Anon/Public key
   - Service Role key (keep secret!)

### Task 2.2: Set Up Environment Variables

**File**: `.env.local` (create this file, add to `.gitignore`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=your-email@gmail.com
```

**Share with Engineer 2**: The first two public variables (URL and anon key)

### Task 2.3: Create Database Schema

Go to Supabase Dashboard → SQL Editor → New Query

**Execute this SQL**:

```sql
-- Posts table
create table posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  author text default 'Brian Steele'
);

-- Tags table
create table tags (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  slug text unique not null,
  created_at timestamp with time zone default now()
);

-- Post-Tag junction table
create table post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- Indexes for performance
create index posts_slug_idx on posts(slug);
create index posts_published_idx on posts(published);
create index posts_published_at_idx on posts(published_at desc);
create index tags_slug_idx on tags(slug);

-- Function for updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for auto-updating updated_at
create trigger update_posts_updated_at before update on posts
  for each row execute procedure update_updated_at_column();

-- Row Level Security (RLS)
alter table posts enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;

-- Public read access for published posts
create policy "Published posts are viewable by everyone"
  on posts for select
  using (published = true);

-- Only admin email can manage posts (REPLACE WITH YOUR EMAIL)
create policy "Admin can manage posts"
  on posts for all
  using (auth.jwt() ->> 'email' = 'your-email@gmail.com');

-- Tags policies
create policy "Tags are viewable by everyone"
  on tags for select
  using (true);

create policy "Admin can manage tags"
  on tags for all
  using (auth.jwt() ->> 'email' = 'your-email@gmail.com');

-- Post tags policies
create policy "Post tags are viewable by everyone"
  on post_tags for select
  using (true);

create policy "Admin can manage post tags"
  on post_tags for all
  using (auth.jwt() ->> 'email' = 'your-email@gmail.com');
```

**IMPORTANT**: Replace `'your-email@gmail.com'` with your actual email in all policies!

### Task 2.4: Set Up Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create new bucket: `blog-images`
3. Make it **public**
4. Set policies:
   - Public read access
   - Authenticated write access (only your email via RLS)

**Add storage policy (SQL Editor)**:

```sql
-- Allow public to read images
create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Admin can upload images
create policy "Admin can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-images'
    and auth.jwt() ->> 'email' = 'your-email@gmail.com'
  );

-- Admin can delete images
create policy "Admin can delete images"
  on storage.objects for delete
  using (
    bucket_id = 'blog-images'
    and auth.jwt() ->> 'email' = 'your-email@gmail.com'
  );
```

### Task 2.5: Configure Google OAuth

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Get OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/):
   - Create OAuth 2.0 Client ID
   - Authorized redirect URIs: `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret
4. Enter credentials in Supabase
5. Save

### Task 2.6: Insert Sample Data (For Testing)

```sql
-- Insert sample tags
insert into tags (name, slug) values
  ('AI', 'ai'),
  ('Leadership', 'leadership'),
  ('Engineering', 'engineering');

-- Insert sample post
insert into posts (slug, title, excerpt, content, published, published_at) values (
  'hello-world',
  'Hello World',
  'My first blog post about AI and leadership.',
  '# Hello World\n\nThis is my first post!\n\n## About Me\n\nI''m the Head of AI at Honor Education.',
  true,
  now()
);

-- Link post to tags
insert into post_tags (post_id, tag_id)
select p.id, t.id
from posts p, tags t
where p.slug = 'hello-world' and t.slug in ('ai', 'leadership');
```

---

## Phase 3: Supabase Client Setup (Day 5)

### Task 3.1: Create Server Client

**File**: `src/lib/supabase/server.ts`

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

### Task 3.2: Create Browser Client

**File**: `src/lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Task 3.3: Create Auth Utilities

**File**: `src/lib/auth.ts`

```typescript
import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}

export async function requireAdmin() {
  const user = await requireAuth()

  const adminEmail = process.env.ADMIN_EMAIL

  if (user.email !== adminEmail) {
    redirect('/')
  }

  return user
}
```

---

## Phase 4: Authentication Flow (Days 6-7)

### Task 4.1: Create Middleware

**File**: `src/middleware.ts`

```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**File**: `src/lib/supabase/middleware.ts`

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session
  await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user && !request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (user && user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}
```

### Task 4.2: Create Login Page

**File**: `src/app/admin/login/page.tsx`

```typescript
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { SignInButton } from './SignInButton'

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-lg">
        <div>
          <h2 className="text-3xl font-bold text-white text-center">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-slate-400">
            Sign in with your Google account
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  )
}
```

**File**: `src/app/admin/login/SignInButton.tsx`

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'

export function SignInButton() {
  const handleSignIn = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button
      onClick={handleSignIn}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Sign in with Google
    </button>
  )
}
```

### Task 4.3: Create Auth Callback Route

**File**: `src/app/auth/callback/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/admin', requestUrl.origin))
}
```

---

## Phase 5: Admin Panel Layout (Days 8-9)

### Task 5.1: Create Admin Layout

**File**: `src/app/admin/layout.tsx`

```typescript
import { requireAdmin } from '@/lib/auth'
import { AdminNav } from '@/components/admin/AdminNav'
import { SignOutButton } from '@/components/admin/SignOutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-slate-800 border-r border-slate-700">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-6">Admin Panel</h1>
            <AdminNav />
            <div className="mt-8">
              <p className="text-sm text-slate-400 mb-2">{user.email}</p>
              <SignOutButton />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Task 5.2: Create Admin Navigation

**File**: `src/components/admin/AdminNav.tsx`

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/posts/new', label: 'New Post' },
  { href: '/admin/tags', label: 'Tags' },
  { href: '/admin/media', label: 'Media' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-slate-700 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
```

### Task 5.3: Create Sign Out Button

**File**: `src/components/admin/SignOutButton.tsx`

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
    >
      Sign Out
    </button>
  )
}
```

### Task 5.4: Create Admin Dashboard

**File**: `src/app/admin/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get counts
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', false)

  // Get recent posts
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-slate-400 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold text-white mt-2">{totalPosts || 0}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-slate-400 text-sm font-medium">Published</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">{publishedPosts || 0}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-slate-400 text-sm font-medium">Drafts</h3>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{draftPosts || 0}</p>
        </div>
      </div>

      {/* Recent posts */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentPosts?.map((post) => (
            <div key={post.id} className="flex justify-between items-center p-3 bg-slate-700 rounded">
              <div>
                <h3 className="text-white font-medium">{post.title}</h3>
                <p className="text-sm text-slate-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${
                post.published
                  ? 'bg-green-900 text-green-300'
                  : 'bg-yellow-900 text-yellow-300'
              }`}>
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## Phase 6: Post Management (Days 10-14)

### Task 6.1: Create Posts List Page

**File**: `src/app/admin/posts/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { DeletePostButton } from '@/components/admin/DeletePostButton'
import { TogglePublishButton } from '@/components/admin/TogglePublishButton'

export default async function PostsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      post_tags (
        tags (
          name
        )
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 text-white">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    post.published
                      ? 'bg-green-900 text-green-300'
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {post.post_tags.map((pt: any) => pt.tags.name).join(', ')}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </Link>
                  <TogglePublishButton postId={post.id} published={post.published} />
                  <DeletePostButton postId={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### Task 6.2: Create Server Actions

**File**: `src/app/admin/actions.ts`

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function createPost(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string || slugify(title)
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const coverImage = formData.get('cover_image') as string
  const published = formData.get('published') === 'true'
  const tagIds = formData.getAll('tags') as string[]

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) throw error

  // Add tags
  if (tagIds.length > 0) {
    await supabase
      .from('post_tags')
      .insert(tagIds.map(tagId => ({ post_id: post.id, tag_id: tagId })))
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  redirect('/admin/posts')
}

export async function updatePost(postId: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const coverImage = formData.get('cover_image') as string
  const published = formData.get('published') === 'true'
  const tagIds = formData.getAll('tags') as string[]

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq('id', postId)

  if (error) throw error

  // Update tags
  await supabase.from('post_tags').delete().eq('post_id', postId)
  if (tagIds.length > 0) {
    await supabase
      .from('post_tags')
      .insert(tagIds.map(tagId => ({ post_id: postId, tag_id: tagId })))
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
}

export async function deletePost(postId: string) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)

  if (error) throw error

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
}

export async function togglePublished(postId: string, currentState: boolean) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .update({
      published: !currentState,
      published_at: !currentState ? new Date().toISOString() : null,
    })
    .eq('id', postId)

  if (error) throw error

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
}

export async function uploadImage(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const file = formData.get('file') as File
  const fileName = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName)

  return publicUrl
}
```

### Task 6.3: Create Post Editor

**File**: `src/app/admin/posts/new/page.tsx`

```typescript
import { PostForm } from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Create New Post</h1>
      <PostForm />
    </div>
  )
}
```

**File**: `src/app/admin/posts/[id]/edit/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/admin/PostForm'
import { notFound } from 'next/navigation'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      post_tags (
        tag_id
      )
    `)
    .eq('id', params.id)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  )
}
```

**File**: `src/components/admin/PostForm.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { createPost, updatePost, uploadImage } from '@/app/admin/actions'
import { createClient } from '@/lib/supabase/client'

interface PostFormProps {
  post?: any
}

export function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [coverImage, setCoverImage] = useState(post?.cover_image || '')
  const [published, setPublished] = useState(post?.published || false)
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.post_tags?.map((pt: any) => pt.tag_id) || []
  )
  const [tags, setTags] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('tags').select('*').order('name')
    if (data) setTags(data)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const url = await uploadImage(formData)
      setCoverImage(url)
    } catch (error) {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('excerpt', excerpt)
    formData.append('content', content)
    formData.append('cover_image', coverImage)
    formData.append('published', String(published))
    selectedTags.forEach(tagId => formData.append('tags', tagId))

    if (post) {
      await updatePost(post.id, formData)
    } else {
      await createPost(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Content (MDX)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={20}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="mb-2"
        />
        {coverImage && (
          <img src={coverImage} alt="Cover" className="max-w-xs rounded" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags
        </label>
        <div className="space-y-2">
          {tags.map(tag => (
            <label key={tag.id} className="flex items-center text-slate-300">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, tag.id])
                  } else {
                    setSelectedTags(selectedTags.filter(id => id !== tag.id))
                  }
                }}
                className="mr-2"
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center text-slate-300">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mr-2"
          />
          Published
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {post ? 'Update' : 'Create'} Post
        </button>
        <a
          href="/admin/posts"
          className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
```

---

## Phase 7: Tag & Media Management (Days 15-16)

### Task 7.1: Tags Page

**File**: `src/app/admin/tags/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { CreateTagForm } from '@/components/admin/CreateTagForm'
import { DeleteTagButton } from '@/components/admin/DeleteTagButton'

export default async function TagsPage() {
  const supabase = await createClient()

  const { data: tags } = await supabase
    .from('tags')
    .select(`
      *,
      post_tags (count)
    `)
    .order('name')

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Tags</h1>

      <div className="mb-8 max-w-md">
        <CreateTagForm />
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Posts</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {tags?.map((tag) => (
              <tr key={tag.id}>
                <td className="px-6 py-4 text-white">{tag.name}</td>
                <td className="px-6 py-4 text-slate-400">{tag.slug}</td>
                <td className="px-6 py-4 text-slate-400">{tag.post_tags.length}</td>
                <td className="px-6 py-4 text-right">
                  <DeleteTagButton tagId={tag.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### Task 7.2: Media Library

**File**: `src/app/admin/media/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { UploadImageForm } from '@/components/admin/UploadImageForm'

export default async function MediaPage() {
  const supabase = await createClient()

  const { data: files } = await supabase.storage
    .from('blog-images')
    .list()

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Media Library</h1>

      <div className="mb-8">
        <UploadImageForm />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {files?.map((file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(file.name)

          return (
            <div key={file.name} className="bg-slate-800 rounded-lg p-4">
              <img src={publicUrl} alt={file.name} className="w-full h-48 object-cover rounded mb-2" />
              <p className="text-sm text-slate-400 truncate">{file.name}</p>
              <button
                onClick={() => navigator.clipboard.writeText(publicUrl)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-2"
              >
                Copy URL
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

---

## Testing Checklist

- [ ] Dependencies upgraded successfully
- [ ] Site builds without errors
- [ ] Supabase project created and configured
- [ ] Database schema created
- [ ] Sample data inserted
- [ ] Google OAuth configured
- [ ] Can log in with Google
- [ ] Middleware protects admin routes
- [ ] Admin dashboard displays stats
- [ ] Can create new post
- [ ] Can edit existing post
- [ ] Can delete post
- [ ] Can toggle published status
- [ ] Can upload images
- [ ] Can manage tags
- [ ] Media library works

---

## Handoff to Engineer 2

Once you complete Phase 2 (Supabase Setup), share:

1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Confirm database schema is created

Engineer 2 can then start working on public pages using read-only queries.

---

## Notes

- Prioritize Supabase setup (Phase 2) first - Engineer 2 needs this
- Test authentication thoroughly - it's critical
- Keep admin UI simple initially - can polish later
- Document any issues or blockers
- Commit frequently with clear messages

## Questions?

Contact the team if you encounter:
- OAuth configuration issues
- RLS policy problems
- Middleware redirect loops
- Database connection errors
