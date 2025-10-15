import { getAllTagsWithPostCount } from '@/lib/queries/tags'
import { TagTable } from '@/components/admin/TagTable'

export default async function TagsPage() {
  const tags = await getAllTagsWithPostCount()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Tags</h1>
      </div>

      {tags && tags.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg mb-4">No tags yet</p>
          <p className="text-sm">Create your first tag to organize your blog posts</p>
        </div>
      ) : (
        <TagTable initialTags={tags} />
      )}
    </div>
  )
}
