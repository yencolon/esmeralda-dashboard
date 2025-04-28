"use server"

import { PreBulkResponse, PreProduct, Product } from "@/interfaces/rest/products";
import { FormState, Paginated, ServerResponse } from "@/interfaces/rest/common";
import apiExternal from "@/lib/api-external";
import { cookies } from "next/headers";
import { productSchema } from "@/lib/definitions/product-schema";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

export async function getProducts(page: number = 1, limit: number = 50) {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await apiExternal.get<ServerResponse<Paginated<Product, 'products'>>>('/product', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params
    });

    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<string>)?.message || 'Error al obtener los productos');
  }
}

export async function getProduct(id: number) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await apiExternal.get<ServerResponse<Product>>(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<string>)?.message || 'Error al obtener el producto');
  }
}


export async function deleteProduct(id: number) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await apiExternal.delete<ServerResponse<Product>>(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<string>)?.message || 'Error al eliminar el producto');
  }
}

export async function createProduct(state: FormState<Product>, formData: FormData) {
  const product = parseForm(formData);

  const validatedFields = productSchema.safeParse(product);

  if (!validatedFields.success) {
    return {
      value: product,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error en los campos',
      success: false
    }
  }

  console.log(validatedFields.data.preProductId);

  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    await apiExternal.post<ServerResponse<Product>>('/product', validatedFields.data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    return {
      value: product,
      errors: {},
      message: (e.response?.data as ServerResponse<Error>).message || 'Error al crear el producto',
      success: false
    }
  }

  redirect(`/dashboard/products`);
}

export async function updateProduct(state: FormState<Product>, formData: FormData) {
  const product = parseForm(formData);
  console.log(product);

  const validatedFields = productSchema.safeParse({
    ...product
  });

  delete validatedFields.data?.pathImage;

  if (!validatedFields.success) {
    return {
      value: product,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please check the fields',
      success: false
    }
  }

  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await apiExternal.patch<ServerResponse<Product>>(`/product/${product.id}`, validatedFields.data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return {
      value: response.data.data,
      errors: {},
      message: response.data.message,
      success: true
    }

  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    return {
      value: product,
      errors: {},
      message: (e.response?.data as ServerResponse<Error>).message || 'Error al actualizar el producto',
      success: false
    }
  }
}

function parseForm(formData: FormData): Product {
  const tags = formData.get('tags') as string;
  const tagsArray = tags.split(',').map(Number);

  const product: Product = {
    name: formData.get('name') as string || '', // Default to empty string
    description: formData.get('description') as string || '', // Default to empty string
    price: parseFloat(formData.get('price') as string || '0').toFixed(2), // Default to 0
    priceOffer: parseFloat(formData.get('priceOffer') as string || '0').toFixed(2), // Default to 0
    quantityInStock: parseInt(formData.get('quantityInStock') as string || '0'), // Default to 0
    unitId: parseInt(formData.get('unit') as string || '0'), // Default to 0
    categoryId: parseInt(formData.get('category') as string || '0'), // Default to 0
    subCategoryId: parseInt(formData.get('subcategory') as string || '0'), // Default to 0
    tags: tagsArray,
    enabled: formData.get('enabled') as string === 'on',
    id: parseInt(formData.get('id') as string || '0'), // Default to 0
    preProductId: parseInt(formData.get('preProductId') as string || '0') // Default to 0
  };

  const imageBase64 = formData.get('imageBase64') as string;
  const pathImage = formData.get('pathImage') as string;

  if (imageBase64) {
    product.imageBase64 = imageBase64;
  }

  if (pathImage) {
    product.pathImage = pathImage;
  }

  return product;
}

export async function bulkUploadProducts(file: File) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  const formData = new FormData();
  formData.append('excelFile', file);

  try {
    const response = await apiExternal.post<ServerResponse<PreBulkResponse>>('/pre-product/bulk-data-upload', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },

    });
    return response.data;
  } catch {
    return {
      success: false,
      message: 'Error al subir el archivo',
      data: null
    }
  }
}

export async function getPreProducts(page: number = 1, limit: number = 50) {
  const accessToken = (await cookies()).get('accessToken')?.value;
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await apiExternal.get<ServerResponse<Paginated<PreProduct, "preProducts">>>('/pre-product', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params
  });

  return response.data;
}
