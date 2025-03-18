"use server"

import { Paginated, ServerResponse } from "@/interfaces/rest/common";
import { Tag } from "@/interfaces/rest/products";
import apiExternal from "@/lib/api-external";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

export default async function getTags() {
  const accessToken = (await cookies()).get('accessToken')?.value;

  try {
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '50');
    const response = await apiExternal.get<ServerResponse<Paginated<Tag, 'tags'>>>('/tag', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params
    });

    return response.data;
  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    throw new Error((e.response?.data as ServerResponse<string>).message || 'Error al obtener las etiquetas');
  }
}