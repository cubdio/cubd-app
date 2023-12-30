import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

export function UserAvatar() {
  return (
    // <Avatar {...props}>
    //   {user.avatar_url === "disabling avatars" ? (
    //     <AvatarImage alt="Picture" src={user.avatar_url} />
    //   ) : (
    //     <AvatarFallback>
    //       <span className="sr-only">{user.full_name}</span>
    //       <Icons.user className="h-4 w-4" />
    //     </AvatarFallback>
    //   )}
    // </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
