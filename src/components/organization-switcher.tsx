"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown, LayoutDashboard, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useOrganizationStore } from "@/app/store/organization.store";
import { useAuthStore } from "@/app/store/auth.store";
import { fetchUserOrganizations, fetchCurrentMember } from "@/services/organization.service";
import { CreateOrganizationDialog } from "@/components/create-organization-dialog";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();
  const { user } = useAuthStore();
  const { 
    organizations, 
    currentOrganization,
    currentRole,
    setOrganizations, 
    setCurrentOrganization 
  } = useOrganizationStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleOrgChange = async (org: any) => {
    try {
      const member = await fetchCurrentMember(org.id);
      setCurrentOrganization(org, member.role);
    } catch (error) {
      console.error("Failed to fetch organization role", error);
      setCurrentOrganization(org);
    }
  };

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
            handleOrgChange(orgs[0]);
          }
        } catch (error) {
          console.error("Failed to fetch organizations", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadOrgs();
  }, [organizations.length, currentOrganization, setOrganizations, setCurrentOrganization, user?.id]);

  const activeOrg = currentOrganization || { name: "Select Organization", slug: "v1.0.0" };

  return (
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
                  {activeOrg.name === "Select Organization" && isLoading ? "Loading..." : activeOrg.name}
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
                onClick={() => handleOrgChange(org)}
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
            <CreateOrganizationDialog>
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Add organization</div>
              </DropdownMenuItem>
            </CreateOrganizationDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
