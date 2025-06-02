import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | SHU ProjectWise Hub",
    default: "SHU ProjectWise Hub - Academic Project Repository",
  },
  description: "Sacred Heart University academic project repository and submission portal",
  keywords: ["Sacred Heart University", "academic projects", "student submissions", "research repository"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
