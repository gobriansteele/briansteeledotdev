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
      <div>
        {experience.map((ex) => {
          return <ExperienceCard {...ex} key={ex.company} />
        })}
      </div>
    </section>
  )
}
