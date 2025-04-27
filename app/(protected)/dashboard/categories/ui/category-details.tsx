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
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm font-medium">
            {`ID: ${category.id}`}
          </Badge>
          <Badge
            variant={category.enabled ? "default" : "destructive"}
            className="text-sm font-medium"
          >
            {category.enabled ? "Activa" : "Inactiva"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="isOpen" className="text-sm font-medium">
            Estado
          </Label>
          <Switch
            id="isOpen"
            name="enabled"
            defaultChecked={category.enabled}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Section */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Input type="hidden" id="image" name="imageBase64" required />
              <Input type="hidden" name="id" value={category.id} />

              <div
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25",
                  !isEditing && "opacity-75"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {imagePreview || category.pathImage ? (
                  <ImageWithFallback
                    src={
                      imagePreview ?? category.imageBase64 ?? category.pathImage
                    }
                    alt={category.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-sm">No hay imagen</span>
                  </div>
                )}
              </div>

              <Input
                id="file"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={!isEditing}
              />

              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={!isEditing}
                onClick={() => document.getElementById("file")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {imagePreview || category.pathImage
                  ? "Cambiar imagen"
                  : "Subir imagen"}
              </Button>

              {formState?.errors?.imageBase64 && (
                <span className="text-sm text-destructive">
                  {formState.errors.imageBase64}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre</Label>
                <Input
                  placeholder="Alimentos, bebidas, etc."
                  name="name"
                  defaultValue={category.name}
                  disabled={!isEditing}
                  required
                  className={cn(
                    "w-full",
                    formState?.errors?.name &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {formState?.errors?.name && (
                  <span className="text-sm text-destructive">
                    {formState.errors.name}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Descripción</Label>
                <Textarea
                  placeholder="Descripción de la categoría"
                  name="description"
                  defaultValue={category.description}
                  disabled={!isEditing}
                  required
                  className="min-h-[100px] w-full resize-y"
                />
                {formState?.errors?.description && (
                  <span className="text-sm text-destructive">
                    {formState.errors.description}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {formState?.message && !formState.success && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <span className="text-sm text-destructive">
                {formState.message}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
