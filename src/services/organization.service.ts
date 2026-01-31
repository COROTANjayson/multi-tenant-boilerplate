import api from "@/lib/api";
import { Organization } from "@/types/organization";

export const fetchUserOrganizations = async (): Promise<Organization[]> => {
  const { data } = await api.get("/organizations");
  return data.data; // Assuming response format { data: { data: Organization[] } } or similar based on backend utils
};

export const createOrganization = async (name: string): Promise<Organization> => {
  const { data } = await api.post("/organizations", { name });
  return data.data;
};
