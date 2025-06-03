"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  User,
  Search,
  Filter,
  Download,
  Eye,
  Bookmark,
  MessageSquare,
  Star,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  BookmarkPlus,
  ExternalLink,
  ThumbsUp,
} from "lucide-react"

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
      console.log(`Adding comment to project ${projectId}: ${newComment}`)
      setNewComment("")
      setShowCommentForm(null)
    }
  }

  const handleDownload = (projectId: number) => {
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Research Portal</h2>
            <p className="text-gray-600">Discover, review, and integrate student projects into your curriculum.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bookmarked</p>
                    <p className="text-3xl font-bold text-blue-600">{bookmarkedProjects.length}</p>
                  </div>
                  <Bookmark className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-3xl font-bold text-green-600">12</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Departments</p>
                    <p className="text-3xl font-bold text-purple-600">4</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="search">Project Search</TabsTrigger>
              <TabsTrigger value="bookmarks">My Bookmarks ({bookmarkedProjects.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Search Tab */}
            <TabsContent value="search">
              <div className="space-y-6">
                {/* Advanced Search Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>Advanced Search</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="search">Search Projects</Label>
                        <Input
                          id="search"
                          placeholder="Title, author, keywords..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Department</Label>
                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Departments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Health Sciences">Health Sciences</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Year</Label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Years</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Project Type</Label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Master's Thesis">Master's Thesis</SelectItem>
                            <SelectItem value="Capstone Project">Capstone Project</SelectItem>
                            <SelectItem value="Research Paper">Research Paper</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Results */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Search Results ({filteredProjects.length} projects)</h3>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Sort by relevance</span>
                    </div>
                  </div>

                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                              <Badge variant="outline">{project.type}</Badge>
                              {bookmarkedProjects.includes(project.id) && (
                                <Bookmark className="h-4 w-4 text-blue-600 fill-current" />
                              )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                              <div>
                                <p className="font-medium">Author</p>
                                <p>{project.author}</p>
                              </div>
                              <div>
                                <p className="font-medium">Department</p>
                                <p>{project.department}</p>
                              </div>
                              <div>
                                <p className="font-medium">Year</p>
                                <p>{project.year}</p>
                              </div>
                              <div>
                                <p className="font-medium">Rating</p>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span>{project.rating}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-3 line-clamp-2">{project.abstract}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.keywords.map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{project.views} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Download className="h-4 w-4" />
                                <span>{project.downloads} downloads</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{project.comments.length} comments</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(project.submissionDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Button variant="outline" size="sm" onClick={() => handlePreview(project.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>

                          <Button variant="outline" size="sm" onClick={() => handleDownload(project.id)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download ({project.fileSize})
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleBookmark(project.id)}
                            className={bookmarkedProjects.includes(project.id) ? "bg-blue-50 text-blue-700" : ""}
                          >
                            <BookmarkPlus className="h-4 w-4 mr-1" />
                            {bookmarkedProjects.includes(project.id) ? "Bookmarked" : "Bookmark"}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowCommentForm(showCommentForm === project.id ? null : project.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Comment
                          </Button>

                          <Button variant="outline" size="sm" onClick={() => handleIntegrateCourse(project.id)}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Integrate with Course
                          </Button>
                        </div>

                        {/* Comment Form */}
                        {showCommentForm === project.id && (
                          <div className="border-t pt-4">
                            <div className="space-y-3">
                              <Label>Add Comment</Label>
                              <Textarea
                                placeholder="Share your thoughts on this project..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[80px]"
                              />
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleComment(project.id)}
                                  className="bg-red-700 hover:bg-red-800"
                                >
                                  Post Comment
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setShowCommentForm(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Existing Comments */}
                        {project.comments.length > 0 && (
                          <div className="border-t pt-4 mt-4">
                            <h5 className="font-semibold mb-3">Comments ({project.comments.length})</h5>
                            <div className="space-y-3">
                              {project.comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(comment.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700">{comment.text}</p>
                                  <div className="flex space-x-2 mt-2">
                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      Helpful
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                      <MessageSquare className="h-3 w-3 mr-1" />
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Bookmarks Tab */}
            <TabsContent value="bookmarks">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookmarked Projects</CardTitle>
                  <CardDescription>Quick access to your saved projects</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookmarkedProjects.length === 0 ? (
                    <div className="text-center py-8">
                      <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No bookmarked projects yet</p>
                      <p className="text-sm text-gray-400">
                        Bookmark projects from the search tab to access them quickly
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects
                        .filter((project) => bookmarkedProjects.includes(project.id))
                        .map((project) => (
                          <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-semibold">{project.title}</h4>
                              <p className="text-sm text-gray-600">
                                {project.author} • {project.department}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handlePreview(project.id)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleBookmark(project.id)}
                                className="text-red-600"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 3)
                        .map((project, index) => (
                          <div key={project.id} className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-red-700">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{project.title}</p>
                              <p className="text-xs text-gray-500">{project.views} views</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Computer Science", "Business", "Engineering", "Health Sciences"].map((dept) => {
                        const count = projects.filter((p) => p.department === dept).length
                        const percentage = (count / projects.length) * 100
                        return (
                          <div key={dept}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{dept}</span>
                              <span>{count} projects</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Preview Modal */}
          {previewProject && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Project Preview</h3>
                    <Button variant="ghost" onClick={() => setPreviewProject(null)}>
                      ×
                    </Button>
                  </div>
                  {(() => {
                    const project = projects.find((p) => p.id === previewProject)
                    return project ? (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">{project.title}</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Author:</strong> {project.author}
                          </div>
                          <div>
                            <strong>Department:</strong> {project.department}
                          </div>
                          <div>
                            <strong>Year:</strong> {project.year}
                          </div>
                          <div>
                            <strong>Type:</strong> {project.type}
                          </div>
                        </div>
                        <div>
                          <strong>Abstract:</strong>
                          <p className="mt-2 text-gray-700">{project.abstract}</p>
                        </div>
                        <div>
                          <strong>Keywords:</strong>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.keywords.map((keyword, index) => (
                              <Badge key={index} variant="secondary">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-4 pt-4">
                          <Button onClick={() => handleDownload(project.id)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download Full Document
                          </Button>
                          <Button variant="outline" onClick={() => toggleBookmark(project.id)}>
                            <Bookmark className="h-4 w-4 mr-2" />
                            {bookmarkedProjects.includes(project.id) ? "Remove Bookmark" : "Bookmark"}
                          </Button>
                        </div>
                      </div>
                    ) : null
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
