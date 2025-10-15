'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createTag } from '@/app/admin/(protected)/tags/actions'

/**
 * Generate a URL-friendly slug from a string (client-side)
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type CreateTagModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CreateTagModal({ isOpen, onClose }: CreateTagModalProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)

  if (!isOpen) return null

  const handleNameChange = (newName: string) => {
    setName(newName)
    // Auto-generate slug only if it hasn't been manually edited
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(newName))
    }
  }

  const handleSlugChange = (newSlug: string) => {
    setSlug(newSlug)
    setIsSlugManuallyEdited(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Tag name is required')
      return
    }

    if (!slug.trim()) {
      setError('Tag slug is required')
      return
    }

    try {
      startTransition(async () => {
        await createTag({ name: name.trim(), slug: slug.trim() })
        // Reset form
        setName('')
        setSlug('')
        setIsSlugManuallyEdited(false)
        setError(null)
        onClose()
        router.refresh()
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleClose = () => {
    if (!isPending) {
      setName('')
      setSlug('')
      setIsSlugManuallyEdited(false)
      setError(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create New Tag</h2>
          <button
            onClick={handleClose}
            disabled={isPending}
            className="text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Tag Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., TypeScript"
              required
              disabled={isPending}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="e.g., typescript"
              required
              disabled={isPending}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-slate-400">
              Auto-generated from name, but you can customize it
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Creating...' : 'Create Tag'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
