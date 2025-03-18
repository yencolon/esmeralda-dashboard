export interface Product {
  id: number;
  name: string;
  price: string;
  priceOffer: string,
  quantityInStock: number,

  unitId: number,
  categoryId: number,
  subCategoryId: number,

  description: string;
  pathImage?: string;
  imageBase64?: string;
  tags: number[] | {
    id: number;
    name: string;
  }[];

  enabled: boolean;
}