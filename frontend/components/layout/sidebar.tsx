"use client";

import { useState } from "react";

import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

import { navigation } from "@/lib/navigation";

import { SidebarItem } from "./sidebar-item";
import { SidebarUser } from "./sidebar-user";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Botón móvil */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-background p-2 shadow md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-background
          transition-all duration-300

          ${collapsed ? "w-20" : "w-72"}

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">

          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">
                Gym System
              </h1>

              <p className="text-xs text-muted-foreground">
                Administración
              </p>
            </div>
          )}

          <div className="flex gap-2">

            <button
              className="rounded-md p-2 hover:bg-muted md:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>

            <button
              className="hidden rounded-md p-2 hover:bg-muted md:block"
              onClick={() =>
                setCollapsed(!collapsed)
              }
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>

          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">

          {navigation.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              title={item.title}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}

        </nav>

        {/* Usuario */}
        {!collapsed && <SidebarUser />}
      </aside>

      {/* Espacio del contenido */}
      <div
        className={`
          hidden transition-all duration-300 md:block
          ${collapsed ? "w-20" : "w-72"}
        `}
      />
    </>
  );
}