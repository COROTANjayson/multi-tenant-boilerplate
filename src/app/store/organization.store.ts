"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { Organization, OrganizationRole } from "@/types/organization";

interface OrganizationState {
  organizations: Organization[];
  currentOrganization: Organization | null;
  currentRole: OrganizationRole | null;
  setOrganizations: (organizations: Organization[]) => void;
  setCurrentOrganization: (organization: Organization | null, role?: OrganizationRole) => void;
  clearOrganizations: () => void;
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizations: [],
      currentOrganization: null,
      currentRole: null,
      setOrganizations: (organizations) => set({ organizations }),
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
    }),
    {
      name: "organization-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      } as any)),
      skipHydration: true,
      partialize: (state) => ({ 
        currentOrganization: state.currentOrganization,
        currentRole: state.currentRole,
        organizations: state.organizations 
      }),
    }
  )
);
