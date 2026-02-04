import { PageHeader } from "@/components/shared/page-header";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeaderContainer } from "@/components/shared/page-header-container";

export function ServiceView() {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader title="Services" description="Manage and monitor your active services." />
      </PageHeaderContainer>
    </PageContainer>
  );
}

