"use client";

import { useEffect, useMemo, useState } from "react";

import { DataTable } from "../../../../components/data-table";
import { getColumns } from "./columns";
import { Category } from "@/interfaces/rest/category";
import { deleteCategory, getCategories } from "@/app/actions/category-actions";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/table-skeleton";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: async (category: Category) => {
          try {
            await deleteCategory(category.id);
            setCategories((prev) => prev.filter((c) => c.id !== category.id));
            toast.success("Eliminado");
          } catch {
            toast.error("Error al eliminar Producto");
          }
        },
        onEdit: (category: Category) => {
          router.push(`/dashboard/categories/${category.id}`);
        },
      }),
    [router]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setLoading(false);
      setCategories(response.data.categories);
    };
    fetchCategories();
  }, []);

  const handleOnDeleteRows = () => {
    toast.success("Eliminado");
  };

  return (
    <div className="p-4 w-full">
      {loading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          onDeleteRows={handleOnDeleteRows}
          createLink="/dashboard/categories/create"
        />
      )}
    </div>
  );
}
