"use client"

import { useRouter } from "next/router"
import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  BriefcaseBusiness,
  FileText,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  User,
  Speech,
  X,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs"
import GoogleTranslate from "../google-translate"
import { CareerChatbotProvider } from "./CareerChatbotProvider";

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user } = useUser()

  const navigation = [
    { name: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
    { name: "Resume Tools", href: "/resume-tools", icon: FileText },
    { name: "Mock Interview", href: "/interviews", icon: Speech },
    { name: "Career Guidance", href: "/career-guidance", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-30 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-20 flex h-screen flex-col bg-background transition-all duration-300 ease-in-out border-r relative",
          sidebarOpen ? "w-64" : "w-[68px]",
          "md:translate-x-0",
          !sidebarOpen && "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className={cn(
          "flex h-16 items-center border-b px-3",
          sidebarOpen ? "justify-between" : "justify-center"
        )}>
          <Link 
            href="/" 
            className="flex items-center gap-3"
          >
            <Sparkles className="h-6 w-6 text-primary shrink-0" />
            {sidebarOpen && (
              <span className="text-xl font-bold">JobGenie</span>
            )}
          </Link>

          {sidebarOpen ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <PanelLeftClose className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="absolute -right-4 top-4 h-8 w-8 rounded-full border bg-background shadow-sm hover:bg-accent transition-colors hidden md:flex"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 space-y-2">
            {/* Theme and Language Controls */}
            <div className={cn(
              "flex gap-2 mb-4",
              !sidebarOpen && "flex-col items-center"
            )}>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              <div className="relative z-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent transition-colors">
                  <GoogleTranslate />
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    !sidebarOpen && "justify-center px-2"
                  )}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* User profile */}
        <div className="border-t p-3">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-md p-2 hover:bg-muted transition-colors",
              !sidebarOpen && "justify-center"
            )}
            onClick={() => router.push('/profile')}
          >
            <UserButton afterSignOutUrl="/" />
            {user && sidebarOpen && (
              <span className="text-sm font-medium truncate">
                {user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn("flex-1 transition-all duration-300 ease-in-out")}>
        <div className="container py-6 px-4">
          {children}
        </div>
        <CareerChatbotProvider />
      </main>
    </div>
  );
}