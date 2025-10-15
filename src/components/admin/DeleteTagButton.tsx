'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTag } from '@/app/admin/(protected)/tags/actions'
import { TagWithPostCount } from '@/types/blog'

type DeleteTagButtonProps = {
  tag: TagWithPostCount
}

export function DeleteTagButton({ tag }: DeleteTagButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setError(null)

    try {
      startTransition(async () => {
        await deleteTag(tag.id)
        setShowConfirm(false)
        router.refresh()
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isPending}
        className="px-3 py-1 text-sm text-red-400 hover:text-red-300 border border-red-700 rounded hover:bg-red-900/20 transition-colors disabled:opacity-50"
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Delete Tag?</h2>
              <button
                onClick={() => setShowConfirm(false)}
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

            {/* Confirmation message */}
            <div className="mb-6">
              <p className="text-slate-300 mb-4">
                Are you sure you want to delete the tag{' '}
                <span className="font-semibold text-white">&quot;{tag.name}&quot;</span>?
              </p>

              {tag.post_count && tag.post_count > 0 ? (
                <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-200 px-4 py-3 rounded">
                  <p className="font-medium mb-1">Warning</p>
                  <p className="text-sm">
                    This tag is used in {tag.post_count} {tag.post_count === 1 ? 'post' : 'posts'}.
                    It will be removed from all posts, but the posts themselves will remain.
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">
                  This tag is not currently used in any posts.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? 'Deleting...' : 'Delete Tag'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
