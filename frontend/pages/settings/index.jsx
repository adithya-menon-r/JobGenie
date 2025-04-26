'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  UserCircle,
  BellRing,
  Settings,
  Globe,
  Briefcase,
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
      <div className="px-6 py-10 text-foreground">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
            <p className="text-muted-foreground">
              Customize your experience and manage your account preferences to optimize your job search journey.
            </p>
          </header>

          <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="font-medium text-muted-foreground w-16"></TableHead>
                  <TableHead className="font-medium text-muted-foreground w-1/4">Setting</TableHead>
                  <TableHead className="font-medium text-muted-foreground">Description</TableHead>
                  <TableHead className="font-medium text-muted-foreground w-1/6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settingsOptions.map((option, index) => (
                  <motion.tr
                    key={option.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="bg-muted p-2 rounded-md inline-flex">
                        <option.icon className="h-5 w-5 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium py-4">
                      {option.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground py-4">
                      {option.description}
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <Link href={option.link}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground flex items-center gap-1"
                        >
                          <span>Configure</span>
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          <footer className="mt-8 text-center text-sm text-muted-foreground">
            <p>Changes to settings are automatically saved to your account</p>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}