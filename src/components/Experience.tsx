import { experience } from '@/data'
import { ExperienceCard } from './ExperienceCard'

export function Experience() {
  return (
    <section id="experience">
      <div className="h-16 flex flex-col justify-center">
        <h2 className="uppercase font-bold tracking-widest text-lg">
          Experience
        </h2>
      </div>
      <div className="flex flex-col gap-8 md:gap-4">
        {experience.map((ex, idx) => {
          return <ExperienceCard {...ex} key={`${ex.company}-${idx}`} />
        })}
      </div>
    </section>
  )
}
