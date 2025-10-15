import { createClient } from '@/lib/supabase/server'
import { UploadImageForm } from '@/components/admin/UploadImageForm'
import { MediaImageCard } from '@/components/admin/MediaImageCard'

export default async function MediaPage() {
  const supabase = await createClient()

  // List all files from the blog-images bucket
  const { data: files, error } = await supabase.storage
    .from('blog-images')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (error) {
    console.error('Error fetching images:', error)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Media Library</h1>

      {/* Upload Form */}
      <div className="mb-8">
        <UploadImageForm />
      </div>

      {/* Images Grid */}
      {files && files.length > 0 ? (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              All Images ({files.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => {
              const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(file.name)

              return (
                <MediaImageCard
                  key={file.name}
                  fileName={file.name}
                  publicUrl={publicUrl}
                />
              )
            })}
          </div>
        </>
      ) : (
        <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
          <p className="text-slate-400 text-lg">No images uploaded yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Upload your first image using the form above
          </p>
        </div>
      )}
    </div>
  )
}
