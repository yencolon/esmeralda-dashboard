export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 sm:p-6">
      <div className="flex flex-col justify-center items-center gap-5">
        {children}
      </div>
    </div>
  );
}
