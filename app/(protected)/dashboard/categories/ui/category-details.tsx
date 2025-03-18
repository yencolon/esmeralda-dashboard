import { Badge } from "@/components/ui/badge";
import { Category } from "@/interfaces/rest/category";
import ImageWithFallback from "@/components/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FormState } from "@/interfaces/rest/common";

interface CategoryDetailsProps {
  category: Category;
  formState: FormState<Category>;
  isEditing?: boolean;
}

export default function CategoryDetails({
  category,
  formState,
  isEditing = false,
}: CategoryDetailsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        const imageInput = document.getElementById("image") as HTMLInputElement;
        if (imageInput) imageInput.value = base64;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row w-full pb-2">
      <ImageWithFallback
        src={imagePreview ?? category.imageBase64 ?? category.pathImage}
        alt={category.name}
        width={450}
        objectFit="cover"
        className="rounded-lg"
      />

      <div className="flex flex-col pl-4 space-y-4 w-full">
        <div className="self-end space-x-2">
          <Input type="hidden" name="id" value={category.id} />
          <Badge variant="secondary">{`ID: ${category.id}`}</Badge>
          <Badge variant={category.enabled ? "default" : "destructive"}>
            {category.enabled ? "Activa" : "Inactiva"}
          </Badge>
        </div>
        <Label>Nombre</Label>
        <Input
          placeholder="Alimentos, bebidas, etc."
          name="name"
          defaultValue={category.name}
          disabled={!isEditing}
          //onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        {formState?.errors?.name && (
          <span className="text-red-600 text-xs">{formState.errors.name}</span>
        )}
        <Label>Descripción</Label>
        <Textarea
          placeholder="Descripción de la categoría"
          name="description"
          defaultValue={category.description}
          disabled={!isEditing}
          // onChange={(e) => handleChange("description", e.target.value)}
          required
        />
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            <Label htmlFor="isOpen">
              <span>Activar</span>
            </Label>
            <Switch
              id="isOpen"
              name="enabled"
              defaultChecked={category.enabled}
              disabled={!isEditing}
              //   onCheckedChange={(checked) => handleChange("enabled", checked)}
            />
          </div>

          <Label htmlFor="file">
            <Button
              variant={"secondary"}
              disabled={!isEditing}
              style={{ pointerEvents: "none" }}
            >
              <span>Subir imagen</span>
            </Button>
          </Label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            disabled={!isEditing}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <Input type="hidden" id="image" name="imageBase64" />
        </div>
      </div>
    </div>
  );
}
