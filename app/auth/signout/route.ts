import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers' // Import cookies utility from Next.js for cookie handling
import { type NextRequest, NextResponse } from 'next/server' // Import types and utilities for handling requests and responses in Next.js

// Define an asynchronous POST function that will handle the POST requests
export async function POST(request: NextRequest) {
  const cookieStore = cookies() // Create a cookie store to manage cookies
  const supabase = createClient(cookieStore) // Initialize the Supabase client with the cookie store

  // Attempt to get the current session from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If a session exists, sign the user out
  if (session) {
    await supabase.auth.signOut()
  }

  // Redirect the user to the home page after signing out
  return NextResponse.redirect(new URL('/', request.url), {
    status: 302, // Use a 302 HTTP status code for the redirection
  })
}
