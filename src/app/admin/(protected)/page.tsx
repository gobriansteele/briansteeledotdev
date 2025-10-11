import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get counts
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', false)

  // Get recent posts
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold text-white mt-2">{totalPosts || 0}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium">Published</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {publishedPosts || 0}
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium">Drafts</h3>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {draftPosts || 0}
          </p>
        </div>
      </div>

      {/* Recent posts */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recentPosts?.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-center p-3 bg-slate-700 rounded"
            >
              <div>
                <h3 className="text-white font-medium">{post.title}</h3>
                <p className="text-sm text-slate-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  post.published
                    ? 'bg-green-900 text-green-300'
                    : 'bg-yellow-900 text-yellow-300'
                }`}
              >
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
