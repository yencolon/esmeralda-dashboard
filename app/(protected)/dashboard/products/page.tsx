"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../../components/data-table";
import { getColumns } from "./columns";
import { Product } from "@/interfaces/rest/products";
import { deleteProduct, getProducts } from "@/app/actions/product-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Plus } from "lucide-react";
import { ReusableSkeleton } from "@/components/skeleton";

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
    <div className="p-4 w-full space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Administra y organiza todos tus productos en un solo lugar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link
              href="/dashboard/products/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear Producto
            </Link>
          </Button>
          <Button asChild variant="outline" className="hover:bg-secondary">
            <Link
              href="/dashboard/products/bulk-upload"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Carga Masiva
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <ReusableSkeleton mode="list" />
      ) : (
        <div className="rounded-lg border bg-card px-2">
          <DataTable columns={columns} data={products} />
        </div>
      )}
    </div>
  );
}
