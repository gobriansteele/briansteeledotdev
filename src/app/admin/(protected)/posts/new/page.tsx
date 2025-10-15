import { createClient } from '@/lib/supabase/server'
import { PostEditor } from '@/components/admin/PostEditor'

export default async function NewPostPage() {
  const supabase = await createClient()

  // Fetch all tags
  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">New Post</h1>
      <div className="bg-slate-800 rounded-lg p-6">
        <PostEditor tags={tags || []} />
      </div>
    </div>
  )
}
