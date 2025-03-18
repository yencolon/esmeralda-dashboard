"use client";
import { Product } from "@/interfaces/rest/products";
import ProductDetails from "../ui/product-details";
import { use, useActionState, useEffect, useState } from "react";
import { getProduct, updateProduct } from "@/app/actions/product-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
      // Fetch product by id
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
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="update-product" action={action} onReset={handleCancelEdit}>
          <ProductDetails
            formState={state}
            product={product}
            isEditing={isEditing}
          />
          <div className="flex flex-row justify-end">
            {!isEditing ? (
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Editar
              </Button>
            ) : (
              <div className="space-x-4">
                <Button type="submit" form="update-product" disabled={pending}>
                  {pending ? "Subiendo" : "Guardar"}
                </Button>
                <Button type="reset" variant="secondary">
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
