"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createBrowserClient } from "@supabase/ssr";

// Just added this in is it neccessary?
import { User } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";

// You may need to adjust the user type based on what Supabase returns
interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    full_name?: string;
    avatar_url?: string;
    email?: string;
  };
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function UserAccountNav({ user }: UserAccountNavProps) {
  const handleSignOut = async () => {
    // Sign out using Supabase
    await supabase.auth.signOut();
    // Redirect after signing out
    window.location.href = "/login";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            full_name: user.full_name || null,
            avatar_url: user.avatar_url || null,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.full_name && <p className="font-medium">{user.full_name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            handleSignOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
