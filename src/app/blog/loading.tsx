export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-slate-700 rounded animate-pulse w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-background-secondary rounded-lg p-6">
            <div className="h-6 bg-slate-700 rounded animate-pulse mb-4" />
            <div className="h-4 bg-slate-700 rounded animate-pulse mb-2" />
            <div className="h-4 bg-slate-700 rounded animate-pulse w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
