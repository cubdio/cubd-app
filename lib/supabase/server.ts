import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Export a function named 'createClient'. This function takes a cookieStore,
// which is an instance of the cookies module from 'next/headers'.
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Return an instance of a Supabase client configured for server-side usage.
  return createServerClient(
    // The Supabase URL is obtained from the environment variables.
    // It's marked with '!' to assert that it's not null or undefined.
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // The Supabase anon (anonymous) key is also obtained from the environment variables.
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Configuration for handling cookies.
      cookies: {
        // Define a method for getting a cookie's value by name.
        get(name: string) {
          // Return the value of the specified cookie, or undefined if it doesn't exist.
          return cookieStore.get(name)?.value
        },
        // Define a method for setting a cookie.
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Try to set the cookie using the provided name, value, and additional options.
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Catch errors that might occur if the `set` method is called from a Server Component.
            // This error can be ignored in certain scenarios, like middleware handling user sessions.
          }
        },
        // Define a method for removing a cookie.
        remove(name: string, options: CookieOptions) {
          try {
            // Try to remove the cookie by setting its value to an empty string.
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Catch errors that might occur if the `remove` method is called from a Server Component.
            // This error can be ignored in certain scenarios, like middleware handling user sessions.
          }
        },
      },
    }
  )
}
