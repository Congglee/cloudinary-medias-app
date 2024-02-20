"use client";

import { useAuth } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export function AuthToggle() {
  const { userId } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!userId && (
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!userId && (
          <>
            <DropdownMenuItem>
              <Link
                href="/sign-in"
                className="cursor-pointer flex gap-2 items-center"
              >
                <LogIn size={15} />
                Log In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/sign-up"
                className="cursor-pointer flex gap-2 items-center"
              >
                <UserPlus size={15} />
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
