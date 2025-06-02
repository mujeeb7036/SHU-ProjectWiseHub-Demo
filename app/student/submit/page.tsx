import type { Metadata } from "next"
import ProjectSubmissionClient from "./client"

export const metadata: Metadata = {
  title: "Submit Project",
  description: "Submit your academic project to Sacred Heart University ProjectWise Hub",
}

export default function ProjectSubmissionPage() {
  return <ProjectSubmissionClient />
}
