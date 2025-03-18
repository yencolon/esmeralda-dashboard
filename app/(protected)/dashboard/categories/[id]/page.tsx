"use client";

import { Category } from "@/interfaces/rest/category";
import { getCategory, updateCategory } from "@/app/actions/category-actions";
import { use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import CategoryDetails from "../ui/category-details";
import SubcategoryDetails from "../ui/subcategories-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ViewCategory({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [state, action, pending] = useActionState(updateCategory, undefined);

  const { id } = use(params);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getCategory(Number(id));
      setCategory(response.data);
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setIsEditing(false);
      setCategory(state.value);
    }
  }, [state]);

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="w-7/12">
        <CardHeader>
          <CardTitle>Categoría</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="update-category" action={action} onReset={handleCancelEdit}>
            <CategoryDetails
              category={state?.value || category}
              formState={state}
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
                  <Button
                    type="submit"
                    form="update-category"
                    disabled={pending}
                  >
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
      <Card className="w-7/12">
        <CardHeader>
          <CardTitle>Subcategorías</CardTitle>
        </CardHeader>
        <CardContent>
          <SubcategoryDetails
            categoryId={category.id}
            subCategories={category.subCategories}
          />
        </CardContent>
      </Card>
    </>
  );
}
