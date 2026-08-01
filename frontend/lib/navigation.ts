import {
  LayoutDashboard,
  Users,
  CreditCard,
  ClipboardList,
  CalendarCheck,
  Receipt,
  FileClock,
  Shield,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Socios",
    href: "/members",
    icon: Users,
  },
  {
    title: "Planes",
    href: "/plans",
    icon: ClipboardList,
  },
  {
    title: "Membresías",
    href: "/memberships",
    icon: CreditCard,
  },
  {
    title: "Pagos",
    href: "/payments",
    icon: Receipt,
  },
  {
    title: "Facturas",
    href: "/invoices",
    icon: FileClock,
  },
  {
    title: "Asistencia",
    href: "/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: Shield,
  },
  {
    title: "Auditoría",
    href: "/audit",
    icon: FileClock,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];