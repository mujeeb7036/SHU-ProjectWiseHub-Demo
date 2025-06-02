"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Shield,
  Settings,
  AlertTriangle,
  Download,
  Eye,
  MessageSquare,
  UserPlus,
  UserMinus,
  Activity,
  Database,
  Server,
} from "lucide-react"
import Head from "next/head"

export default function AdminDashboard() {
  const [selectedSubmissions, setSelectedSubmissions] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [newUserRole, setNewUserRole] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [moderationFilter, setModerationFilter] = useState("all")

  // Update document title
  useEffect(() => {
    document.title = "Admin Dashboard - SHU ProjectWise Hub"
  }, [])

  const [submissions] = useState([
    {
      id: 1,
      title: "Quantum Computing Applications in Cryptography",
      author: "Alex Thompson",
      email: "alex.thompson@student.sacredheart.edu",
      department: "Computer Science",
      submissionDate: "2024-01-28",
      status: "pending",
      fileSize: "18.5 MB",
      priority: "high",
      reviewNotes: "",
    },
    {
      id: 2,
      title: "Sustainable Business Practices in Modern Corporations",
      author: "Maria Garcia",
      email: "maria.garcia@student.sacredheart.edu",
      department: "Business",
      submissionDate: "2024-01-27",
      status: "pending",
      fileSize: "12.3 MB",
      priority: "medium",
      reviewNotes: "",
    },
    {
      id: 3,
      title: "Neural Network Optimization for Real-time Processing",
      author: "David Kim",
      email: "david.kim@student.sacredheart.edu",
      department: "Computer Science",
      submissionDate: "2024-01-26",
      status: "flagged",
      fileSize: "25.1 MB",
      priority: "high",
      reviewNotes: "Potential plagiarism detected in methodology section",
    },
    {
      id: 4,
      title: "Environmental Impact of Renewable Energy Systems",
      author: "Sarah Johnson",
      email: "sarah.johnson@student.sacredheart.edu",
      department: "Engineering",
      submissionDate: "2024-01-25",
      status: "approved",
      fileSize: "15.7 MB",
      priority: "low",
      reviewNotes: "Excellent research methodology",
    },
  ])

  const [users] = useState([
    {
      id: 1,
      name: "Dr. Jane Wilson",
      email: "jane.wilson@sacredheart.edu",
      role: "faculty",
      department: "Computer Science",
      lastLogin: "2024-01-28",
      status: "active",
      projectsReviewed: 45,
    },
    {
      id: 2,
      name: "Prof. Michael Brown",
      email: "michael.brown@sacredheart.edu",
      role: "faculty",
      department: "Business",
      lastLogin: "2024-01-27",
      status: "active",
      projectsReviewed: 32,
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@student.sacredheart.edu",
      role: "student",
      department: "Computer Science",
      lastLogin: "2024-01-28",
      status: "active",
      projectsSubmitted: 3,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@student.sacredheart.edu",
      role: "student",
      department: "Health Sciences",
      lastLogin: "2024-01-20",
      status: "inactive",
      projectsSubmitted: 1,
    },
  ])

  const [systemHealth] = useState({
    serverStatus: "healthy",
    databaseStatus: "healthy",
    storageUsed: 68,
    activeUsers: 234,
    totalProjects: 1247,
    pendingSubmissions: 12,
    systemUptime: "99.9%",
    lastBackup: "2024-01-28 02:00 AM",
  })

  const handleBulkAction = () => {
    if (selectedSubmissions.length === 0 || !bulkAction) {
      alert("Please select submissions and an action")
      return
    }

    const action = bulkAction === "approve" ? "approved" : "rejected"
    alert(`${selectedSubmissions.length} submissions ${action}! (This is a demo)`)
    setSelectedSubmissions([])
    setBulkAction("")
  }

  const handleSingleAction = (submissionId: number, action: string) => {
    alert(`Submission ${submissionId} ${action}! (This is a demo)`)
  }

  const handleUserAction = (userId: number, action: string) => {
    alert(`User ${userId} ${action}! (This is a demo)`)
  }

  const handleAddUser = () => {
    if (!newUserEmail || !newUserRole) {
      alert("Please fill in all fields")
      return
    }
    alert(`User ${newUserEmail} added as ${newUserRole}! (This is a demo)`)
    setNewUserEmail("")
    setNewUserRole("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "flagged":
        return <Badge className="bg-orange-100 text-orange-800">Flagged</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const filteredSubmissions = submissions.filter((submission) => {
    if (moderationFilter === "all") return true
    return submission.status === moderationFilter
  })

  return (
    <>
      <Head>
        <title>Admin Dashboard - SHU ProjectWise Hub</title>
        <meta
          name="description"
          content="Administrative dashboard for managing submissions, users, and system health"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-red-700 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">SHU ProjectWise Hub</h1>
                  <p className="text-red-100 text-sm">Administrative Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">Admin User</p>
                    <p className="text-xs text-red-100">System Administrator</p>
                  </div>
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4" />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">System Administration</h2>
              <p className="text-gray-600">Manage submissions, users, and monitor system health.</p>
            </div>

            {/* System Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Submissions</p>
                      <p className="text-3xl font-bold text-orange-600">{systemHealth.pendingSubmissions}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-3xl font-bold text-green-600">{systemHealth.activeUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Projects</p>
                      <p className="text-3xl font-bold text-blue-600">{systemHealth.totalProjects}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Uptime</p>
                      <p className="text-3xl font-bold text-purple-600">{systemHealth.systemUptime}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="submissions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="submissions">Submission Queue</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
                <TabsTrigger value="system">System Health</TabsTrigger>
              </TabsList>

              {/* Submissions Tab */}
              <TabsContent value="submissions">
                <div className="space-y-6">
                  {/* Bulk Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Bulk Actions</CardTitle>
                      <CardDescription>Select multiple submissions to perform bulk operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Label>Selected: {selectedSubmissions.length} submissions</Label>
                        </div>
                        <Select value={bulkAction} onValueChange={setBulkAction}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Choose action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">Bulk Approve</SelectItem>
                            <SelectItem value="reject">Bulk Reject</SelectItem>
                            <SelectItem value="flag">Flag for Review</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={handleBulkAction}
                          disabled={selectedSubmissions.length === 0 || !bulkAction}
                          className="bg-red-700 hover:bg-red-800"
                        >
                          Execute Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submissions Queue */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Submission Queue</CardTitle>
                      <CardDescription>Review and manage project submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {submissions.map((submission) => (
                          <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-start space-x-4">
                              <input
                                type="checkbox"
                                checked={selectedSubmissions.includes(submission.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSubmissions([...selectedSubmissions, submission.id])
                                  } else {
                                    setSelectedSubmissions(selectedSubmissions.filter((id) => id !== submission.id))
                                  }
                                }}
                                className="mt-1"
                              />

                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold">{submission.title}</h4>
                                  {getStatusBadge(submission.status)}
                                  {getPriorityBadge(submission.priority)}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                  <div>
                                    <p className="font-medium">Author</p>
                                    <p>{submission.author}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Department</p>
                                    <p>{submission.department}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Submitted</p>
                                    <p>{new Date(submission.submissionDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">File Size</p>
                                    <p>{submission.fileSize}</p>
                                  </div>
                                </div>

                                {submission.reviewNotes && (
                                  <Alert className="mb-3 border-orange-200 bg-orange-50">
                                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                                    <AlertDescription className="text-orange-700">
                                      <strong>Review Notes:</strong> {submission.reviewNotes}
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>

                              <div className="flex flex-col space-y-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => alert(`Viewing submission ${submission.id}`)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>

                                {submission.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSingleAction(submission.id, "approved")}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleSingleAction(submission.id, "rejected")}
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => alert(`Downloading submission ${submission.id}`)}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <div className="space-y-6">
                  {/* Add New User */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Add New User</CardTitle>
                      <CardDescription>Create new user accounts and assign roles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="userEmail">Email Address</Label>
                          <Input
                            id="userEmail"
                            type="email"
                            placeholder="user@sacredheart.edu"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label>Role</Label>
                          <Select value={newUserRole} onValueChange={setNewUserRole}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="faculty">Faculty</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-end">
                          <Button onClick={handleAddUser} className="bg-red-700 hover:bg-red-800">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add User
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage existing users and their permissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {users.map((user) => (
                          <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold">{user.name}</h4>
                                  <Badge
                                    variant={
                                      user.role === "admin"
                                        ? "destructive"
                                        : user.role === "faculty"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                  </Badge>
                                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                    {user.status}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                  <div>
                                    <p className="font-medium">Email</p>
                                    <p>{user.email}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Department</p>
                                    <p>{user.department}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Last Login</p>
                                    <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Activity</p>
                                    <p>
                                      {user.role === "faculty"
                                        ? `${user.projectsReviewed} reviews`
                                        : `${user.projectsSubmitted} submissions`}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "edited")}>
                                  <Settings className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleUserAction(user.id, user.status === "active" ? "deactivated" : "activated")
                                  }
                                  className={user.status === "active" ? "text-red-600" : "text-green-600"}
                                >
                                  {user.status === "active" ? (
                                    <>
                                      <UserMinus className="h-4 w-4 mr-1" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <UserPlus className="h-4 w-4 mr-1" />
                                      Activate
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Content Moderation Tab */}
              <TabsContent value="moderation">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Moderation</CardTitle>
                      <CardDescription>Monitor and moderate project content for quality and compliance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <Label>Filter by Status</Label>
                        <Select value={moderationFilter} onValueChange={setModerationFilter}>
                          <SelectTrigger className="w-48 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Submissions</SelectItem>
                            <SelectItem value="pending">Pending Review</SelectItem>
                            <SelectItem value="flagged">Flagged Content</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        {filteredSubmissions.map((submission) => (
                          <div key={submission.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold">{submission.title}</h4>
                                  {getStatusBadge(submission.status)}
                                  {submission.status === "flagged" && (
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                  )}
                                </div>

                                <p className="text-sm text-gray-600 mb-2">
                                  By {submission.author} • {submission.department} •{" "}
                                  {new Date(submission.submissionDate).toLocaleDateString()}
                                </p>

                                {submission.reviewNotes && (
                                  <Alert className="mt-3 border-orange-200 bg-orange-50">
                                    <AlertDescription className="text-orange-700">
                                      {submission.reviewNotes}
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>

                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Comment
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* System Health Tab */}
              <TabsContent value="system">
                <div className="space-y-6">
                  {/* System Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Server className="h-5 w-5" />
                          <span>Server Status</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${systemHealth.serverStatus === "healthy" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <span className="font-medium">
                            {systemHealth.serverStatus === "healthy" ? "Healthy" : "Issues Detected"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Uptime: {systemHealth.systemUptime}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Database className="h-5 w-5" />
                          <span>Database Status</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${systemHealth.databaseStatus === "healthy" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <span className="font-medium">
                            {systemHealth.databaseStatus === "healthy" ? "Healthy" : "Issues Detected"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Last Backup: {systemHealth.lastBackup}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity className="h-5 w-5" />
                          <span>Storage Usage</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Used Storage</span>
                            <span>{systemHealth.storageUsed}%</span>
                          </div>
                          <Progress value={systemHealth.storageUsed} className="h-2" />
                          <p className="text-xs text-gray-500">2.1 TB of 3 TB used</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* System Analytics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Analytics</CardTitle>
                      <CardDescription>Monitor system performance and usage statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Recent Activity</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>12 new project submissions today</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>45 faculty reviews completed this week</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span>234 active users this month</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span>3 flagged submissions require attention</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">System Performance</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>CPU Usage</span>
                                <span>23%</span>
                              </div>
                              <Progress value={23} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Memory Usage</span>
                                <span>67%</span>
                              </div>
                              <Progress value={67} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Network I/O</span>
                                <span>45%</span>
                              </div>
                              <Progress value={45} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Maintenance</CardTitle>
                      <CardDescription>Perform system maintenance and administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" onClick={() => alert("Backup initiated! (Demo)")}>
                          <Database className="h-4 w-4 mr-2" />
                          Create Backup
                        </Button>
                        <Button variant="outline" onClick={() => alert("Cache cleared! (Demo)")}>
                          <Activity className="h-4 w-4 mr-2" />
                          Clear Cache
                        </Button>
                        <Button variant="outline" onClick={() => alert("Report generated! (Demo)")}>
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
