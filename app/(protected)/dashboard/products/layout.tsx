import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-4 pb-2">
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        {children}
      </div>
    </div>
  );
}
