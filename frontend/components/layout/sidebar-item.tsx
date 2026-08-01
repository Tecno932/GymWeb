"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props {
  href: string;
  title: string;
  icon: LucideIcon;
  collapsed: boolean;
}

export function SidebarItem({
  href,
  title,
  icon: Icon,
  collapsed,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "flex h-11 items-center rounded-lg px-3 transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />

      {!collapsed && (
        <span className="ml-3 text-sm font-medium">
          {title}
        </span>
      )}
    </Link>
  );
}