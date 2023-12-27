// importing middleware client from @supabase/auth-helpers-nextjs, middleware client is used to get the current user from the request object sent by the server
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// importing the NextResponse object from next/server, NextResponse is used to redirect the user to a different page
import { NextResponse } from "next/server";
// importing the NextRequest object from next/server, NextRequest is used to get the current url from the request object sent by the server
import type { NextRequest } from "next/server";

// middleware function, this function is called on every request to the server and is used to check if the user is signed in or not
export async function middleware(req: NextRequest) {
  const res = NextResponse.next(); // create a new NextResponse object
  const supabase = createMiddlewareClient({ req, res }); // create a new middleware client

  // get the current user, if the user is not signed in the user object will be null
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url)); // respond with a redirect response
  }

  return res; // return the response
}

// config object, this object is used to tell the middleware function on which paths it should run
export const config = {
  matcher: ["/", "/account"],
};
