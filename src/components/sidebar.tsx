"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Server, User, Trash2, ChevronsUpDown, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizationStore } from "@/app/store/organization.store";
import { fetchUserOrganizations } from "@/services/organization.service";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/service", label: "Service", icon: Server },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/delete", label: "Delete Account", icon: Trash2 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const { organizations, currentOrganization, setOrganizations, setCurrentOrganization } = useOrganizationStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadOrgs = async () => {
      // Only fetch if we don't have any organizations yet
      if (organizations.length === 0) {
        setIsLoading(true);
        try {
          const orgs = await fetchUserOrganizations();
          setOrganizations(orgs);
          // If no organization is selected, select the first one
          if (orgs.length > 0 && !currentOrganization) {
            setCurrentOrganization(orgs[0]);
          }
        } catch (error) {
          console.error("Failed to fetch organizations", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadOrgs();
  }, [organizations.length, currentOrganization, setOrganizations, setCurrentOrganization]);

  const activeOrg = currentOrganization || { name: "Select Organization", slug: "v1.0.0" };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <LayoutDashboard className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {isLoading ? "Loading..." : activeOrg.name}
                    </span>
                    <span className="truncate text-xs">{activeOrg.slug}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  Organizations
                </DropdownMenuLabel>
                {organizations.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => setCurrentOrganization(org)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <LayoutDashboard className="size-4 shrink-0" />
                    </div>
                    <span className="flex-1 truncate">{org.name}</span>
                  </DropdownMenuItem>
                ))}
                {organizations.length === 0 && !isLoading && (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No organizations found
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                    <Plus className="size-4" />
                  </div>
                  <div className="text-muted-foreground font-medium">Add organization</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
