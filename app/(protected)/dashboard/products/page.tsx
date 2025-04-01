"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../../components/data-table";
import { getColumns } from "./columns";
import { Product } from "@/interfaces/rest/products";
import { deleteProduct, getProducts } from "@/app/actions/product-actions";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "@/components/table-skeleton";
import { toast } from "sonner";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: async (product: Product) => {
          try {
            await deleteProduct(product.id);
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
            toast.success("Eliminado");
          } catch (error) {
            toast.error(error as string);
          }
        },
        onEdit: (product: Product) => {
          router.push(`/dashboard/products/${product.id}`);
        },
      }),
    [router]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getProducts();
      setLoading(false);
      setProducts(response.data.products);
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-4 w-full">
      {loading ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={products} createLink="/dashboard/products/create" />
      )}
    </div>
  );
}
