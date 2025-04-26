"use client";
import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 sm:p-6">
     
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}
