'use client'

import { useState } from 'react'
import { deleteImage } from '@/app/admin/(protected)/media/actions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type MediaImageCardProps = {
  fileName: string
  publicUrl: string
}

export function MediaImageCard({ fileName, publicUrl }: MediaImageCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteImage(fileName)
      router.refresh()
    } catch (err) {
      console.error('Failed to delete image:', err)
      alert(err instanceof Error ? err.message : 'Failed to delete image')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
      {/* Image Preview */}
      <div className="relative w-full h-48 mb-3 bg-slate-900 rounded overflow-hidden">
        <Image
          src={publicUrl}
          alt={fileName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Filename */}
      <p className="text-sm text-slate-300 truncate mb-3" title={fileName}>
        {fileName}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopyUrl}
          className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {copySuccess ? 'Copied!' : 'Copy URL'}
        </button>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Delete
          </button>
        ) : (
          <div className="flex gap-1">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-2 py-2 text-xs bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDeleting ? '...' : 'Yes'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className="px-2 py-2 text-xs bg-slate-600 text-white rounded hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
