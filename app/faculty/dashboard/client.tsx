"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"

export default function FacultyDashboardClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([1, 3])
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [previewProject, setPreviewProject] = useState<number | null>(null)

  const [projects] = useState([
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnostics System",
      author: "John Smith",
      department: "Computer Science",
      year: "2024",
      type: "Master's Thesis",
      abstract:
        "This project develops an AI-powered diagnostic system that can analyze medical images and provide preliminary diagnoses with 95% accuracy. The system uses deep learning algorithms trained on a dataset of over 100,000 medical images.",
      keywords: ["AI", "Healthcare", "Machine Learning", "Medical Imaging"],
      views: 245,
      downloads: 67,
      rating: 4.8,
      submissionDate: "2024-01-15",
      status: "approved",
      fileSize: "15.2 MB",
      comments: [
        {
          id: 1,
          author: "Dr. Johnson",
          text: "Excellent work on the neural network architecture!",
          date: "2024-01-20",
        },
        { id: 2, author: "Prof. Williams", text: "The validation methodology is very thorough.", date: "2024-01-22" },
      ],
    },
    {
      id: 2,
      title: "Blockchain Implementation for Supply Chain Management",
      author: "Sarah Davis",
      department: "Business",
      year: "2024",
      type: "Capstone Project",
      abstract:
        "A comprehensive blockchain solution for tracking products through the supply chain, ensuring transparency and reducing fraud. Implemented using Ethereum smart contracts.",
      keywords: ["Blockchain", "Supply Chain", "Ethereum", "Smart Contracts"],
      views: 189,
      downloads: 43,
      rating: 4.6,
      submissionDate: "2024-01-10",
      status: "approved",
      fileSize: "8.7 MB",
      comments: [],
    },
    {
      id: 3,
      title: "Sustainable Energy Solutions for Campus Buildings",
      author: "Michael Chen",
      department: "Engineering",
      year: "2023",
      type: "Research Paper",
      abstract:
        "Analysis of renewable energy implementation strategies for university campus buildings, including cost-benefit analysis and environmental impact assessment.",
      keywords: ["Renewable Energy", "Sustainability", "Campus", "Green Technology"],
      views: 156,
      downloads: 34,
      rating: 4.4,
      submissionDate: "2023-12-15",
      status: "approved",
      fileSize: "12.1 MB",
      comments: [
        { id: 1, author: "Dr. Green", text: "Great analysis of the environmental impact!", date: "2023-12-20" },
      ],
    },
    {
      id: 4,
      title: "Mental Health Support App for College Students",
      author: "Emily Rodriguez",
      department: "Health Sciences",
      year: "2024",
      type: "Capstone Project",
      abstract:
        "Development of a mobile application providing mental health resources, mood tracking, and peer support features specifically designed for college students.",
      keywords: ["Mental Health", "Mobile App", "College Students", "Wellness"],
      views: 298,
      downloads: 89,
      rating: 4.9,
      submissionDate: "2024-01-25",
      status: "approved",
      fileSize: "22.3 MB",
      comments: [],
    },
  ])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = !selectedDepartment || project.department === selectedDepartment
    const matchesYear = !selectedYear || project.year === selectedYear
    const matchesType = !selectedType || project.type === selectedType

    return matchesSearch && matchesDepartment && matchesYear && matchesType
  })

  const toggleBookmark = (projectId: number) => {
    setBookmarkedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const handleComment = (projectId: number) => {
    if (newComment.trim()) {
      // In a real app, this would send to backend
      console.log(`Adding comment to project ${projectId}: ${newComment}`)
      setNewComment("")
      setShowCommentForm(null)
    }
  }

  const handleDownload = (projectId: number) => {
    // Simulate download
    console.log(`Downloading project ${projectId}`)
    alert("Download started! (This is a demo)")
  }

  const handlePreview = (projectId: number) => {
    setPreviewProject(projectId)
  }

  const handleIntegrateCourse = (projectId: number) => {
    alert(`Integration with course management system initiated for project ${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">SHU ProjectWise Hub</h1>
                <p className="text-red-100 text-sm">Faculty Research Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">Dr. Jane Wilson</p>
                  <p className="text-xs text-red-100">Computer Science Faculty</p>
                </div>
                <div className="w-8 h-8 bg-re\
