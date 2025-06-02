import type { Metadata } from "next"
import FacultyDashboardClientComponent from "./FacultyDashboardClientComponent"

export const metadata: Metadata = {
  title: "Faculty Dashboard",
  description: "Faculty research portal for discovering and reviewing student projects",
}

export default function FacultyDashboard() {
  return <FacultyDashboardClientComponent />
}
