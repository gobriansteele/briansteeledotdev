import Image from 'next/image'
import profile from '../../public/brian_profile_bike.jpg'

export function Avatar() {
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border">
      <Image
        src={profile}
        alt="Brian Steele"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
