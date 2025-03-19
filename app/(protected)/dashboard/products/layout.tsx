import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 pb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          Productos
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        {children}
      </div>
    </div>
  );
}
