"use client";

import ProductDetails from "../ui/product-details";
import { createProduct } from "@/app/actions/product-actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateProduct() {
  const [state, action, pending] = useActionState(createProduct, {
    value: {
      id: 0,
      name: "",
      description: "",
      enabled: true,
      price: "",
      categoryId: 0,
      unitId: 0,
      tags: [],
      priceOffer: "",
      subCategoryId: 0,
      quantityInStock: 0,
    },
    errors: {},
    message: "",
    success: false,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nuevo Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} id="create-product">
          <ProductDetails formState={state} product={state?.value} isEditing />
          <div className="flex justify-end">
            <Button type="submit" form="create-product">
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
