"use client";

import { useRef } from "react";
import { useOrganizationStore } from "@/app/store/organization.store";
import { Organization, OrganizationRole } from "@/types/organization";

interface StoreHydratorProps {
  currentOrganization: Organization | null;
  currentRole: OrganizationRole | null;
  organizations: Organization[];
  children: React.ReactNode;
}

export function StoreHydrator({
  currentOrganization,
  currentRole,
  organizations,
  children,
}: StoreHydratorProps) {
  const hasHydrated = useRef(false);
  const { 
    setCurrentOrganization, 
    setOrganizations,
    setHydrated,
    currentOrganization: storedOrg, 
    currentRole: storedRole,
    organizations: storedOrgs
  } = useOrganizationStore();

  // Synchronize store with server data immediately during render 
  if (!hasHydrated.current) {
    // Update organizations list if different
    if (organizations.length !== storedOrgs.length) {
      setOrganizations(organizations);
    }

    // Update current selection if different
    const needsUpdate = currentOrganization?.id !== storedOrg?.id || currentRole !== storedRole;
    if (needsUpdate) {
      setCurrentOrganization(currentOrganization, currentRole || undefined);
    }
    
    // Mark as hydrated
    setHydrated(true);
    hasHydrated.current = true;
  }

  return <>{children}</>;
}
