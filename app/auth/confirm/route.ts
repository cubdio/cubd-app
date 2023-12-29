// https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr
// In order to use the updated email links we will need to setup a endpoint for verifying the token_hash along with the type to exchange token_hash for the user's session, which is set as a cookie for future requests made to Supabase.

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


/**
 * EMAIL TEMPLATES
 * Handles the GET request for the confirmation route.
 * 
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to the request.
 */
export async function GET(request: NextRequest) {
  // Extracting search parameters from the request URL
  const { searchParams } = new URL(request.url)
  // Retrieving specific query parameters from the URL
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  // Creating a new URL based on the request, for redirection purposes
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  // Checking if both token_hash and type query parameters are present
  if (token_hash && type) {
    // Initializing a cookie store to manage cookies
    const cookieStore = cookies()
    // Creating a Supabase client for server-side operations
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // Custom functions to handle cookie operations
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    // Attempting to verify the OTP (One-Time Password) using Supabase
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    // If there's no error in verification, redirect the user to the intended next page
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // If the verification fails or required parameters are missing, redirect the user to an error page
  redirectTo.pathname = '/auth/auth-code-error'
  return NextResponse.redirect(redirectTo)
}
