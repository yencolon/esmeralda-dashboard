"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getSettings, updateSettings } from "@/app/actions/settings-actions";
import { toast } from "sonner";
import { Loader2, Settings, Phone, DollarSign } from "lucide-react";
import LoaderSpinner from "@/components/loader-spinner";

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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="mobileNumber">Número de WhatsApp</Label>
          </div>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            required
            placeholder="+1 (555) 000-0000"
            value={formState.data.mobileNumber}
            onChange={onChange}
            disabled={formState.isSubmitting}
          />
          <p className="text-sm text-muted-foreground">
            Este número se usará para las comunicaciones con los clientes
          </p>
          {formState.errors.mobileNumber?.map((error, index) => (
            <p key={index} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="dollarValue">Tasa de cambio de dólares</Label>
          </div>
          <Input
            id="dollarValue"
            name="dollarValue"
            required
            placeholder="Enter current dollar rate"
            value={formState.data.dollarValue}
            onChange={onChange}
            disabled={formState.isSubmitting}
          />
          <p className="text-sm text-muted-foreground">
            Tasa actual usada para los cálculos de precios
          </p>
          {formState.errors.dollarValue?.map((error, index) => (
            <p key={index} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full"
      >
        {formState.isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando cambios...
          </>
        ) : (
          "Guardar cambios"
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
        setFormState((prev) => ({
          ...prev,
          data: {
            dollarValue: response.data.rate.dollarValue,
            mobileNumber: response.data.whatsapp.mobileNumber,
          },
        }));
      } catch {
        setError("Error al cargar la configuración");
        toast.error("Error al cargar la configuración");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
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

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

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
        setFormState((prev) => ({
          ...prev,
          errors: response.errors,
          isSubmitting: false,
        }));
        return;
      }

      setFormState((prev) => ({
        ...prev,
        data: response.value,
        errors: {},
        isSubmitting: false,
      }));

      toast.success("Configuración guardada con éxito");
    } catch {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
      toast.error("Error al guardar la configuración");
    }
  };

  if (isLoading) {
    return <LoaderSpinner message="Cargando configuración..." />;
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md border-destructive">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <Settings className="h-6 w-6 text-destructive" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-destructive">
                  Error al cargar la configuración
                </h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Intentar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 w-full space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Panel de administración
            </h1>
          </div>
          <p className="text-muted-foreground">
            Configura la información de contacto y la tasa de cambio de dólares
            de tu tienda.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información de la tienda</CardTitle>
            <CardDescription>
              Actualiza la información de contacto y la tasa de cambio de
              dólares
            </CardDescription>
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
    </div>
  );
}
