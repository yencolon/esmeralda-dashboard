"use client";
import { Product } from "@/interfaces/rest/products";
import ProductDetails from "../ui/product-details";
import { use, useActionState, useEffect, useState } from "react";
import { getProduct, updateProduct } from "@/app/actions/product-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoaderSpinner from "@/components/loader-spinner";

export default function ViewProduct({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [state, action, pending] = useActionState(updateProduct, undefined);
  const { id } = use(params);

  useEffect(() => {
    // Fetch product by id
    const fetchProduct = async () => {
      const response = await getProduct(Number(id));
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setIsEditing(false);
      setProduct(state.value);
    }
  }, [state]);

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!product) {
    return <LoaderSpinner message="Cargando producto..." />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl text-center sm:text-left">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="update-product"
          action={action}
          onReset={handleCancelEdit}
          className="space-y-6"
        >
          <ProductDetails
            formState={state}
            product={state?.value || product}
            isEditing={isEditing}
          />
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            {!isEditing ? (
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="w-full sm:w-auto"
              >
                Editar
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  type="submit"
                  form="update-product"
                  disabled={pending}
                  className="w-full sm:w-auto"
                >
                  {pending ? "Subiendo" : "Guardar"}
                </Button>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
