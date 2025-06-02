"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Eye, EyeOff, Shield, Users, Award, GraduationCap, UserCheck, Settings } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("student")

  // Demo credentials
  const credentials = {
    student: { email: "student@student.sacredheart.edu", password: "password123" },
    faculty: { email: "faculty@sacredheart.edu", password: "faculty123" },
    admin: { email: "admin@sacredheart.edu", password: "admin123" },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      const creds = credentials[activeTab as keyof typeof credentials]

      if (email === creds.email && password === creds.password) {
        // Store user info in localStorage
        localStorage.setItem("userRole", activeTab)
        localStorage.setItem("userEmail", email)

        // Redirect based on role
        switch (activeTab) {
          case "student":
            window.location.href = "/student/dashboard"
            break
          case "faculty":
            window.location.href = "/faculty/dashboard"
            break
          case "admin":
            window.location.href = "/admin/dashboard"
            break
        }
      } else {
        setError("Invalid credentials. Please check your email and password.")
      }
      setIsLoading(false)
    }, 1500)
  }

  const fillDemoCredentials = () => {
    const creds = credentials[activeTab as keyof typeof credentials]
    setEmail(creds.email)
    setPassword(creds.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">SHU ProjectWise Hub</h1>
                <p className="text-red-100 text-sm">Academic Project Repository</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Secure Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Multi-Role Platform</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SHU ProjectWise</h2>
            <p className="text-gray-600">Sign in to access your academic project portal</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">Choose your role and enter your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Role Selection Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student" className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Student</span>
                  </TabsTrigger>
                  <TabsTrigger value="faculty" className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4" />
                    <span>Faculty</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`Enter your ${activeTab} email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={fillDemoCredentials}
                    className="text-red-600 hover:text-red-700"
                  >
                    Use Demo Credentials
                  </Button>
                  <button type="button" className="text-sm text-red-600 hover:text-red-700">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-red-700 hover:bg-red-800 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    `Sign In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p>
                  <strong>Student:</strong> student@student.sacredheart.edu / password123
                </p>
                <p>
                  <strong>Faculty:</strong> faculty@sacredheart.edu / faculty123
                </p>
                <p>
                  <strong>Admin:</strong> admin@sacredheart.edu / admin123
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-green-900">Secure Access</h4>
                <p className="text-xs text-green-700 mt-1">
                  Your login is protected by university security protocols. All data is encrypted and stored securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
