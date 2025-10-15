import { Avatar } from './Avatar'
import { SocialContacts } from './SocialContacts'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="text-center">
      <div className="flex justify-center mb-6">
        <Avatar />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        Brian Steele
      </h1>
      <h2 className="text-xl text-foreground-secondary mb-6">
        Pushing Rocks Up Mountains
      </h2>
      <div className="flex justify-center mb-6">
        <SocialContacts />
      </div>
      <Navigation />
    </header>
  )
}
