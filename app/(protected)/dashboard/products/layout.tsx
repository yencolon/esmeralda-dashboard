"use client";

import { Suspense, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 sm:p-6">
      <Suspense>
        <div className="flex flex-col justify-center items-center gap-5">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
