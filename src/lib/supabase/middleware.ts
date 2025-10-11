import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  console.log('[Middleware] Path:', pathname, 'User:', user?.email || 'none')

  // Allow access to login page (with or without trailing slash)
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    console.log('[Middleware] Login page - allowing access')
    // If already logged in, redirect to dashboard
    if (user) {
      console.log('[Middleware] User logged in, redirecting to /admin')
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    console.log('[Middleware] Returning response for login page')
    return response
  }

  // Protect all other admin routes
  if (pathname.startsWith('/admin')) {
    console.log('[Middleware] Protected admin route')
    // Not logged in - redirect to login
    if (!user) {
      console.log('[Middleware] No user, redirecting to /admin/login')
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Logged in but not admin email - redirect to home
    if (user.email !== process.env.ADMIN_EMAIL) {
      console.log('[Middleware] Wrong email, redirecting to /')
      return NextResponse.redirect(new URL('/', request.url))
    }
    console.log('[Middleware] User authorized, allowing access')
  }

  return response
}
