"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SidebarUser() {
  return (
    <div className="flex items-center gap-3 border-t p-4">

      <Avatar>

        <AvatarFallback>
          AD
        </AvatarFallback>

      </Avatar>

      <div>

        <p className="font-medium">
          Administrador
        </p>

        <p className="text-xs text-muted-foreground">
          Owner
        </p>

      </div>

    </div>
  );
}