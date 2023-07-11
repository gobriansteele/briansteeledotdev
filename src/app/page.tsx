import { Header } from '@/components'
import { ContentContainer } from '@/components/ContentContainer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start  px-8 py-8 md:p-24 gap-12 md:flex-row">
      <Header />
      <ContentContainer />
    </main>
  )
}
