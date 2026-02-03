"use client";

import { useEffect, useRef } from "react";
import { useOrganizationStore } from "@/app/store/organization.store";
import { Organization } from "@/types/organization";

interface StoreHydratorProps {
  currentOrganization: Organization | null;
  children: React.ReactNode;
}

export function StoreHydrator({
  currentOrganization,
  children,
}: StoreHydratorProps) {
  const hasHydrated = useRef(false);
  const setCurrentOrganization = useOrganizationStore((state) => state.setCurrentOrganization);

  useEffect(() => {
    if (!hasHydrated.current) {
      if (currentOrganization) {
        setCurrentOrganization(currentOrganization);
      }
      hasHydrated.current = true;
    }
  }, [currentOrganization, setCurrentOrganization]);

  return <>{children}</>;
}
