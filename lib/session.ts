// import { getServerSession } from "next-auth/next"

// import { authOptions } from "@/lib/auth"

// /**
//  * Retrieves the current user from the server session.
//  * @returns {Promise<User | undefined>} A promise that resolves to the current user, or undefined if no user is found.
//  */
// export async function getCurrentUser() {
//   const session = await getServerSession(authOptions)

//   // Check if there is a session, if there is, return the user, if there isn't return undefined
//   return session?.user
// }


import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

/**
 * Retrieves the current user from Supabase.
 * @returns {Promise<User | null>} A promise that resolves to the current user, or null if no user is found.
 */
export async function getCurrentUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    // Retrieve the current user
    const { data: { user } } = await supabase.auth.getUser();

    // Check if there is a user
    if (user) {
      // User is logged in
      return user;
    } else {
      // No user found
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null;
  }
}

