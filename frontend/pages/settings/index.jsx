'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  UserCircle,
  BellRing,
  Settings,
  Globe,
  FileText,
  Briefcase,
  LineChart,
  Shield,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardLayout from "@/components/layout/dashboard-layout";

const settingsOptions = [
  {
    title: "User Profile",
    icon: UserCircle,
    description: "Manage personal information, privacy preferences, and resume storage.",
    link: "/settings/profile",
  },
  {
    title: "Job Search Preferences",
    icon: Briefcase,
    description: "Set industry, role, location, and salary preferences for better job matches.",
    link: "/settings/job-preferences",
  },
  {
    title: "Notification Settings",
    icon: BellRing,
    description: "Configure alerts for job matches, interview reminders, and application deadlines.",
    link: "/settings/notifications",
  },
  {
    title: "Accessibility",
    icon: Settings,
    description: "Adjust language, text size, contrast mode, and sign language interface options.",
    link: "/settings/accessibility",
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    description: "Manage account security, data usage, and third-party integrations.",
    link: "/settings/privacy",
  },
  {
    title: "Integrations",
    icon: Globe,
    description: "Connect external accounts like LinkedIn and job boards for better results.",
    link: "/settings/integrations",
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 lg:p-8 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Account Settings
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Customize your experience and manage your account preferences to optimize your job search journey.
            </p>
          </motion.div>

          <Card className="overflow-hidden border bg-card shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="w-16"></TableHead>
                  <TableHead className="w-1/4 text-base font-semibold">Setting</TableHead>
                  <TableHead className="text-base font-semibold">Description</TableHead>
                  <TableHead className="w-1/6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settingsOptions.map((option, index) => (
                  <motion.tr
                    key={option.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group border-b hover:bg-accent/50 transition-colors duration-200"
                  >
                    <TableCell className="py-6">
                      <div className="bg-primary/10 p-3 rounded-xl inline-flex group-hover:bg-primary/20 transition-colors duration-200">
                        <option.icon className="h-6 w-6 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <p className="font-semibold text-foreground">{option.title}</p>
                    </TableCell>
                    <TableCell className="py-6">
                      <p className="text-muted-foreground leading-relaxed">{option.description}</p>
                    </TableCell>
                    <TableCell className="text-right py-6">
                      <Link href={option.link}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
                        >
                          Configure
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </Card>

          <footer className="text-center space-y-2 py-4">
            <p className="text-sm text-muted-foreground">
              Changes to settings are automatically saved to your account
            </p>
            <p className="text-xs text-muted-foreground/60">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}