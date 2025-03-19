"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    WhatsApp: "",
    dolarRate: "",
  });

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Saving restaurant info:", restaurantInfo);
    alert("Restaurant information saved!");
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">WhatsApp</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={restaurantInfo.WhatsApp}
                onChange={handleInfoChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Tasa Dolar</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={restaurantInfo.dolarRate}
                onChange={handleInfoChange}
                required
              />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
