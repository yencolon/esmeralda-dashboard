"use client";

import { getCategories } from "@/app/actions/category-actions";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/interfaces/rest/category";
import { useEffect, useState } from "react";

interface CategorySelectorProps {
  defaultCategory?: number;
  defaultSubcategory?: number;
  disabled?: boolean;
}

export default function CategorySelector({
  defaultCategory,
  defaultSubcategory,
  disabled,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories(1, 100);
      setCategories(response.data.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (defaultCategory) {
      const category = categories.find(
        (category) => category.id === defaultCategory
      );
      setSelectedCategory(category);
    }
  }, [defaultCategory, categories]);

  const defaultCategoryValue = defaultCategory
    ? defaultCategory.toString()
    : undefined;
  const defaultSubcategoryValue = defaultSubcategory
    ? defaultSubcategory.toString()
    : undefined;

  return (
    <div className="flex gap-4 justify-between">
      <div className="w-1/2">
        <Label className="text-xs">Categoría</Label>
        <Select
          name="category"
          onValueChange={(value) => {
            const category = categories.find(
              (category) => category.id === Number(value)
            );
            setSelectedCategory(category);
          }}
          defaultValue={defaultCategoryValue}
          disabled={disabled}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2">
        <Label className="text-xs">Subcategoría</Label>
        <Select
          name="subcategory"
          defaultValue={defaultSubcategoryValue}
          disabled={disabled}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Subcategoría" />
          </SelectTrigger>
          <SelectContent>
            {selectedCategory?.subCategories.map((subcategory) => (
              <SelectItem
                key={subcategory.id}
                value={subcategory.id.toString()}
              >
                {subcategory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
