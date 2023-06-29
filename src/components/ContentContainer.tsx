import { About } from './About'
import { Experience } from './Experience'

export function ContentContainer() {
  return (
    <main id="content" className="text-santa-gray flex flex-col gap-12">
      <About />
      <Experience />
    </main>
  )
}
