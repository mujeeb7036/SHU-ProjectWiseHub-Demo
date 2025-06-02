"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Upload, FileText, CheckCircle, AlertCircle, User, Tag, FileUp, X } from "lucide-react"

export default function ProjectSubmissionClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    abstract: "",
    department: "",
    projectType: "",
    year: "",
    keywords: "",
    methodology: "",
    results: "",
    conclusion: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [mainDocument, setMainDocument] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number) => {
    const newErrors: string[] = []

    if (step === 1) {
      if (!formData.title) newErrors.push("Project title is required")
      if (!formData.description) newErrors.push("Project description is required")
      if (!formData.department) newErrors.push("Department selection is required")
      if (!formData.projectType) newErrors.push("Project type is required")
      if (!formData.year) newErrors.push("Completion year is required")
    }

    if (step === 2) {
      if (!formData.abstract) newErrors.push("Abstract is required")
      if (!formData.keywords) newErrors.push("Keywords are required")
    }

    if (step === 3) {
      if (!mainDocument) newErrors.push("Main document is required")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    setErrors([])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "main" | "additional" | "cover") => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    if (type === "main") {
      const file = selectedFiles[0]
      if (file && file.type === "application/pdf" && file.size <= 50 * 1024 * 1024) {
        setMainDocument(file)
      } else {
        alert("Main document must be a PDF file under 50MB")
      }
    } else if (type === "cover") {
      const file = selectedFiles[0]
      if (file && file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
        setCoverImage(file)
      } else {
        alert("Cover image must be an image file under 5MB")
      }
    } else {
      const newFiles = Array.from(selectedFiles).filter((file) => file.size <= 10 * 1024 * 1024)
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number, type: "additional" | "main" | "cover") => {
    if (type === "additional") {
      setFiles(files.filter((_, i) => i !== index))
    } else if (type === "main") {
      setMainDocument(null)
    } else {
      setCoverImage(null)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)

    // Simulate submission process
    setTimeout(() => {
      setCurrentStep(4) // Move to confirmation step
      setIsSubmitting(false)
    }, 3000)
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
                <p className="text-red-100 text-sm">Project Submission Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm">Welcome, John Smith</p>
                <p className="text-xs text-red-100">Computer Science Student</p>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
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
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-900">Submit Your Project</h2>
              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span className={currentStep >= 1 ? "text-red-600 font-semibold" : ""}>Basic Info</span>
              <span className={currentStep >= 2 ? "text-red-600 font-semibold" : ""}>Project Details</span>
              <span className={currentStep >= 3 ? "text-red-600 font-semibold" : ""}>File Upload</span>
              <span className={currentStep >= 4 ? "text-red-600 font-semibold" : ""}>Confirmation</span>
            </div>
          </div>

          {/* Error Display */}
          {errors.length > 0 && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="text-red-700">
                  <p className="font-semibold mb-2">Please fix the following errors:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Basic Project Information</span>
                </CardTitle>
                <CardDescription>Provide the essential details about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your project title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">10-255 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="health-sciences">Health Sciences</SelectItem>
                        <SelectItem value="arts-humanities">Arts & Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="capstone">Capstone Project</SelectItem>
                        <SelectItem value="thesis">Master's Thesis</SelectItem>
                        <SelectItem value="research">Research Paper</SelectItem>
                        <SelectItem value="group">Group Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="year">Completion Year *</Label>
                    <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords/Tags *</Label>
                    <Input
                      id="keywords"
                      placeholder="AI, Machine Learning, Healthcare"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a brief description of your project (50-1000 characters)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 characters</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} className="bg-red-700 hover:bg-red-800">
                    Next: Project Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Detailed Project Information</span>
                </CardTitle>
                <CardDescription>
                  Provide comprehensive details about your project methodology and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="abstract">Abstract/Summary *</Label>
                  <Textarea
                    id="abstract"
                    placeholder="Provide a comprehensive abstract of your project (100-2000 characters)"
                    value={formData.abstract}
                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                    className="mt-1 min-h-[150px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.abstract.length}/2000 characters</p>
                </div>

                <div>
                  <Label htmlFor="methodology">Methodology (Optional)</Label>
                  <Textarea
                    id="methodology"
                    placeholder="Describe the methodology used in your project"
                    value={formData.methodology}
                    onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                    className="mt-1 min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5000 characters</p>
                </div>

                <div>
                  <Label htmlFor="results">Results & Findings (Optional)</Label>
                  <Textarea
                    id="results"
                    placeholder="Summarize the key results and findings of your project"
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    className="mt-1 min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5000 characters</p>
                </div>

                <div>
                  <Label htmlFor="conclusion">Conclusions (Optional)</Label>
                  <Textarea
                    id="conclusion"
                    placeholder="Provide your conclusions and future work recommendations"
                    value={formData.conclusion}
                    onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                    className="mt-1 min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5000 characters</p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={nextStep} className="bg-red-700 hover:bg-red-800">
                    Next: File Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: File Upload */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Project Files</span>
                </CardTitle>
                <CardDescription>Upload your main document and any additional supporting files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Document Upload */}
                <div>
                  <Label>Main Document (PDF) *</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    {mainDocument ? (
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium">{mainDocument.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(mainDocument.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(0, "main")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop your main document here, or click to browse
                        </p>
                        <p className="text-xs text-gray-400">PDF only, maximum 50MB</p>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, "main")}
                          className="hidden"
                          id="main-document"
                        />
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById("main-document")?.click()}
                        >
                          Select PDF File
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Files Upload */}
                <div>
                  <Label>Additional Files (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload supplementary files (presentations, data, code, etc.)
                    </p>
                    <p className="text-xs text-gray-400">Multiple files allowed, 10MB each</p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e, "additional")}
                      className="hidden"
                      id="additional-files"
                    />
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("additional-files")?.click()}
                    >
                      Select Files
                    </Button>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label className="text-sm font-medium">Additional Files:</Label>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index, "additional")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div>
                  <Label>Cover Image (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    {coverImage ? (
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium">{coverImage.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(coverImage.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(0, "cover")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload a cover image for your project</p>
                        <p className="text-xs text-gray-400">JPG or PNG, recommended 1200x800px, max 5MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "cover")}
                          className="hidden"
                          id="cover-image"
                        />
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById("cover-image")?.click()}
                        >
                          Select Image
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={handleSubmit} className="bg-red-700 hover:bg-red-800" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Submit Project"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Submission Successful!</span>
                </CardTitle>
                <CardDescription>Your project has been submitted and is now under review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Project Submitted Successfully</h3>
                      <p className="text-green-700">Submission ID: #PRJ-2024-001234</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Project Title:</p>
                      <p className="text-gray-900">{formData.title}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Department:</p>
                      <p className="text-gray-900">{formData.department}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Project Type:</p>
                      <p className="text-gray-900">{formData.projectType}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Submission Date:</p>
                      <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your project will be reviewed by faculty administrators</li>
                    <li>• You'll receive an email notification within 3-5 business days</li>
                    <li>• If approved, your project will be published in the repository</li>
                    <li>• You can track the status in your student dashboard</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => (window.location.href = "/student/dashboard")}>
                    View Dashboard
                  </Button>
                  <Button
                    className="bg-red-700 hover:bg-red-800"
                    onClick={() => (window.location.href = "/student/submit")}
                  >
                    Submit Another Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
