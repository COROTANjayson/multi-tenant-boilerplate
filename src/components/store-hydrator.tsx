"use client";

import { useEffect, useRef } from "react";
import { useOrganizationStore } from "@/app/store/organization.store";
import { Organization, OrganizationRole } from "@/types/organization";

interface StoreHydratorProps {
  currentOrganization: Organization | null;
  currentRole: OrganizationRole | null;
  children: React.ReactNode;
}

export function StoreHydrator({
  currentOrganization,
  currentRole,
  children,
}: StoreHydratorProps) {
  const hasHydrated = useRef(false);
  const { setCurrentOrganization, currentOrganization: storedOrg, currentRole: storedRole } = useOrganizationStore();

  // Synchronize store with server data immediately during render 
  // to prevent hydration flicker in child components.
  if (!hasHydrated.current && currentOrganization) {
    const needsUpdate = currentOrganization.id !== storedOrg?.id || currentRole !== storedRole;
    if (needsUpdate) {
      setCurrentOrganization(currentOrganization, currentRole || undefined);
    }
    hasHydrated.current = true;
  }

  return <>{children}</>;
}
