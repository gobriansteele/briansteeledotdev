'use client'

import { useState, useTransition } from 'react'
import { deletePost } from '@/app/admin/(protected)/posts/actions'

type DeletePostButtonProps = {
  postId: string
  title: string
}

export function DeletePostButton({ postId, title }: DeletePostButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deletePost(postId)
    })
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Delete &quot;{title}&quot;?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Deleting...' : 'Yes'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="px-3 py-1 text-sm text-slate-300 hover:text-white transition-colors"
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-3 py-1 text-sm text-red-400 hover:text-red-300 border border-red-700 rounded hover:bg-red-900/20 transition-colors"
    >
      Delete
    </button>
  )
}
