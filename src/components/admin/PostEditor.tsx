'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createPost, updatePost, type PostFormData } from '@/app/admin/(protected)/posts/actions'
import { CreateTagModal } from './CreateTagModal'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image_url: string | null
  published: boolean
}

type Tag = {
  id: string
  name: string
}

type PostEditorProps = {
  post?: Post
  tags: Tag[]
  postTags?: string[] // Array of tag IDs associated with the post
}

export function PostEditor({ post, tags, postTags = [] }: PostEditorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    featured_image_url: post?.featured_image_url ?? '',
    published: post?.published ?? false,
    tags: postTags,
  })

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      // Only auto-generate slug if creating new post
      slug: post ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
  }

  const handleTagToggle = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      startTransition(async () => {
        const data: PostFormData = {
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          featured_image_url: formData.featured_image_url || undefined,
          published: formData.published,
          tags: formData.tags,
        }

        if (post) {
          await updatePost(post.id, data)
        } else {
          await createPost(data)
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="post-slug"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-300 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={3}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the post"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={15}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="Write your post content (Markdown supported)"
        />
      </div>

      <div>
        <label htmlFor="featured_image_url" className="block text-sm font-medium text-slate-300 mb-2">
          Featured Image URL
        </label>
        <input
          type="url"
          id="featured_image_url"
          value={formData.featured_image_url}
          onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagToggle(tag.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                formData.tags.includes(tag.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tag.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsCreateTagModalOpen(true)}
            className="px-3 py-1 rounded-full text-sm border-2 border-dashed border-slate-600 text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
          >
            + Create new tag
          </button>
        </div>
        {tags.length === 0 && (
          <p className="mt-2 text-sm text-slate-400">
            No tags available yet. Create your first tag to get started.
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="published" className="ml-2 text-sm font-medium text-slate-300">
          Published
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="px-6 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>

    {/* Create Tag Modal - must be outside form to avoid nested forms */}
    <CreateTagModal
      isOpen={isCreateTagModalOpen}
      onClose={() => setIsCreateTagModalOpen(false)}
    />
  </>
  )
}
