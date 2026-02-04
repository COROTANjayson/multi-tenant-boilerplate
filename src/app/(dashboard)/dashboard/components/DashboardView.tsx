import { PageHeader } from "@/components/shared/page-header";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeaderContainer } from "@/components/shared/page-header-container";

export function DashboardView() {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader title="Dashboard" description="Welcome back to your workspace overview." />
      </PageHeaderContainer>
    </PageContainer>
  );
}

