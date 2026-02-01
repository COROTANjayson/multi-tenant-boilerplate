import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex flex-col gap-2", className)}>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
