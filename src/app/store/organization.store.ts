"use client";

import { create } from "zustand";
import Cookies from "js-cookie";
import { Organization, OrganizationRole } from "@/types/organization";

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  currentRole: OrganizationRole | null;
  isHydrated: boolean;
  setOrganizations: (organizations: Organization[]) => void;
  setCurrentOrganization: (organization: Organization | null, role?: OrganizationRole) => void;
  setHydrated: (hydrated: boolean) => void;
  clearOrganizations: () => void;
}

export const useOrganizationStore = create<OrganizationState>()((set) => ({
  organizations: [],
  currentOrganization: null,
  currentRole: null,
  isHydrated: false,
  setOrganizations: (organizations) => set({ organizations }),
  setHydrated: (isHydrated) => set({ isHydrated }),
  setCurrentOrganization: (organization, role) => {
    if (typeof window !== "undefined") {
      if (organization) {
        Cookies.set("currentOrganization", JSON.stringify(organization), { expires: 7 });
      } else {
        Cookies.remove("currentOrganization");
      }

      if (role) {
        Cookies.set("currentRole", role, { expires: 7 });
      } else {
        Cookies.remove("currentRole");
      }
    }

    set({ 
      currentOrganization: organization, 
      currentRole: role || null 
    });
  },
  clearOrganizations: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("currentOrganization");
      Cookies.remove("currentRole");
    }
    set({ 
      organizations: [], 
      currentOrganization: null,
      currentRole: null
    });
  },
}));
