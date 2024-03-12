"use client";

import { cn } from "@/utils/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & LinkProps) {
  const { href } = props;
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link {...props} className={className}>
      <span
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          !isActive ? "text-muted-foreground" : null
        )}
      >
        {children}
      </span>
    </Link>
  );
}
