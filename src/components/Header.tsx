import { Avatar } from './Avatar'
import { SocialContacts } from './SocialContacts'

export function Header() {
  return (
    <header className="text-santa-gray flex flex-row justify-between w-full">
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
      <div className="flex justify-center">
        <Avatar />
      </div>
    </header>
  )
}
