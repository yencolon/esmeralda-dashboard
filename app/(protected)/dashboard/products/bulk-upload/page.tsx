"use client";

import { bulkUploadProducts, getPreProducts } from "@/app/actions/product-actions";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { PreProduct } from "@/interfaces/rest/products/PreProduct";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./columns";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, AlertCircle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BulkUploadProducts() {
  const [file, setFile] = useState<File | null>(null);
  const [preProducts, setPreProducts] = useState<PreProduct[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const router = useRouter();

  const columns = useMemo(
    () =>
      getColumns({
        onPublish: (product) => {
          // Navigate to create product page with pre-filled data
          const params = new URLSearchParams();
          params.set("preProductId", product.id.toString());
          params.set("preProductName", product.name);
          params.set("preProductDescription", product.description);
          params.set("preProductPrice", product.price.toString());
          params.set("preProductPriceOffer", product.priceOffer.toString());
          params.set("preProductUnitId", product.unitId.toString());
          router.push(`/dashboard/products/create?${params.toString()}`);  
        },
      }),
    [router]
  );

  useEffect(() => {
    const fetchPreProducts = async () => {
      try {
        const result = await getPreProducts(currentPage, pageSize);
        setPreProducts(result.data.preProducts);
        setPageCount(Math.ceil(result.data.total / pageSize));
      } catch (error) {
        toast.error(error as string);
      }
    };
    fetchPreProducts();
  }, [currentPage, pageSize]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("No se ha seleccionado ningún archivo");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    const result = await bulkUploadProducts(file);
    clearInterval(progressInterval);
    setUploadProgress(100);
    setIsUploading(false);

    if (result?.success) {
      setPreProducts(result.data?.products as PreProduct[]);
      toast.success("Archivo subido correctamente");
    } else {
      toast.error(result?.message || "Error al subir el archivo");
    }
  };

  return (
    <div className="p-6 w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Carga Masiva de Productos</h1>
        </div>
        <p className="text-muted-foreground">
          Sube un archivo CSV o Excel con tus productos. Luego, completa la información necesaria para publicarlos.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                "hover:border-primary/50",
                file ? "border-primary" : "border-muted-foreground/25"
              )}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept={".csv, .xlsx, .xls"}
                name="excelFile"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {file ? file.name : "Arrastra y suelta tu archivo aquí"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    o haz clic para seleccionar un archivo
                  </p>
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  Subiendo archivo... {uploadProgress}%
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={!file || isUploading}
            >
              {isUploading ? "Subiendo..." : "Subir Archivo"}
            </Button>
          </form>
        </Card>

        {preProducts.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Productos Pendientes</h2>
                <p className="text-sm text-muted-foreground">
                  {preProducts.length} productos esperando ser completados
                </p>
              </div>
            </div>
            
            <DataTable 
              columns={columns} 
              data={preProducts} 
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </Card>
        )}

        {preProducts.length === 0 && !isUploading && (
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No hay productos pendientes</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Sube un archivo CSV o Excel para comenzar
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
