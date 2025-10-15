'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TagWithPostCount } from '@/types/blog'
import { CreateTagModal } from './CreateTagModal'
import { EditTagModal } from './EditTagModal'
import { DeleteTagButton } from './DeleteTagButton'

type TagTableProps = {
  initialTags: TagWithPostCount[]
}

export function TagTable({ initialTags }: TagTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<TagWithPostCount | null>(null)

  // Filter tags based on search query
  const filteredTags = initialTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      {/* Search and Create button */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          + New Tag
        </button>
      </div>

      {/* Tags table */}
      {filteredTags.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p>No tags found matching &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Slug
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Posts
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{tag.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-slate-300 bg-slate-900 px-2 py-1 rounded">
                      {tag.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {tag.post_count && tag.post_count > 0 ? (
                      <Link
                        href={`/admin/posts?tag=${tag.slug}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700 hover:bg-blue-900/70 transition-colors"
                        title="View posts with this tag"
                      >
                        {tag.post_count} {tag.post_count === 1 ? 'post' : 'posts'}
                      </Link>
                    ) : (
                      <span className="text-slate-500 text-sm">0 posts</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingTag(tag)}
                        className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 border border-blue-700 rounded hover:bg-blue-900/20 transition-colors"
                      >
                        Edit
                      </button>
                      <DeleteTagButton tag={tag} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <CreateTagModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditTagModal
        tag={editingTag}
        isOpen={!!editingTag}
        onClose={() => setEditingTag(null)}
      />
    </div>
  )
}
