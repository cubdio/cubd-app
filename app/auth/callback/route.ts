// https://supabase.com/docs/guides/auth/server-side/oauth-with-pkce-flow-for-ssr
// In order to use OAuth we will need to setup a endpoint for the code exchange, to exchange an auth code for the user's session, which is set as a cookie for future requests made to Supabase.

// Import necessary modules and functions
import { cookies } from 'next/headers' // Importing the cookies function from next/headers
import { NextResponse } from 'next/server' // Importing NextResponse from next/server for handling responses
import { type CookieOptions, createServerClient } from '@supabase/ssr' // Importing types and functions from @supabase/ssr for server-side Supabase operations

/**
 * OAUTH CODE EXCHANGE
 * EXCHANGES CODE FOR SESSION
 * Handles the GET request for the callback route.
 * Extracts search parameters from the request URL, retrieves the 'code' and 'next' parameters,
 * initializes a cookie store, creates a Supabase client for server-side operations,
 * exchanges the 'code' for a session, and redirects the user to the specified 'next' page or an error page.
 * @param request - The request object.
 * @returns A NextResponse object that redirects the user to the specified 'next' page or an error page.
 */
export async function GET(request: Request) {
  // Extracting search parameters and the origin from the request URL
  const { searchParams, origin } = new URL(request.url)
  // Retrieving the 'code' search parameter, if it exists
  const code = searchParams.get('code')
  // Retrieving the 'next' search parameter; default to '/' if 'next' is not provided
  const next = searchParams.get('next') ?? '/'

  // Check if the 'code' parameter is present
  if (code) {
    // Initialize a cookie store
    const cookieStore = cookies()
    // Create a Supabase client for server-side operations
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase URL from environment variables
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase Anon Key from environment variables
      {
        // Configure cookie handling for the Supabase client
        cookies: {
          get(name: string) {
            // Define how to get a cookie
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Define how to set a cookie
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            // Define how to remove a cookie
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    // Exchange the 'code' for a session, handle any error that might occur
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    // If there is no error, redirect the user to /dashboard
    if (!error) {
      return NextResponse.redirect(`http://localhost:3000/dashboard`) // previously, '${origin}${next}'
    }
  }

  // If an error occurs or 'code' is not present, redirect the user to an error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
