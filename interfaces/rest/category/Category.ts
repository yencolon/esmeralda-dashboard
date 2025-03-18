import { Subcategory } from ".";

export interface Category {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  pathImage?: string;
  imageBase64?: string;
  subCategories: Subcategory[];
}