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
  // const [updateCategoryState, updateAction, pendingUpdate] = useActionState(
  //   updateSubCategory,
  //   undefined
  // );

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

  useEffect(() => {
    if (createCategoryState?.success) {
      toast.success(createCategoryState?.message);
      setCreating(false);
    } else if (createCategoryState?.message !== "") {
      toast.error(createCategoryState?.message);
    }
  }, [createCategoryState]);

  // const handleOnUpdateSubcategory = async (subcategory: Subcategory) => {
  //   try {
  //     // const result = await updateSubCategory(subcategory);
  //     console.log(result);
  //     toast.success("Subcategoría actualizada");
  //     //setEditing(false);
  //   } catch (e: any) {
  //     toast.error(e.message);
  //   }
  // };

  const handleOnDeleteSubcategory = async (subcategoryId: number) => {
    try {
      await deleteSubCategory(subcategoryId);
      toast.success("Subcategoría eliminada");
    } catch (e: unknown) {
      toast.error((e as Error)?.message);
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
                <Dialog /*open={editing} onOpenChange={setEditing}*/>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      // onClick={() => handleOnEdit(subCategory)}
                    >
                      <Edit2 />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Agregar nueva sub categoría</DialogTitle>
                      <DialogDescription>
                        Complete los campos para agregar una nueva sub
                        categoría.
                      </DialogDescription>
                    </DialogHeader>
                    <form id="edit-subcategory" /*action={updateAction}*/>
                      <SubCategoryDetails subCategory={subCategory} />
                      <DialogFooter>
                        <Button type="submit" form="edit-subcategory">
                          Guardar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
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
        </div>
      )}
    </div>
  );
}
