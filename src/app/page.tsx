import { About, Experience } from '@/components'
import { WhatIDo } from '@/components/WhatIDo'
import { RecentPosts } from '@/components/RecentPosts'
import { Header } from '@/components/Header'
import { getPublishedPosts } from '@/lib/queries/posts'

export default async function Home() {
  const recentPosts = await getPublishedPosts({ limit: 3 })

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <Header />

      <main className="mt-16 space-y-20">
        <About />
        <WhatIDo />
        <RecentPosts posts={recentPosts} />
        <Experience />
      </main>
    </div>
  )
}
