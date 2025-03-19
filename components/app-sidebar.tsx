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
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Esmeralda</SidebarGroupLabel>
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
            className="w-full justify-start text-red-500 hover:text-red-700"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
