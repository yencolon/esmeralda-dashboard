import { Skeleton } from "@/components/ui/skeleton";

export function DetailsSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-3/12" />
        <Skeleton className="h-8 w-1/2" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-5 w-full" />
      </div>

      {[...Array(10)].map((_, index) => (
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
