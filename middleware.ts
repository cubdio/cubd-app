// Import required modules from Next.js and Supabase middleware
import { type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

// Define the middleware function for Next.js
export async function middleware(request: NextRequest) {
  // Create a Supabase client for the current request
  const { supabase, response } = createClient(request);

  // Refresh the Supabase authentication session if it's expired.
  // This is important for server-side rendering with authentication.
  // The getSession method checks the current session and refreshes it if needed.
  await supabase.auth.getSession();

  // Return the response object, which is used in the Next.js middleware pipeline.
  return response;
}

// Configuration for the middleware
export const config = {
  // Define URL patterns that this middleware should match.
  // It will match all paths except for the ones specified in the pattern.
  // The pattern excludes:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // Modify the pattern as needed to include or exclude additional paths.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
