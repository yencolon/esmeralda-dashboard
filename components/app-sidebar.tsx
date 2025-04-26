"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface AppSidebarProps {
  sideBarItems: SidebarItem[];
  onLogout?: () => void;
  collapsible?: "offcanvas" | "icon" | "none";
}

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  sidebarSubItems?: SidebarItem[];
}

export default function AppSidebar({
  sideBarItems,
  onLogout,
  collapsible = "offcanvas",
}: AppSidebarProps) {
  return (
    <Sidebar collapsible={collapsible}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.sidebarSubItems?.map((subItem, subIndex) => (
                    <SidebarMenuSub key={subIndex}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.href}>
                          {subItem.icon}
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  ))}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/login" className="block">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
