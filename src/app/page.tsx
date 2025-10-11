import { About, Experience } from '@/components'
import { WhatIDo } from '@/components/WhatIDo'
import { RecentPosts } from '@/components/RecentPosts'
import { getMockPosts } from '@/lib/mockData'

export default function Home() {
  // Using mock data for now - Engineer 1 will replace with Supabase queries
  const recentPosts = getMockPosts({ limit: 3 })

  return (
    <>
      <About />
      <WhatIDo />
      <RecentPosts posts={recentPosts} />
      <Experience />
    </>
  )
}
