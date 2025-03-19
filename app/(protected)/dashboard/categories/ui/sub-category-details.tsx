import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Subcategory } from "@/interfaces/rest/category";

interface CreateSubcategoryDialogFormProps {
  subCategory?: Subcategory;
}

export default function CreateSubcategoryDialogForm({
  subCategory,
}: CreateSubcategoryDialogFormProps) {
  console.log(subCategory);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          defaultValue={subCategory?.name}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Descripción
        </Label>
        <Input
          id="description"
          name="description"
          defaultValue={subCategory?.description}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="enabled" className="text-right">
          Activar
        </Label>
        <Switch
          id="isOpen"
          name="enabled"
          defaultChecked={subCategory?.enabled}
        />
      </div>
      <Input type="hidden" name="categoryId" value={subCategory?.categoryId} />
      <Input type="hidden" name="id" value={subCategory?.id} />
    </div>
  );
}
