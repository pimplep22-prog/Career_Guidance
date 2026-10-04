"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, Building2, BookOpen, BarChart3, Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({ users: 0, careers: 0, colleges: 0, courses: 0 })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/dashboard")
    }
  }, [status, session, router])

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    )
  }

  if (session?.user?.role !== "ADMIN") {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Careers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.careers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Colleges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.colleges}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.courses}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="careers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="careers">
              <Card>
                <CardHeader>
                  <CardTitle>Career Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>Add New Career</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colleges">
              <Card>
                <CardHeader>
                  <CardTitle>College Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>Add New College</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage registered users</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Site analytics and statistics</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
