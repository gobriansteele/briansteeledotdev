'use client'

import { useState } from 'react'
import { checkLoginAction } from '@/app/actions'
import { useMouseHighlight } from '@/hooks'
import { Header } from '@/components/Header'
import { ContentContainer } from '@/components/ContentContainer'
import { WorkTogether } from '@/components/WorkTogether'

export const WorkWithMe = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const styleObj = useMouseHighlight()

  const handleSubmit = async (formData: FormData) => {
    const isAuthed = await checkLoginAction(formData)
    setIsAuthenticated(isAuthed)
  }

  return isAuthenticated ? (
    <div className="relative">
      <div
        style={styleObj}
        className="pointer-events-none  inset-0 z-30 transition duration-300 lg:absolute"
      />
      <main className="flex min-h-screen flex-col items-start  px-8 py-8 md:p-24 gap-12 md:flex-row">
        <Header />
        <ContentContainer>
          <WorkTogether />
        </ContentContainer>
      </main>
    </div>
  ) : (
    <form action={handleSubmit}>
      <input type="password" className="text-black" name="loginCode" />
      <button type="submit">Submit</button>
    </form>
  )
}
