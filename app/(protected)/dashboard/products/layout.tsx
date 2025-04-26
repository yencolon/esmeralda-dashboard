"use client";

import { Button } from "@/components/ui/button";
import { useCanGoBack } from "@/hooks/use-can-go-back";
import { ArrowLeft } from "lucide-react";
import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const canGoBack = useCanGoBack();
  return (
    <div className="p-2 sm:p-6">
      {/* <div className="flex flex-row items-center gap-4 pb-4">
        {canGoBack && (
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          Productos
        </h1>
      </div> */}
      <div className="flex flex-col justify-center items-center gap-5">
        {children}
      </div>
    </div>
  );
}
