"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Dumbbell } from "lucide-react";

import { CreditCard, } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader className="border-b">

        <div className="flex items-center gap-3 px-2 py-3">

          <div className="rounded-lg bg-primary p-2 text-primary-foreground">

            <Dumbbell className="h-5 w-5" />

          </div>

          <div className="flex flex-col">

            <span className="font-semibold">
              Gym System
            </span>

            <span className="text-xs text-muted-foreground">
              Panel Administrativo
            </span>

          </div>

        </div>

      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>

              {navigation.map((item) => {

                const Icon = item.icon;

                const active =
                  pathname === item.href;

                return (

                  <SidebarMenuItem
                    key={item.href}
                  >

                    <SidebarMenuButton
                      asChild
                      isActive={active}
                    >

                      <Link href={item.href}>

                        <Icon />

                        <span>
                          {item.title}
                        </span>

                      </Link>

                    </SidebarMenuButton>

                  </SidebarMenuItem>

                );

              })}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="border-t">

        <div className="px-3 py-4">

          <p className="text-xs text-muted-foreground">
            Gym System v1.0
          </p>

        </div>

      </SidebarFooter>

    </Sidebar>
  );
}