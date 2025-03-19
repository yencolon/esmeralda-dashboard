import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Subcategory } from "@/interfaces/rest/category";
import SubCategoryDetails from "./sub-category-details";
import { Edit2, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import {
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "@/app/actions/subcategory-actions";
import { toast } from "sonner";

interface SubcategoryDetailsProps {
  subCategories: Subcategory[];
  categoryId: number;
}

export default function SubcategoryDetails({
  subCategories,
  categoryId,
}: SubcategoryDetailsProps) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>();

  const [updateCategoryState, updateAction, pendingUpdate] = useActionState(
    updateSubCategory,
    undefined
  );

  const [createCategoryState, createAction, pendingCreate] = useActionState(
    createSubCategory,
    {
      value: {
        id: 0,
        name: "",
        description: "",
        enabled: true,
        categoryId: categoryId,
      },
      errors: {},
      message: "",
      success: false,
    }
  );

  // Close the "Create" dialog on success
  useEffect(() => {
    if (createCategoryState?.success) {
      toast.success("Subcategoría creada");
      setCreating(false);
    } else if (createCategoryState?.message !== "") {
      toast.error("Error al crear la subcategoría");
    }
  }, [createCategoryState]);

  // Close the "Edit" dialog on success
  useEffect(() => {
    if (updateCategoryState?.success) {
      toast.success("Subcategoría actualizada");
      setEditing(false); // Close the dialog
      setSelectedSubcategory(undefined); // Reset the selected subcategory
    } else if (updateCategoryState?.message !== "" && updateCategoryState) {
      toast.error("Error al actualizar la subcategoría");
    }
  }, [updateCategoryState]);

  const handleOnDeleteSubcategory = async (subcategoryId: number) => {
    try {
      await deleteSubCategory(subcategoryId);
      toast.success("Subcategoría eliminada");
    } catch {
      toast.error("Error al eliminar la subcategoría");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="self-end">
        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogTrigger asChild>
            <Button>Agregar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar nueva sub categoría</DialogTitle>
              <DialogDescription>
                Complete los campos para agregar una nueva sub categoría.
              </DialogDescription>
            </DialogHeader>
            <form id="create-subcategory" action={createAction}>
              <SubCategoryDetails subCategory={createCategoryState?.value} />
              <DialogFooter>
                <Button
                  type="submit"
                  form="create-subcategory"
                  disabled={pendingCreate}
                >
                  {pendingCreate ? "Guardando..." : "Guardar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {subCategories.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">No hay subcategorías</p>
        </div>
      ) : (
        <div className="space-y-4 ">
          <Dialog open={editing} onOpenChange={setEditing}>
            {subCategories.map((subCategory) => (
              <div
                key={subCategory.id}
                className="p-4 border rounded-md space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{subCategory.name}</h4>
                  <div>
                    <Badge variant="secondary">{`ID: ${subCategory.id}`}</Badge>
                    <Badge
                      variant={subCategory.enabled ? "default" : "secondary"}
                    >
                      {subCategory.enabled ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {subCategory.description}
                </p>
                <div className="flex items-center justify-end gap-2">
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedSubcategory(subCategory);
                        setEditing(true);
                      }}
                    >
                      <Edit2 />
                    </Button>
                  </DialogTrigger>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{`Estas seguro que quieres borrar ${subCategory.name}?`}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600"
                          asChild
                        >
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleOnDeleteSubcategory(subCategory.id)
                            }
                          >
                            Borrar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar sub categoría</DialogTitle>
                <DialogDescription>
                  Complete los campos para editar la sub categoría.
                </DialogDescription>
              </DialogHeader>
              <form id="edit-subcategory" action={updateAction}>
                <SubCategoryDetails
                  subCategory={
                    updateCategoryState?.value ?? selectedSubcategory
                  }
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    form="edit-subcategory"
                    disabled={pendingUpdate}
                  >
                    {pendingUpdate ? "Guardando..." : "Guardar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
