"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Compass, 
  GraduationCap, 
  Building2, 
  FileText, 
  Briefcase, 
  Award,
  BookOpen,
  Menu,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigation = [
  { name: "Career Explorer", href: "/careers", icon: Compass },
  { name: "Colleges", href: "/colleges", icon: Building2 },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Exams", href: "/exams", icon: FileText },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Tests", href: "/tests", icon: Award },
  { name: "Chatbot", href: "/chatbot", icon: BookOpen },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CareerGuide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button className="hidden md:inline-flex" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            <Button className="w-full mt-4" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
