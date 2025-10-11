import { createClient } from '@/lib/supabase/server'
import { PostEditor } from '@/components/admin/PostEditor'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the post
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  // Fetch all tags
  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  // Fetch post tags
  const { data: postTagsData } = await supabase
    .from('post_tags')
    .select('tag_id')
    .eq('post_id', id)

  const postTags = postTagsData?.map((pt) => pt.tag_id) || []

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Post</h1>
      <div className="bg-slate-800 rounded-lg p-6">
        <PostEditor post={post} tags={tags || []} postTags={postTags} />
      </div>
    </div>
  )
}
