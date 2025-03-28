"use client";
import { useEffect, type ReactNode } from "react";
import { Package, FolderTree, Plus, Settings } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar, { SidebarItem } from "@/components/app-sidebar";
import { Toaster } from "sonner";
import { logout } from "@/app/actions/auth-actions";
import { Navbar } from "@/components/nav-bar";

const sideBarMenuItems: SidebarItem[] = [
  // {
  //   title: "Dashboard",
  //   href: "/dashboard",
  //   icon: <Home className="mr-2 h-4 w-4" />,
  // },
  {
    title: "Productos",
    href: "/dashboard/products",
    icon: <Package className="mr-2 h-4 w-4" />,
    sidebarSubItems: [
      {
        title: "Crear",
        href: "/dashboard/products/create",
        icon: <Plus className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: "Categorías",
    href: "/dashboard/categories",
    icon: <FolderTree className="mr-2 h-4 w-4" />,
    sidebarSubItems: [
      {
        title: "Crear",
        href: "/dashboard/categories/create",
        icon: <Plus className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: "Admin",
    href: "/dashboard/admin",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const handleLogout = async () => {
    await logout(); // Call the server action to log out
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar sideBarItems={sideBarMenuItems} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
