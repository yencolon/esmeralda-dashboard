import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Subcategory } from "@/interfaces/rest/category";
import SubCategoryDetails from "./sub-category-details";
import { Edit2, Trash, Plus, FolderOpen } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
      setEditing(false);
      setSelectedSubcategory(undefined);
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Subcategorías</h3>
        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar subcategoría
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar nueva subcategoría</DialogTitle>
              <DialogDescription>
                Complete los campos para agregar una nueva subcategoría.
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
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg bg-muted/5">
          <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">No hay subcategorías</p>
          <p className="text-muted-foreground text-sm mt-2">
            Agrega una subcategoría para organizar mejor tus productos
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Dialog open={editing} onOpenChange={setEditing}>
            {subCategories.map((subCategory) => (
              <div
                key={subCategory.id}
                className={cn(
                  "group relative p-4 border rounded-lg transition-all hover:shadow-md",
                  !subCategory.enabled && "opacity-75"
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-lg">{subCategory.name}</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {`ID: ${subCategory.id}`}
                      </Badge>
                      <Badge
                        variant={subCategory.enabled ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {subCategory.enabled ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {subCategory.description}
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t">
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSubcategory(subCategory);
                          setEditing(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </DialogTrigger>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            ¿Estás seguro de eliminar {subCategory.name}?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Todos los productos asociados a esta subcategoría quedarán sin categoría.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            asChild
                          >
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleOnDeleteSubcategory(subCategory.id)
                              }
                            >
                              Eliminar
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar subcategoría</DialogTitle>
                <DialogDescription>
                  Complete los campos para editar la subcategoría.
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
