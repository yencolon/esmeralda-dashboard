"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "My Restaurant",
    contactNumber: "123-456-7890",
    openingTime: "09:00",
    closingTime: "22:00",
    isOpen: true,
  })

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value })
  }

  const handleToggleOpen = () => {
    setRestaurantInfo({ ...restaurantInfo, isOpen: !restaurantInfo.isOpen })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Saving restaurant info:", restaurantInfo)
    alert("Restaurant information saved!")
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input id="name" name="name" value={restaurantInfo.name} onChange={handleInfoChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={restaurantInfo.contactNumber}
                onChange={handleInfoChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openingTime">Opening Time</Label>
              <Input
                id="openingTime"
                name="openingTime"
                type="time"
                value={restaurantInfo.openingTime}
                onChange={handleInfoChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closingTime">Closing Time</Label>
              <Input
                id="closingTime"
                name="closingTime"
                type="time"
                value={restaurantInfo.closingTime}
                onChange={handleInfoChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="isOpen" checked={restaurantInfo.isOpen} onCheckedChange={handleToggleOpen} />
              <Label htmlFor="isOpen">Restaurant is currently {restaurantInfo.isOpen ? "Open" : "Closed"}</Label>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

