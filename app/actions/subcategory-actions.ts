"use server";

import { Subcategory } from "@/interfaces/rest/category";
import { FormState, ServerResponse } from "@/interfaces/rest/common";
import apiExternal from "@/lib/api-external";
import { AxiosError } from "axios";
import { cookies } from "next/headers";


export async function deleteSubCategory(id: number) {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const response = await apiExternal.delete<ServerResponse<Subcategory>>(`/sub-category/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<string>)?.message || 'Error al eliminar la subcategoría');
  }
}

export async function getSubCategories() {
  const accessToken = (await cookies()).get('accessToken')?.value;
  try {
    const response = await apiExternal.get<ServerResponse<Subcategory[]>>('/sub-category', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<string>)?.message || 'Error al obtener las subcategorías');
  }
}

export async function createSubCategory(state: FormState<Subcategory>, formData: FormData) {
  const subCategory = parseForm(formData);
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    await apiExternal.post<ServerResponse<Subcategory>>('/sub-category', {
      name: subCategory.name,
      description: subCategory.description,
      enabled: subCategory.enabled ? true : false,
      categoryId: subCategory.categoryId,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return {
      value: {
        id: 0,
        name: '',
        description: '',
        enabled: true,
        categoryId: subCategory.categoryId
      },
      errors: {},
      message: 'Subcategoría creada correctamente',
      success: true
    }
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    return {
      value: subCategory,
      errors: {},
      message: (e.response?.data as ServerResponse<Error>).message || 'Error al crear la subcategoría',
      success: false
    }
  }
}

export async function updateSubCategory(state: FormState<Subcategory>, formData: FormData) {
  const subCategory = parseForm(formData);
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const response = await apiExternal.patch<ServerResponse<Subcategory>>(`/sub-category/${subCategory.id}`, {
      name: subCategory.name,
      description: subCategory.description,
      enabled: subCategory.enabled,
      categoryId: subCategory.categoryId,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    return {
      value: response.data.data,
      errors: {},
      message: 'Subcategoría actualizada correctamente',
      success: true
    }
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    return {
      value: subCategory,
      errors: {},
      message: (e.response?.data as ServerResponse<Error>).message || 'Error al actualizar la subcategoría',
      success: false
    }
  }
}


function parseForm(formData: FormData): Subcategory {
  const subCategory: Subcategory = {
    id: parseInt(formData.get('id') as string),
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    enabled: formData.get('enabled') === 'on' ? true : false,
    categoryId: Number(formData.get('categoryId')),
  };

  return subCategory;
}