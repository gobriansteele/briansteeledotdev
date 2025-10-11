import { requireAdmin } from '@/lib/auth'
import { AdminNav } from '@/components/admin/AdminNav'
import { SignOutButton } from '@/components/admin/SignOutButton'

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-slate-800 border-r border-slate-700">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-6">
              Blog Admin
            </h1>
            <AdminNav />
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-2 truncate" title={user.email || ''}>
                {user.email}
              </p>
              <SignOutButton />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
