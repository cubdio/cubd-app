// Assuming you have a `User` type defined based on your Supabase schema
// Import the User type from where you have defined it
import { User } from "@/types"; // Modify this import according to your project structure

import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

// Adjust the UserAvatarProps to use the new User type
interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "avatar_url" | "full_name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.avatar_url === "disabling avatars" ? (
        <AvatarImage alt="Picture" src={user.avatar_url} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.full_name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
