import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonMode = "list" | "detail";

interface TableSkeletonProps {
  mode?: TableSkeletonMode;
  rows?: number;
}

export function ReusableSkeleton({ mode = "list", rows = 10 }: TableSkeletonProps) {
  if (mode === "detail") {
    return (
      <div className="space-y-6 w-full h-full">
        {/* Detail Header */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        
        {/* Detail Content */}
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex space-x-4">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-3/12" />
        <Skeleton className="h-8 w-1/2" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-5 w-full" />
      </div>

      {/* Table Rows */}
      {[...Array(rows)].map((_, index) => (
        <div key={index} className="flex space-x-4">
          <Skeleton className="h-5 w-3/12" />
          <Skeleton className="h-5 w-3/12" />
          <Skeleton className="h-5 w-3/12" />
          <Skeleton className="h-5 w-3/12" />
        </div>
      ))}
    </div>
  );
}
