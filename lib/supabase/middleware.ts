import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

// Export a function named 'createClient' that takes a NextRequest object as an argument
export const createClient = (request: NextRequest) => {
  // Create an unmodified Next.js response object, passing in the request headers
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase URL from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase Anon Key from environment variables
    {
      // Define cookie management functions for the Supabase client
      cookies: {
        // Get a cookie by name from the request
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        // Set a cookie with specified name, value, and options
        set(name: string, value: string, options: CookieOptions) {
          // Update the cookies in the request and response objects when setting a cookie
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        // Remove a cookie by name using the provided options
        remove(name: string, options: CookieOptions) {
          // Update the cookies in the request and response objects when removing a cookie
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Return the Supabase client and the response object
  return { supabase, response }
}
