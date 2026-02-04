import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageHeaderContainer({ children, className }: PageHeaderContainerProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      {children}
    </div>
  );
}
