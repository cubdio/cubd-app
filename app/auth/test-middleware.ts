// import { createClient } from '@/lib/supabase/middleware'
// import { NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   const res = NextResponse.next()
//   const {supabase, response} = createClient(request)

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // Validate if the user is authenticated and currently on an auth page, redirecting them to the account page
//   if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }

//   // Verify if the user is not authenticated and currently on the account page, redirecting them to the sign-in page.
//   if (!user && request.nextUrl.pathname !== '/dashboard') {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return response
// }

// export const config = {
//   matcher: ['/login', '/register', '/dashboard'],
// }