"use server"

import { LoginDataResponse } from "@/interfaces/rest/auth";
import { FormState, ServerResponse } from "@/interfaces/rest/common";
import { createSession } from "@/lib/session";
import apiExternal from "@/lib/api-external";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginFormSchema } from "@/lib/definitions/login-schema";
import { AxiosError } from "axios";

export async function login(state: FormState<{
  email: string;
  password: string;
}>, formData: FormData) {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = loginFormSchema.safeParse({
    email,
    password
  });

  if (!validatedFields.success) {
    return {
      value: {
        email, password
      },
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please check the fields',
    };
  }

  try {
    const { email, password } = validatedFields.data;
    const response = await apiExternal.get<ServerResponse<LoginDataResponse>>('/auth/login', {
      auth: {
        username: email,
        password,
      },
    });

    const { accessToken } = response.data.data;
    createSession(accessToken);

  } catch (error: unknown | AxiosError) {
    const e = error as AxiosError;
    return {
      value: {
        email, password
      },
      errors: {
        email: [],
        password: [],
      },
      message: (e.response?.data as ServerResponse<Error>)?.message || 'Invalid email or password',
    };
  }
  redirect('/dashboard/products');
}

export async function logout() {
  (await cookies()).delete('accessToken');
  redirect('/login');
}