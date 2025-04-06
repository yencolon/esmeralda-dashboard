"use server";

import { FormState, ServerResponse } from "@/interfaces/rest/common";
import apiExternal from "@/lib/api-external";
import { Settings } from "@/interfaces/rest/settings";
import { settingSchema } from "@/lib/definitions/setting-schema";
import { cookies } from "next/headers";

export async function getSettings() {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const response = await apiExternal.get<ServerResponse<Settings>>("/setting", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export async function updateSettings(
  state: FormState<{
    dollarValue: string;
    mobileNumber: string;
  }>,
  formData: FormData
) {
  const settings = parseForm(formData);

  const validatedFields = settingSchema.safeParse({
    dollarValue: settings.dollarValue,
    mobileNumber: settings.mobileNumber,
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      value: settings,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check the fields",
    };
  }

  const accessToken = (await cookies()).get("accessToken")?.value;

  try {
    const response = await apiExternal.patch<ServerResponse<Settings>>(
      "/setting",
     settings,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      value: {
        dollarValue: response.data.data.rate.dollarValue,
        mobileNumber: response.data.data.whatsapp.mobileNumber,
      },
      errors: {},
      message: "Settings updated successfully",
    };
  } catch (error) {
    return {
      value: settings,
      errors: {},
      message: "Error updating settings",
    };
  }
}

function parseForm(formData: FormData): {
  dollarValue: string;
  mobileNumber: string;
} {
  return {
    dollarValue: formData.get("dollarValue") as string,
    mobileNumber: formData.get("mobileNumber") as string,
  };
}
