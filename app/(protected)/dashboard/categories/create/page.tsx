"use client";

import { createCategory } from "@/app/actions/category-actions";
import CategoryDetails from "../ui/category-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";

export default function CreateCategory() {
  const [state, action, pending] = useActionState(createCategory, {
    value: {
      id: 0,
      name: "Categoría 1",
      description: "Descripción de la categoría 1",
      enabled: true,
      subCategories: [],
    },
    errors: {},
    message: "",
    success: false,
  });

  return (
    <Card className="w-7/12">
      <CardHeader>
        <CardTitle>Nueva categoría</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="create-category" action={action}>
          <CategoryDetails category={state.value} formState={state} isEditing />
          <div className="flex justify-end">
            <Button type="submit" form="create-category">
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
