import type { Metadata } from "next"
import StudentDashboardClient from "./client"

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Student dashboard for managing project submissions and tracking progress",
}

export default function StudentDashboard() {
  return <StudentDashboardClient />
}
