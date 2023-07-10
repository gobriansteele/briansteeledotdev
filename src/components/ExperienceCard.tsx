type Props = {
  startDate: string
  endDate: string
  company: string
  role: string
  tags: readonly string[]
  description?: string
}

export function ExperienceCard({
  startDate,
  endDate,
  company,
  role,
  tags,
  description,
}: Props) {
  return (
    <div className="flex gap-6 max-w-xl  hover:bg-santa-gray/10 duration-500 transition-colors p-4 rounded-md cursor-pointer">
      <div className="w-1/4">
        <p className="uppercase text-sm font-semibold text-end">{`${startDate}-${endDate}`}</p>
      </div>
      <div className="w-3/4 flex flex-col gap-4">
        <h3 className="text-lg font-semibold leading-5">
          <span className="text-santa-red">{role}</span>
          {` - ${company}`}
        </h3>
        <p className="font-small">{description}</p>
        <div className="flex gap-4 flex-wrap mt-3">
          {tags.map((t, idx) => {
            return (
              <span
                className="px-2 py-1 bg-santa-juniper rounded-full text-santa-plum text-sm"
                key={`${t}-${idx}`}
              >
                {t}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
