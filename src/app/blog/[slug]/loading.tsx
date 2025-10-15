export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-12 bg-slate-700 rounded animate-pulse mb-4" />
      <div className="h-4 bg-slate-700 rounded animate-pulse w-1/4 mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-slate-700 rounded animate-pulse" />
        <div className="h-4 bg-slate-700 rounded animate-pulse" />
        <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4" />
      </div>
    </div>
  )
}
