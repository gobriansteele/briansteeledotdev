# Blog Platform Refactor - Main Design Document

## Project Overview

Transform briansteele.dev from a static personal website into a full-featured blog platform with content management capabilities. The site will feature a public-facing blog showcasing AI and leadership content, plus an admin panel for content management.

## Design Inspiration

Primary inspiration: [samwho.dev](https://samwho.dev/)
- Clean, minimalist aesthetic
- Card-based content layout
- Readable typography
- Subtle animations and interactions
- Dark theme with refined color palette

## Technology Stack

### Core Framework
- **Next.js 15** (upgrade from 14.1.4)
- **React 19** (upgrade from 18.2.0)
- **TypeScript 5.x** (latest)
- **Tailwind CSS 3.4.x** (upgrade from 3.3.2)

### Backend & Data
- **Supabase** - PostgreSQL database + Authentication + Storage
- **Supabase Auth** - Google OAuth (email whitelist for admin)
- **Row Level Security (RLS)** - Database-level access control

### Content & Rendering
- **MDX** - Markdown with React components
- **next-mdx-remote** - Server-side MDX rendering
- **gray-matter** - Frontmatter parsing
- **rehype-highlight** - Syntax highlighting
- **remark-gfm** - GitHub-flavored markdown

### Deployment
- **Vercel** - Hosting and CI/CD
- **Supabase Cloud** - Database and storage hosting

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Public Site                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐        │
│  │   Home   │  │   Blog   │  │   Blog Post        │        │
│  │          │  │  Index   │  │   [slug]           │        │
│  └──────────┘  └──────────┘  └────────────────────┘        │
│                                                               │
│  Features:                                                   │
│  - Updated "About" section (Head of AI at Honor)            │
│  - Recent posts preview                                     │
│  - Tag filtering and search                                 │
│  - MDX content rendering                                    │
│  - SEO optimization                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Admin Panel                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐        │
│  │Dashboard │  │  Posts   │  │   Post Editor      │        │
│  │          │  │  List    │  │   (Create/Edit)    │        │
│  └──────────┘  └──────────┘  └────────────────────┘        │
│  ┌──────────┐  ┌──────────┐                                 │
│  │   Tags   │  │  Media   │                                 │
│  │  Mgmt    │  │ Library  │                                 │
│  └──────────┘  └──────────┘                                 │
│                                                               │
│  Protected by:                                               │
│  - Google OAuth via Supabase                                │
│  - Email whitelist (your email only)                        │
│  - Middleware route protection                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐        │
│  │PostgreSQL│  │   Auth   │  │      Storage       │        │
│  │          │  │  (OAuth) │  │   (blog-images)    │        │
│  └──────────┘  └──────────┘  └────────────────────┘        │
│                                                               │
│  Tables: posts, tags, post_tags                             │
│  RLS Policies: Public read, admin write                     │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Tables

**posts**
- `id` (uuid, primary key)
- `slug` (text, unique)
- `title` (text)
- `excerpt` (text)
- `content` (text) - MDX content
- `cover_image` (text) - Supabase Storage URL
- `published` (boolean)
- `published_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `author` (text)

**tags**
- `id` (uuid, primary key)
- `name` (text, unique)
- `slug` (text, unique)
- `created_at` (timestamp)

**post_tags** (junction table)
- `post_id` (uuid, foreign key)
- `tag_id` (uuid, foreign key)
- Primary key: (post_id, tag_id)

### Row Level Security (RLS)

- **Public users**: Read access to published posts and tags
- **Admin (your email)**: Full CRUD access to all tables
- **Unauthenticated**: Read-only access to published content

## Work Breakdown: Parallel Tracks

### Engineer 1: Infrastructure & Admin Panel
**Focus**: Backend setup, authentication, admin interface

**Responsibilities**:
- Upgrade Next.js, React, and dependencies
- Set up Supabase project (database, auth, storage)
- Implement authentication flow
- Build admin panel layout and navigation
- Create post management interface (CRUD)
- Implement media library
- Build tag management

**Dependencies**: None (can start immediately)

**Estimated Duration**: 2-3 weeks

---

### Engineer 2: Public Site & Blog Features
**Focus**: Public-facing pages, design refresh, blog rendering

**Responsibilities**:
- Update home page design and content
- Implement design system refresh (colors, typography, components)
- Build blog index page with filtering/search
- Create blog post detail pages
- Set up MDX rendering pipeline
- Implement SEO and metadata
- Create RSS feed

**Dependencies**:
- Needs basic Supabase setup (database schema, read access)
- Can work with mock data initially

**Estimated Duration**: 2-3 weeks

---

### Optional Engineer 3: Performance & Polish
**Focus**: Optimization, testing, documentation

**Responsibilities**:
- Performance optimization (caching, ISR, image optimization)
- Accessibility audit and fixes
- Cross-browser testing
- Mobile responsiveness
- Error handling and loading states
- Documentation (setup guide, content creation guide)
- Deployment configuration

**Dependencies**: Starts after Engineers 1 & 2 complete core features

**Estimated Duration**: 1-2 weeks

## Integration Points

### Week 1-2: Foundation
- **Engineer 1**: Supabase setup, database schema, basic auth
- **Engineer 2**: Design system, component library, home page mockup
- **Sync Point**: Share Supabase credentials, database schema finalized

### Week 2-3: Core Features
- **Engineer 1**: Admin panel, post editor, server actions
- **Engineer 2**: Blog pages, MDX rendering, public queries
- **Sync Point**: API contracts defined, test data in database

### Week 3-4: Integration & Testing
- **Both**: End-to-end testing, bug fixes
- **Engineer 3** (if available): Performance audit, polish
- **Sync Point**: Final review, deployment preparation

## Key Design Decisions

### Authentication Strategy
- **Choice**: Supabase Auth with Google OAuth
- **Rationale**: Minimal setup, built-in security, email whitelisting via RLS
- **Admin Access**: Single email address hardcoded in RLS policies

### Content Storage
- **Choice**: MDX stored as text in PostgreSQL
- **Rationale**: Searchable, versionable, no file system dependencies
- **Alternative Considered**: File-based (rejected due to complexity)

### Image Handling
- **Choice**: Supabase Storage with public URLs
- **Rationale**: CDN included, integrates with auth, simple upload API
- **Next.js Image**: Used for optimization and responsive images

### State Management
- **Choice**: Server Components + Server Actions (no global state library)
- **Rationale**: Next.js 15 patterns, reduced client-side JS, simpler architecture

### Styling Approach
- **Choice**: Tailwind CSS with custom design tokens
- **Rationale**: Existing in project, fast development, good DX
- **Customization**: Custom color palette inspired by samwho.dev

## Content Model

### Blog Post Workflow
1. **Draft Creation**: Create post in admin, save as draft (published=false)
2. **Editing**: Auto-save every 30s, manual save button
3. **Preview**: Live MDX preview in editor
4. **Publishing**: Toggle published status, set publish date
5. **Public Visibility**: RLS automatically filters to published posts

### Tag System
- Tags created in admin panel or during post creation
- Many-to-many relationship with posts
- Used for filtering on blog index
- Display tag clouds or lists

### Media Management
- Upload images via admin panel
- Stored in Supabase Storage `blog-images` bucket
- Copy URL to embed in MDX content
- Next.js Image component handles optimization

## SEO Strategy

- Dynamic metadata per page (title, description, OG images)
- Sitemap generation from published posts
- RSS feed for blog subscribers
- Structured data (JSON-LD) for blog posts
- Clean URLs with slugs
- Image optimization with Next.js Image

## Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Security Considerations

- **Authentication**: OAuth only, no password storage
- **Authorization**: RLS policies enforce admin-only writes
- **API Security**: Server Actions validate auth on every request
- **XSS Prevention**: MDX sanitization, CSP headers
- **CSRF Protection**: Built into Next.js Server Actions
- **Secrets Management**: Environment variables, never committed

## Deployment Strategy

### Environments
- **Development**: Local (localhost:3000)
- **Preview**: Vercel preview deployments per PR
- **Production**: Vercel production (briansteele.dev)

### CI/CD Pipeline
- **Trigger**: Push to main branch
- **Build**: Vercel automatic deployment
- **Database**: Supabase production instance
- **Secrets**: Vercel environment variables

### Rollback Plan
- Vercel instant rollback to previous deployment
- Database migrations versioned and reversible
- Regular Supabase backups

## Success Criteria

### Functional Requirements
- ✅ Admin can create, edit, publish, delete blog posts
- ✅ Admin can manage tags
- ✅ Admin can upload and manage images
- ✅ Public can view published blog posts
- ✅ Public can filter posts by tags
- ✅ Public can search posts
- ✅ Mobile responsive on all devices
- ✅ SEO optimized (sitemap, meta tags, RSS)

### Non-Functional Requirements
- ✅ Page load < 3s on 3G connection
- ✅ Lighthouse score 90+ on all pages
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Works on Chrome, Firefox, Safari latest versions
- ✅ Secure authentication with email whitelist
- ✅ RLS policies prevent unauthorized access

## Timeline

### Phase 1: Setup (Week 1)
- Dependency upgrades
- Supabase project creation
- Database schema implementation
- Basic auth flow

### Phase 2: Core Features (Weeks 2-3)
- Admin panel development
- Public site redesign
- Blog rendering pipeline
- Post management

### Phase 3: Integration (Week 4)
- Connect admin to public site
- End-to-end testing
- Bug fixes

### Phase 4: Polish (Week 5)
- Performance optimization
- Accessibility improvements
- Documentation
- Deployment

## Open Questions

1. **Comments System**: Do we want comments? If yes, use Giscus (GitHub Discussions)?
2. **Analytics**: Vercel Analytics, Google Analytics, or both?
3. **Newsletter**: Should we add email newsletter signup?
4. **Draft Sharing**: Should drafts be shareable via secret URLs?
5. **Content Versioning**: Track post edit history?

## Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [samwho.dev](https://samwho.dev/) - Design inspiration

## Team Communication

- **Daily Standup**: Sync on progress, blockers
- **Shared Documentation**: This docs folder
- **Code Reviews**: Required for all PRs
- **Integration Points**: Mark dependencies clearly in PRs
- **Environment Variables**: Share via secure method (1Password, etc.)
