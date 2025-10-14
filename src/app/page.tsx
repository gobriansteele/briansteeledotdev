import { About, Experience } from '@/components'
import { WhatIDo } from '@/components/WhatIDo'
import { RecentPosts } from '@/components/RecentPosts'
import { Header } from '@/components/Header'
import { getMockPosts } from '@/lib/mockData'

export default function Home() {
  // Using mock data for now - Engineer 1 will replace with Supabase queries
  const recentPosts = getMockPosts({ limit: 3 })

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
