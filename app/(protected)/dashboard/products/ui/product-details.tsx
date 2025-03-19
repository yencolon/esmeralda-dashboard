"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/interfaces/rest/products";

import ImageWithFallback from "@/components/image-with-fallback";
import CategorySelector from "./category-selector";
import UnitSelector from "./unit-selector";
import TagSelector from "./tag-selector";
import { FormState } from "@/interfaces/rest/common";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CreateProductFormProps {
  product: Product;
  formState: FormState<Product>;
  isEditing?: boolean;
}

export default function CreateProductForm({
  product,
  formState,
  isEditing = false,
}: CreateProductFormProps) {
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
    <div className="flex flex-col lg:flex-row gap-6 items-center pb-4">
      {/* Image Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-[450px] ">
        <Input type="hidden" id="image" name="imageBase64" required />
        <Input type="hidden" name="pathImage" value={product.pathImage} />

        <ImageWithFallback
          src={imagePreview ?? product.pathImage}
          alt={product.name ?? "Producto"}
          //   className="w-full max-w-xs sm:max-w-sm lg:max-w-full"
        />

        <Input
          id="file"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          disabled={!isEditing}
        />
        {formState?.errors?.imageBase64 && (
          <span className="text-red-500">{formState.errors.imageBase64}</span>
        )}
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-4 w-full lg:w-2/3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <Input type="hidden" name="id" value={product.id} />
          <Badge variant="secondary">{`ID: ${product.id}`}</Badge>
          <Badge variant={product.enabled ? "default" : "destructive"}>
            {product.enabled ? "Activa" : "Inactiva"}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="isOpen">Activar</Label>
          <Switch
            id="isOpen"
            name="enabled"
            defaultChecked={product.enabled}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label className="text-xs">Nombre del Producto</Label>
          <Input
            placeholder="Alimentos, bebidas, etc."
            name="name"
            defaultValue={product.name}
            required
            disabled={!isEditing}
          />
          {formState?.errors?.name && (
            <span className="text-red-500">{formState.errors.name}</span>
          )}
        </div>

        <CategorySelector
          defaultCategory={product.categoryId}
          defaultSubcategory={product.subCategoryId}
          disabled={!isEditing}
        />
        {formState?.errors?.categoryId && (
          <span className="text-red-500">{formState.errors.categoryId}</span>
        )}
        {formState?.errors?.subCategoryId && (
          <span className="text-red-500">{formState.errors.subCategoryId}</span>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <Label className="text-xs">Precio</Label>
            <Input
              placeholder="Precio del producto"
              name="price"
              defaultValue={product.price}
              required
              disabled={!isEditing}
              pattern="^\d+(\.\d+)?$"
            />
            {formState?.errors?.price && (
              <span className="text-red-500">{formState.errors.price}</span>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <Label className="text-xs">Precio Oferta</Label>
            <Input
              placeholder="Precio del producto en oferta"
              name="priceOffer"
              defaultValue={product.priceOffer}
              disabled={!isEditing}
              pattern="^\d+(\.\d+)?$"
            />
            {formState?.errors?.priceOffer && (
              <span className="text-red-500">
                {formState.errors.priceOffer}
              </span>
            )}
          </div>
        </div>

        <div>
          <Label className="text-xs">Descripción</Label>
          <Textarea
            placeholder="Descripción del producto"
            name="description"
            defaultValue={product.description}
            onResize={() => {}}
            required
            disabled={!isEditing}
          />
          {formState?.errors?.description && (
            <span className="text-red-500">{formState.errors.description}</span>
          )}
        </div>

        <div>
          <Label className="text-xs">Cantidad disponible</Label>
          <Input
            placeholder="Cantidad disponible"
            name="quantityInStock"
            defaultValue={product.quantityInStock}
            required
            disabled={!isEditing}
            pattern="^\d+(\.\d+)?$"
          />
          {formState?.errors?.quantityInStock && (
            <span className="text-red-500">
              {formState.errors.quantityInStock}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <UnitSelector defaultUnit={product.unitId} disabled={!isEditing} />
            {formState?.errors?.unitId && (
              <span className="text-red-500">{formState.errors.unitId}</span>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <TagSelector defaultTags={product.tags} disabled={!isEditing} />
            {formState?.errors?.tags && (
              <span className="text-red-500">{formState.errors.tags}</span>
            )}
          </div>
        </div>

        {formState?.message && !formState.success && (
          <span className="text-red-500">{formState.message}</span>
        )}

        <div className="flex justify-center sm:justify-start">
          <Label htmlFor="file" className="text-xs">
            <Button
              variant="secondary"
              style={{ pointerEvents: "none" }}
              disabled={!isEditing}
            >
              <span>Seleccionar imagen</span>
              <Upload size={24} />
            </Button>
          </Label>
        </div>
      </div>
    </div>
  );
}
