"use client";

import { useEffect, useMemo, useState } from "react";

import { DataTable } from "../../../../components/data-table";
import { getColumns } from "./columns";
import { Category } from "@/interfaces/rest/category";
import { deleteCategory, getCategories } from "@/app/actions/category-actions";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/table-skeleton";
import { useRouter } from "next/navigation";
import { CategoriesPagination } from "./ui/categories-pagination";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

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
      try {
        setLoading(true);
        const response = await getCategories(page, pageSize);
        setCategories(response.data.categories);
        setTotalPages(Math.ceil(response.data.total / pageSize));
        setTotalItems(response.data.total);
        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar las categorías");
        setLoading(false);
      }
    };
    fetchCategories();
  }, [page, pageSize]);

  const handleOnDeleteRows = () => {
    toast.success("Eliminado");
  };

  return (
    <div className="p-4 w-full">
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={categories}
            onDeleteRows={handleOnDeleteRows}
            createLink="/dashboard/categories/create"
          />
          {/* <div className="mt-4 flex items-end justify-end">
            <CategoriesPagination
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div> */}
        </>
      )}
    </div>
  );
}
