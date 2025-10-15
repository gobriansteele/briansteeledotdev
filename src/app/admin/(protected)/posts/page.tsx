import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { DeletePostButton } from '@/components/admin/DeletePostButton'
import { TogglePublishButton } from '@/components/admin/TogglePublishButton'

export default async function PostsPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="text-red-400">
        Error loading posts: {error.message}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Post
        </Link>
      </div>

      {posts && posts.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg mb-4">No posts yet</p>
          <Link
            href="/admin/posts/new"
            className="text-blue-400 hover:text-blue-300"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Created
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-300">
                  Updated
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {posts?.map((post) => (
                <tr key={post.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-white hover:text-blue-400 font-medium"
                      >
                        {post.title}
                      </Link>
                      <div className="text-sm text-slate-400 mt-1">
                        /{post.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {format(new Date(post.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {format(new Date(post.updated_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 border border-blue-700 rounded hover:bg-blue-900/20 transition-colors"
                      >
                        Edit
                      </Link>
                      <TogglePublishButton
                        postId={post.id}
                        isPublished={post.published}
                      />
                      <DeletePostButton postId={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
