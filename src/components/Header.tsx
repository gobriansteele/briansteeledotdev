import { Avatar } from './Avatar'
import { SocialContacts } from './SocialContacts'

export function Header() {
  return (
    <header className="text-santa-gray flex flex-col justify-between w-full md:flex-col-reverse gap-12 md:w-1/3 md:sticky md: top-0 py-8">
      <div className="flex justify-center ">
        <Avatar />
      </div>
      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="text-4xl font-bold">Brian Steele</h1>
        <h2 className="text-2xl">Lead Software Engineer</h2>
        <p className="max-w-xs leading-normal">
          Building thoughtful and well-crafted experiences on the web for over
          10 years.
        </p>
        <div id="social" className="mt-2">
          <SocialContacts />
        </div>
      </div>
    </header>
  )
}
