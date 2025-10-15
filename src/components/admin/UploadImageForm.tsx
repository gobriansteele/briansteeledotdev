'use client'

import { useState, useRef } from 'react'
import { uploadImage } from '@/app/admin/(protected)/media/actions'
import { useRouter } from 'next/navigation'

export function UploadImageForm() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    if (!file || file.size === 0) {
      setError('Please select a file')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const result = await uploadImage(formData)
      setSuccess(`Successfully uploaded ${result.fileName}`)

      // Reset form
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">Upload Image</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-slate-300 mb-2">
            Select Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            name="file"
            accept="image/*"
            disabled={uploading}
            className="block w-full text-sm text-slate-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              file:cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="mt-2 text-xs text-slate-400">
            PNG, JPG, GIF, WebP up to 5MB
          </p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  )
}
