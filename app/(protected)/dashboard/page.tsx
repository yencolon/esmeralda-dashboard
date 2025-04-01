import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from 'next/navigation'

export default function DashboardPage() {
   redirect('/dashboard/admin')
}
