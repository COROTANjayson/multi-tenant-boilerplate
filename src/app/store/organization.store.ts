"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Organization } from "@/types/organization";

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  setOrganizations: (organizations: Organization[]) => void;
  setCurrentOrganization: (organization: Organization | null) => void;
  clearOrganizations: () => void;
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizations: [],
      currentOrganization: null,
      setOrganizations: (organizations) => set({ organizations }),
      setCurrentOrganization: (organization) => set({ currentOrganization: organization }),
      clearOrganizations: () => set({ organizations: [], currentOrganization: null }),
    }),
    {
      name: "organization-storage",
      // Optional: you can define which fields to persist
      partialize: (state) => ({ 
        currentOrganization: state.currentOrganization,
        organizations: state.organizations 
      }),
    }
  )
);
