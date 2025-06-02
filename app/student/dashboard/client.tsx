"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BookOpen,
  User,
  Bell,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Plus,
  Calendar,
  TrendingUp,
} from "lucide-react"

export default function StudentDashboardClient() {
  const [notifications] = useState([
    {
      id: 1,
      type: "approval",
      title: "Project Approved!",
      message: "Your project 'AI-Powered Healthcare Diagnostics' has been approved and published.",
      date: "2024-01-15",
      read: false,
    },
    {
      id: 2,
      type: "feedback",
      title: "Feedback Received",
      message: "Your project 'Machine Learning Analysis' received feedback from Prof. Johnson.",
      date: "2024-01-12",
      read: true,
    },
  ])

  const [projects] = useState([
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnostics",
      status: "approved",
      submissionDate: "2024-01-10",
      approvalDate: "2024-01-15",
      views: 45,
      downloads: 12,
      department: "Computer Science",
      type: "Master's Thesis",
    },
    {
      id: 2,
      title: "Machine Learning Analysis of Student Performance",
      status: "pending",
      submissionDate: "2024-01-20",
      approvalDate: null,
      views: 0,
      downloads: 0,
      department: "Computer Science",
      type: "Research Paper",
    },
    {
      id: 3,
      title: "Blockchain Implementation for Supply Chain",
      status: "rejected",
      submissionDate: "2024-01-05",
      approvalDate: null,
      views: 0,
      downloads: 0,
      department: "Computer Science",
      type: "Capstone Project",
      feedback: "Please revise the methodology section and resubmit.",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Under Review</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Needs Revision</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
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
                <p className="text-red-100 text-sm">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 cursor-pointer hover:text-red-200" />
                {notifications.some((n) => !n.read) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">John Smith</p>
                  <p className="text-xs text-red-100">Computer Science Student</p>
                </div>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("userRole")
                  localStorage.removeItem("userEmail")
                  window.location.href = "/"
                }}
                className="text-red-100 hover:text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
            <p className="text-gray-600">Track your project submissions and manage your academic portfolio.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                  </div>
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-3xl font-bold text-green-600">1</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-blue-600">45</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Downloads</p>
                    <p className="text-3xl font-bold text-purple-600">12</p>
                  </div>
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
                {notifications.some((n) => !n.read) && <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>}
              </TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Your Project Submissions</h3>
                  <Button
                    className="bg-red-700 hover:bg-red-800"
                    onClick={() => (window.location.href = "/student/submit")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit New Project
                  </Button>
                </div>

                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(project.status)}
                              <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                              {getStatusBadge(project.status)}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <p className="font-medium">Department</p>
                                <p>{project.department}</p>
                              </div>
                              <div>
                                <p className="font-medium">Type</p>
                                <p>{project.type}</p>
                              </div>
                              <div>
                                <p className="font-medium">Submitted</p>
                                <p>{new Date(project.submissionDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="font-medium">Status Date</p>
                                <p>
                                  {project.approvalDate
                                    ? new Date(project.approvalDate).toLocaleDateString()
                                    : "Pending"}
                                </p>
                              </div>
                            </div>

                            {project.status === "approved" && (
                              <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{project.views} views</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Download className="h-4 w-4" />
                                  <span>{project.downloads} downloads</span>
                                </div>
                              </div>
                            )}

                            {project.status === "rejected" && project.feedback && (
                              <Alert className="mt-4 border-red-200 bg-red-50">
                                <AlertDescription className="text-red-700">
                                  <strong>Feedback:</strong> {project.feedback}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            {project.status === "approved" && (
                              <Button variant="outline" size="sm">
                                View Public
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Edit Details
                            </Button>
                            {project.status === "rejected" && (
                              <Button size="sm" className="bg-red-700 hover:bg-red-800">
                                Resubmit
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated on your project submissions and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                          notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {notification.type === "approval" && <CheckCircle className="h-4 w-4 text-green-600" />}
                              {notification.type === "feedback" && <FileText className="h-4 w-4 text-blue-600" />}
                              <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>
                            <p className="text-gray-700 mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(notification.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Project Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">AI Healthcare Diagnostics</span>
                        <div className="text-right">
                          <p className="text-sm font-semibold">45 views</p>
                          <p className="text-xs text-gray-500">12 downloads</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Strength</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                      <p className="text-sm text-gray-600">Portfolio Completeness</p>
                      <div className="mt-4 text-xs text-gray-500">
                        <p>✓ Project diversity</p>
                        <p>✓ Quality documentation</p>
                        <p>• Add more recent projects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
