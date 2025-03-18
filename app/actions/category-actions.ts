"use server"

import { Category } from "@/interfaces/rest/category";
import { FormState, Paginated, ServerResponse } from "@/interfaces/rest/common";
import apiExternal from "@/lib/api-external";
import { categorySchema } from "@/lib/definitions/category-schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

export async function getCategories() {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '50');
    const response = await apiExternal.get<ServerResponse<Paginated<Category, 'categories'>>>('/category', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params
    });

    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<Error>)?.message || 'Error al obtener las categorías');
  }
}

export async function getCategory(id: number) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await apiExternal.get<ServerResponse<Category>>(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<Error>)?.message || 'Error al obtener la categoría');
  }
}


export async function deleteCategory(id: number) {
  console.log('deleteCategory', id);
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const response = await apiExternal.delete<ServerResponse<Category>>(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<Error>)?.message || 'Error al eliminar la categoría');
  }
}

export async function createCategory(state: FormState<Category>, formData: FormData) {
  const category = parseForm(formData);
  const validatedFields = categorySchema.safeParse(category);

  if (!validatedFields.success) {
    return {
      value: category,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data',
      success: false
    }
  }

  const accessToken = (await cookies()).get('accessToken')?.value;
  let id = 0;
  try {
    const response = await apiExternal.post<ServerResponse<Category>>('/category', validatedFields.data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    id = response.data.data.id;
   
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    return {
      value: category,
      errors: {},
      message: (e.response?.data as ServerResponse<Error>)?.message || 'Error al crear la categoría',
      success: false
    }
  }
  redirect(`/dashboard/categories/${id}`);
}

export async function updateCategory(state: FormState<Category>, formData: FormData) {
  const category = parseForm(formData);
  const validatedFields = categorySchema.safeParse(category);

  if (!validatedFields.success) {
    return {
      value: category,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data',
      success: false
    }
  }

  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const response = await apiExternal.patch<ServerResponse<Category>>(`/category/${category.id}`, validatedFields.data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
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
      value: category,
      errors: {},
      message: (e.response?.data as ServerResponse<Error>)?.message || 'Error al actualizar la categoría',
      success: false
    }
  }
}

function parseForm(formData: FormData): Category {
  const category: Category = {
    id: parseInt(formData.get('id') as string),
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    enabled: formData.get('enabled') === 'on',
    subCategories: []
  };

  const imageBase64 = formData.get('imageBase64') as string;

  if (imageBase64) {
    category.imageBase64 = imageBase64;
  }

  return category;
}