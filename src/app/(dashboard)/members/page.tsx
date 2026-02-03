"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOrganizationStore } from "@/app/store/organization.store";
import { fetchOrganizationMembers } from "@/services/organization.service";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationMemberStatus } from "@/types/organization";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type StatusTab = "active" | "invited" | "other";

export default function MembersPage() {
  const { currentOrganization } = useOrganizationStore();
  const [activeTab, setActiveTab] = useState<StatusTab>("active");

  const { data: members, isLoading } = useQuery({
    queryKey: ["members", currentOrganization?.id],
    queryFn: () => fetchOrganizationMembers(currentOrganization!.id),
    enabled: !!currentOrganization?.id,
  });

  const filteredMembers = members?.filter((member) => {
    if (activeTab === "active") return member.status === OrganizationMemberStatus.ACTIVE;
    if (activeTab === "invited") return member.status === OrganizationMemberStatus.INVITED;
    if (activeTab === "other") {
      return (
        member.status === OrganizationMemberStatus.SUSPENDED ||
        member.status === OrganizationMemberStatus.LEFT
      );
    }
    return true;
  });

  const tabs: { id: StatusTab; label: string }[] = [
    { id: "active", label: "Active" },
    { id: "invited", label: "Invited" },
    { id: "other", label: "Suspended / Left" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage your organization members and their roles.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm border-collapse">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Joined At</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4 align-middle"><Skeleton className="h-4 w-[150px]" /></td>
                    <td className="p-4 align-middle"><Skeleton className="h-4 w-[200px]" /></td>
                    <td className="p-4 align-middle"><Skeleton className="h-4 w-[80px]" /></td>
                    <td className="p-4 align-middle"><Skeleton className="h-4 w-[80px]" /></td>
                    <td className="p-4 align-middle"><Skeleton className="h-4 w-[100px]" /></td>
                  </tr>
                ))
              ) : filteredMembers?.map((member) => (
                <tr key={member.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">
                    {member.user ? `${member.user.firstName || ""} ${member.user.lastName || ""}` : "-"}
                  </td>
                  <td className="p-4 align-middle">{member.user?.email}</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                      member.status === OrganizationMemberStatus.ACTIVE && "bg-green-100 text-green-700 border-green-200",
                      member.status === OrganizationMemberStatus.INVITED && "bg-blue-100 text-blue-700 border-blue-200",
                      (member.status === OrganizationMemberStatus.SUSPENDED || member.status === OrganizationMemberStatus.LEFT) && "bg-red-100 text-red-700 border-red-200"
                    )}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">
                    {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
              {!isLoading && (!filteredMembers || filteredMembers.length === 0) && (
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No {activeTab} members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
