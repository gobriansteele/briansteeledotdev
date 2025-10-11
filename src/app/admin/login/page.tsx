import { SignInButton } from './SignInButton'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-lg shadow-xl">
        <div>
          <h2 className="text-3xl font-bold text-white text-center">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-slate-400">
            Sign in with your Google account
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  )
}
