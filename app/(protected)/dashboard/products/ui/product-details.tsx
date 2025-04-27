"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/interfaces/rest/products";
import ImageWithFallback from "@/components/image-with-fallback";
import CategorySelector from "./category-selector";
import UnitSelector from "./unit-selector";
import TagSelector from "./tag-selector";
import { FormState } from "@/interfaces/rest/common";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm font-medium">
            {`ID: ${product.id}`}
          </Badge>
          <Badge
            variant={product.enabled ? "default" : "destructive"}
            className="text-sm font-medium"
          >
            {product.enabled ? "Activa" : "Inactiva"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="isOpen" className="text-sm font-medium">
            Estado
          </Label>
          <Switch
            id="isOpen"
            name="enabled"
            defaultChecked={product.enabled}
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
              <Input type="hidden" name="pathImage" value={product.pathImage} />
              <Input
                type="hidden"
                name="preProductId"
                value={product.preProductId}
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                {imagePreview || product.pathImage ? (
                  <ImageWithFallback
                    src={imagePreview ?? product.pathImage}
                    alt={product.name ?? "Producto"}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
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
                {imagePreview || product.pathImage
                  ? "Cambiar imagen"
                  : "Subir imagen"}
              </Button>

              {formState?.errors?.imageBase64 && (
                <span className="text-sm text-red-500">
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
                <Label className="text-sm font-medium">
                  Nombre del Producto
                </Label>
                <Input
                  placeholder="Ingrese el nombre del producto"
                  name="name"
                  defaultValue={product.name}
                  required
                  disabled={!isEditing}
                  className="w-full"
                />
                {formState?.errors?.name && (
                  <span className="text-sm text-red-500">
                    {formState.errors.name}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <CategorySelector
                  defaultCategory={product.categoryId}
                  defaultSubcategory={product.subCategoryId}
                  disabled={!isEditing}
                />
                {formState?.errors?.categoryId && (
                  <span className="text-sm text-red-500">
                    {formState.errors.categoryId}
                  </span>
                )}
                {formState?.errors?.subCategoryId && (
                  <span className="text-sm text-red-500">
                    {formState.errors.subCategoryId}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Precio</Label>
                  <Input
                    placeholder="0.00"
                    name="price"
                    defaultValue={product.price}
                    required
                    disabled={!isEditing}
                    pattern="^\d+(\.\d+)?$"
                    className="w-full"
                  />
                  {formState?.errors?.price && (
                    <span className="text-sm text-red-500">
                      {formState.errors.price}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Precio Oferta</Label>
                  <Input
                    placeholder="0.00"
                    name="priceOffer"
                    defaultValue={product.priceOffer}
                    disabled={!isEditing}
                    pattern="^\d+(\.\d+)?$"
                    className="w-full"
                  />
                  {formState?.errors?.priceOffer && (
                    <span className="text-sm text-red-500">
                      {formState.errors.priceOffer}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Descripción</Label>
                <Textarea
                  placeholder="Ingrese la descripción del producto"
                  name="description"
                  defaultValue={product.description}
                  required
                  disabled={!isEditing}
                  className="min-h-[100px] w-full"
                />
                {formState?.errors?.description && (
                  <span className="text-sm text-red-500">
                    {formState.errors.description}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Cantidad disponible
                  </Label>
                  <Input
                    placeholder="0"
                    name="quantityInStock"
                    defaultValue={product.quantityInStock}
                    required
                    disabled={!isEditing}
                    pattern="^\d+(\.\d+)?$"
                    className="w-full"
                  />
                  {formState?.errors?.quantityInStock && (
                    <span className="text-sm text-red-500">
                      {formState.errors.quantityInStock}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <UnitSelector
                    defaultUnit={product.unitId}
                    disabled={!isEditing}
                  />
                  {formState?.errors?.unitId && (
                    <span className="text-sm text-red-500">
                      {formState.errors.unitId}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <TagSelector defaultTags={product.tags} disabled={!isEditing} />
                {formState?.errors?.tags && (
                  <span className="text-sm text-red-500">
                    {formState.errors.tags}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {formState?.message && !formState.success && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-sm text-red-600">{formState.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
