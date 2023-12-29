import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const cookieStore = cookies()

// Exporting a function named `createClient`. This function initializes and returns a Supabase client specifically for server-side rendering.
export const createClient = createServerClient(
    // The Supabase URL and Anon Key are retrieved from environment variables.
    // The exclamation marks (!) assert that these values are non-null.
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Customizing cookie handling for the Supabase client.
      cookies: {
        // Defining a `get` method to retrieve a cookie value by its name.
        get(name: string) {
          // Returns the value of the cookie, if it exists.
          return cookieStore.get(name)?.value
        },
        // Defining a `set` method to set a cookie with a name, value, and options.
        set(name: string, value: string, options: CookieOptions) {
          // Adds or updates the cookie in the cookie store.
          cookieStore.set({ name, value, ...options })
        },
        // Defining a `remove` method to delete a cookie by its name.
        remove(name: string, options: CookieOptions) {
          // Sets the cookie's value to an empty string to effectively remove it.
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
