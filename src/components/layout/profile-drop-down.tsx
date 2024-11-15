"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserData } from "@/hooks/use-user-data";
import { DoorOpenIcon } from "lucide-react";

export const ProfileDropDown = () => {
  const { user } = useUserData();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="rounded-md w-9 h-9 border">
          <AvatarImage src={user.profileImage?.thumb} />
          <AvatarFallback>{user.avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage src={user.profileImage?.medium} />
              <AvatarFallback>{user.avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user?.displayName}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-x-3"
          onClick={() => {
            if (typeof localStorage !== "undefined") {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          <DoorOpenIcon className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
