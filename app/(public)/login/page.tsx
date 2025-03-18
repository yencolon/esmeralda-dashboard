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
      email: "jose.artigas@mailinator.com",
      password: "Jose123+-",
    },
    errors: {},
    message: "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Email"
                name="email"
                //defaultValue={"jose.artigas@mailinator.com"}
                defaultValue={state?.value.email ?? ""}
              />
              {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                // defaultValue={"Jose123+-"}
                defaultValue={state?.value.password ?? ""}
                required
              />
              {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )}
            </div>

            {state?.errors && <p className="text-red-500">{state.message}</p>}

            <Button type="submit" className="w-full">
              {pending ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
