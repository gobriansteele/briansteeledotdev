import { GitHubIcon } from './GitHubIcon'
import { LinkedInIcon } from './LinkedInIcon'

const socialComponents = [
  {
    name: 'GitHub',
    link: 'https://github.com/gobriansteele',
    Icon: GitHubIcon,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/gobriansteele/',
    Icon: LinkedInIcon,
  },
]

export function SocialContacts() {
  return (
    <ul className="flex gap-4">
      {socialComponents.map(({ name, Icon, link }) => {
        return (
          <li key={name}>
            <a href={link}>
              <Icon />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
