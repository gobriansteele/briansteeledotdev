'use client'

import { useTransition } from 'react'
import { togglePublished } from '@/app/admin/(protected)/posts/actions'

type TogglePublishButtonProps = {
  postId: string
  isPublished: boolean
}

export function TogglePublishButton({ postId, isPublished }: TogglePublishButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      await togglePublished(postId, isPublished)
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-3 py-1 text-sm rounded transition-colors disabled:opacity-50 ${
        isPublished
          ? 'text-slate-400 hover:text-slate-300 border border-slate-600 hover:bg-slate-700'
          : 'text-green-400 hover:text-green-300 border border-green-700 hover:bg-green-900/20'
      }`}
    >
      {isPending ? '...' : isPublished ? 'Unpublish' : 'Publish'}
    </button>
  )
}
