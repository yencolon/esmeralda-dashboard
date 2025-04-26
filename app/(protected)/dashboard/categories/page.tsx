"use client";

import { useEffect, useMemo, useState } from "react";

import { DataTable } from "../../../../components/data-table";
import { getColumns } from "./columns";
import { Category } from "@/interfaces/rest/category";
import { deleteCategory, getCategories } from "@/app/actions/category-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ReusableSkeleton } from "@/components/skeleton";

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
    <div className="p-4 w-full space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
          <p className="text-muted-foreground">
            Administra y organiza todos tus categorías en un solo lugar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link
              href="/dashboard/categories/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear Categoría
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <ReusableSkeleton mode="list" />
      ) : (
        <div className="rounded-lg border bg-card px-2">
          <DataTable
            columns={columns}
            data={categories}
            onDeleteRows={handleOnDeleteRows}
          />
        </div>
      )}
    </div>
  );
}
