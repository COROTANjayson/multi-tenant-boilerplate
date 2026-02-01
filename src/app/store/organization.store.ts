"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
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
      setCurrentOrganization: (organization) => {
        if (organization) {
          Cookies.set("currentOrganization", JSON.stringify(organization), { expires: 7 });
        } else {
          Cookies.remove("currentOrganization");
        }
        set({ currentOrganization: organization });
      },
      clearOrganizations: () => {
        Cookies.remove("currentOrganization");
        set({ organizations: [], currentOrganization: null });
      },
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
