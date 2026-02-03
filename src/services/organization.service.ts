import api from "@/lib/api";
import { Organization, OrganizationInvitation, OrganizationMember } from "@/types/organization";

export const fetchUserOrganizations = async (): Promise<Organization[]> => {
  const { data } = await api.get("/organizations");
  return data.data; // Assuming response format { data: { data: Organization[] } } or similar based on backend utils
};

export const createOrganization = async (name: string): Promise<Organization> => {
  const { data } = await api.post("/organizations", { name });
  return data.data;
};

export const fetchOrganizationMembers = async (orgId: string): Promise<OrganizationMember[]> => {
  const { data } = await api.get(`/organizations/${orgId}/members`);
  return data.data;
};

export const fetchOrganizationInvitations = async (orgId: string): Promise<OrganizationInvitation[]> => {
  const { data } = await api.get(`/organizations/${orgId}/invitations`);
  return data.data;
};

export const inviteMember = async (orgId: string, email: string, role: string): Promise<OrganizationInvitation> => {
  const { data } = await api.post(`/organizations/${orgId}/invitations`, { email, role });
  return data.data;
};

export const revokeInvitation = async (orgId: string, invitationId: string): Promise<void> => {
  await api.delete(`/organizations/${orgId}/invitations/${invitationId}`);
};
