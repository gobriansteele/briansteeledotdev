import Image from 'next/image'
import profile from '../../public/brian_profile_orange_small.jpg'

export function Avatar() {
  return (
    <div
      id="avatar"
      className="rounded-full  object-cover object-left-top border-santa-red border-solid border-2 w-32 h-32 lg:h-64 lg:w-64 relative block overflow-clip"
    >
      <Image
        src={profile}
        alt="That is Brian"
        priority
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
