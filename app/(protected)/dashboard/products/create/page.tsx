"use client";

import ProductDetails from "../ui/product-details";
import { createProduct } from "@/app/actions/product-actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function CreateProduct() {
  const searchParams = useSearchParams();

  const preProductId = parseInt(searchParams.get("preProductId") || "0");
  const preProductName = searchParams.get("preProductName");
  const preProductDescription = searchParams.get("preProductDescription");
  const preProductPrice = searchParams.get("preProductPrice");
  const preProductPriceOffer = searchParams.get("preProductPriceOffer");
  const preProductUnitId = parseInt(
    searchParams.get("preProductUnitId") || "0"
  );

  const [state, action, pending] = useActionState(createProduct, {
    value: {
      id: 0,
      name: preProductName || "",
      description: preProductDescription || "",
      enabled: true,
      price: preProductPrice || "",
      categoryId: 0,
      unitId: preProductUnitId,
      tags: [],
      priceOffer: preProductPriceOffer || "",
      subCategoryId: 0,
      quantityInStock: 0,
      preProductId: preProductId,
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
          <div className="flex justify-end pt-4">
            <Button type="submit" form="create-product">
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
