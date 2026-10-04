import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold">About CareerGuide</h1>
          <p className="text-muted-foreground">
            CareerGuide helps students explore careers, colleges, exams, jobs, and scholarships
            with practical information and a simple career chatbot.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>What you can do here</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Browse careers with salary ranges, skills, and growth outlook.</p>
              <p>Compare colleges and entrance exams across India.</p>
              <p>Take a personality assessment and get career direction.</p>
              <p>Find jobs, internships, and scholarships.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
