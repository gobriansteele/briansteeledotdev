import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function ContentContainer({ children }: Props) {
  return (
    <main
      id="content"
      className="text-santa-gray flex flex-col gap-12 md:w-2/3"
    >
      {children}
    </main>
  )
}
