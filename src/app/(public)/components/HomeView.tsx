import { PageContainer } from "@/components/shared/page-container";

export function HomeView() {
  return (
    <PageContainer className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Home Page</h1>
      </div>
    </PageContainer>
  );
}

