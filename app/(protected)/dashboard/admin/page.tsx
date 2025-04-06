"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettings, updateSettings } from "@/app/actions/settings-actions";
import { toast } from "sonner";
import { Settings } from "@/interfaces/rest/settings";

export default function AdminPage() {
  const [state, action, pending] = useActionState(updateSettings, {
    value: {
      dollarValue: "",
      mobileNumber: "",
    },
    errors: {},
    message: "",
  });
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await getSettings();
      console.log(response.data);
      setSettings(response.data);
    };
    console.log('loading settings');
    fetchSettings();
  }, []);


  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state.message]);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">WhatsApp</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                required
                defaultValue={
                  settings?.whatsapp.mobileNumber ?? state.value.mobileNumber
                }
              />
            </div>
            {state.errors.mobileNumber && (
              <p className="text-red-500">{state.errors.mobileNumber}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Tasa Dolar</Label>
              <Input
                id="dollarValue"
                name="dollarValue"
                required
                defaultValue={
                  settings?.rate.dollarValue ?? state.value.dollarValue
                }
              />
            </div>

            {state.errors.dollarValue && (
              <p className="text-red-500">{state.errors.dollarValue}</p>
            )}

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
