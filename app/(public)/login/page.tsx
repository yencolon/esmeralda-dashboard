"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/app/actions/auth-actions";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {
    value: {
      email: "",
      password: "",
    },
    errors: {},
    message: "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Acceso</CardTitle>
          <CardDescription>
            Ingrese su correo y contraseña para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Correo electrónico"
                name="email"
                defaultValue={state?.value.email ?? "admin@esmeralda.com"}
                autoComplete="email"
              />
              {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={state?.value.password ?? "admin*123"}
                required
              />
              {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )}
            </div>

            {state?.errors && <p className="text-red-500">{state.message}</p>}

            <Button type="submit" className="w-full">
              {pending ? "Entrando..." : "Acceder"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
