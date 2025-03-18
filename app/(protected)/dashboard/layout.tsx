import { type ReactNode } from "react";
import { Package, FolderTree, Plus, Settings } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar, { SidebarItem } from "@/components/app-sidebar";
import { Toaster } from "sonner";

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

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

 
  return (
    <SidebarProvider>
      <AppSidebar sideBarItems={sideBarMenuItems} />
      <main className="flex-1 p-8 overflow-y-auto">
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
