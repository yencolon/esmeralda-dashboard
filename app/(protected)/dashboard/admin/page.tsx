"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettings, updateSettings } from "@/app/actions/settings-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FormData {
  dollarValue: string;
  mobileNumber: string;
}

interface FormState {
  data: FormData;
  errors: Record<string, string[]>;
  isSubmitting: boolean;
}

const SettingsForm = ({
  formState,
  onSubmit,
  onChange,
}: {
  formState: FormState;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mobileNumber">WhatsApp</Label>
        <Input
          id="mobileNumber"
          name="mobileNumber"
          required
          placeholder="Enter WhatsApp number"
          value={formState.data.mobileNumber}
          onChange={onChange}
          disabled={formState.isSubmitting}
        />
        {formState.errors.mobileNumber?.map((error, index) => (
          <p key={index} className="text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dollarValue">Tasa Dolar</Label>
        <Input
          id="dollarValue"
          name="dollarValue"
          required
          placeholder="Enter dollar rate"
          value={formState.data.dollarValue}
          onChange={onChange}
          disabled={formState.isSubmitting}
        />
        {formState.errors.dollarValue?.map((error, index) => (
          <p key={index} className="text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>

      <Button type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
};

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    data: {
      dollarValue: "",
      mobileNumber: "",
    },
    errors: {},
    isSubmitting: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await getSettings();
        // Initialize form with settings data
        setFormState(prev => ({
          ...prev,
          data: {
            dollarValue: response.data.rate.dollarValue,
            mobileNumber: response.data.whatsapp.mobileNumber,
          },
        }));
      } catch {
        setError("Failed to load settings");
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
      errors: {
        ...prev.errors,
        [name]: [] as string[], // Explicitly type as string[] instead of undefined
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      const formData = new FormData();
      formData.append("dollarValue", formState.data.dollarValue);
      formData.append("mobileNumber", formState.data.mobileNumber);

      const response = await updateSettings(
        {
          value: formState.data,
          errors: {},
          message: "",
        },
        formData
      );

      if (response.errors && Object.keys(response.errors).length > 0) {
        setFormState(prev => ({
          ...prev,
          errors: response.errors,
          isSubmitting: false,
        }));
        return;
      }

      setFormState(prev => ({
        ...prev,
        data: response.value,
        errors: {},
        isSubmitting: false,
      }));

      toast.success(response.message || "Settings updated successfully");
    } catch {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
      }));
      toast.error("Failed to update settings");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm
            formState={formState}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
