'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      <div className="px-6 py-10 text-slate-800 font-sans bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Account Settings</h1>
            <p className="text-center text-slate-600 max-w-2xl mx-auto">
              Customize your experience and manage your account preferences to optimize your job search journey.
            </p>
          </header>

          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200 hover:bg-transparent">
                  <TableHead className="font-medium text-slate-600 w-16"></TableHead>
                  <TableHead className="font-medium text-slate-600 w-1/4">Setting</TableHead>
                  <TableHead className="font-medium text-slate-600">Description</TableHead>
                  <TableHead className="font-medium text-slate-600 w-1/6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settingsOptions.map((option, index) => (
                  <motion.tr
                    key={option.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="bg-slate-100 p-2 rounded-md inline-flex">
                        <option.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-800 py-4">
                      {option.title}
                    </TableCell>
                    <TableCell className="text-slate-600 py-4">
                      {option.description}
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <Link href={option.link}>
                        <Button
                          size="sm"
                          className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all rounded flex items-center gap-1 border border-slate-200 hover:border-blue-500"
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

          <footer className="mt-8 text-center text-sm text-slate-500">
            <p>Changes to settings are automatically saved to your account</p>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}