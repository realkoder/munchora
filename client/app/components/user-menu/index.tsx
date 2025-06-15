import { useAtomValue } from "jotai";
import { userLoginAtom } from "~/atoms/userLoginAtom";
import useLoginUser from "~/hooks/useLoginUser";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router";
import { UserPen } from "lucide-react";

const UserMenu = () => {
  const userLogin = useAtomValue(userLoginAtom);
  const { signOutUser } = useLoginUser();
  const navigate = useNavigate();
  const imageUrl = userLogin?.user.image_src;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full h-10 w-10">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={imageUrl ?? undefined}
              alt={userLogin?.user?.fullname ?? "User"}
            />
            <AvatarFallback className="bg-muted text-muted-foreground flex items-center justify-center">
              {imageUrl ? (
                userLogin?.user?.fullname?.charAt(0).toUpperCase() ?? "U"
              ) : (
                <>
                  <UserPen className="w-5 h-5" />
                  <p className="p-1">
                    {userLogin?.user?.fullname?.charAt(0).toUpperCase() ?? "U"}
                  </p>
                </>
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {userLogin?.user.fullname ?? "Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={signOutUser}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
