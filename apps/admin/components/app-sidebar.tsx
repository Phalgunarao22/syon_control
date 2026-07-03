"use client";

import { Home, Settings, Users, LogOut, FileText, ChevronUp, ChevronDown, Activity, Image as ImageIcon, Layers, Package, Database } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import logo from "../public/logo.png";
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
} from "@workspace/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible";
import { SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@workspace/ui/components/sidebar";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Sidebar className="border-r border-neutral-200 bg-[#fafafa]">
      <SidebarHeader className="border-b border-neutral-200/60 p-0 overflow-hidden bg-black flex items-center justify-center h-16">
        <img src={logo.src} alt="Syon Controls" className="h-full w-full object-contain bg-white" />     
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-500 font-medium px-4 mb-2">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/" />} tooltip="Dashboard" isActive={pathname === "/"} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                  <Home className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {session?.user?.role === "SUPER_ADMIN" && (
                <SidebarMenuItem>
                  <SidebarMenuButton render={<Link href="/users" />} tooltip="Users" isActive={pathname.startsWith("/users")} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                    <Users className="mr-2" />
                    <span>Users</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {session?.user?.role === "SUPER_ADMIN" && (
                <SidebarMenuItem>
                  <SidebarMenuButton render={<Link href="/hero" />} tooltip="Hero Content" isActive={pathname.startsWith("/hero")} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                    <ImageIcon className="mr-2" />
                    <span>Hero Content</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <SidebarMenuButton render={<CollapsibleTrigger />} tooltip="Inventory" className="hover:bg-neutral-100 hover:text-neutral-900">
                    <Database className="mr-2" />
                    <span>Inventory</span>
                    <ChevronDown className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-180 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton render={<Link href="/categories" />} isActive={pathname.startsWith("/categories")} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                          <Layers className="mr-2 w-4 h-4" />
                          <span>Categories</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton render={<Link href="/products" />} isActive={pathname.startsWith("/products")} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                          <Package className="mr-2 w-4 h-4" />
                          <span>Products</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/reports" />} tooltip="Reports" isActive={pathname.startsWith("/reports")} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                  <FileText className="mr-2" />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/settings" />} tooltip="Settings" isActive={pathname.startsWith("/settings")} className="hover:bg-neutral-100 hover:text-neutral-900 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-700">
                  <Settings className="mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-neutral-200/60 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <SidebarMenuButton className="w-full h-12 hover:bg-neutral-100 data-[state=open]:bg-neutral-100" />
              }>
                <Avatar className="w-8 h-8 rounded-md mr-2 border border-neutral-200">
                  <AvatarFallback className="bg-violet-100 text-violet-700 font-medium">
                    {session?.user?.name?.slice(0, 2).toUpperCase() || "SA"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-sm font-medium leading-none text-neutral-900">
                    {session?.user?.name || "Super Admin"}
                  </span>
                  <span className="text-xs text-neutral-500 mt-1">
                    {session?.user?.email || "admin@syon.com"}
                  </span>
                </div>
                <ChevronUp className="w-4 h-4 ml-auto text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-[200px] mb-2 shadow-lg rounded-xl border-neutral-200">
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer focus:bg-neutral-100">
                  <Settings className="w-4 h-4 mr-2 text-neutral-500" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 mt-1">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
