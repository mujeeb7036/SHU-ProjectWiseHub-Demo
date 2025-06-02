"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Eye, EyeOff, Shield, Users, Award, User } from "lucide-react"

export default function StudentLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      if (email.endsWith("@student.sacredheart.edu") && password.length >= 6) {
        // Redirect to submission form
        localStorage.setItem("userRole", "student")
        localStorage.setItem("userEmail", email)
        window.location.href = "/student/submit"
      } else {
        setError("Invalid credentials. Please use your Sacred Heart University email.")
      }
      setIsLoading(false)
    }, 1500)
  }

  const isLoggedIn = () => {
    return localStorage.getItem("userRole") === "student" && localStorage.getItem("userEmail")
  }

  const userEmail = localStorage.getItem("userEmail")

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
                <p className="text-red-100 text-sm">Student Project Repository</p>
              </div>
            </div>
            {isLoggedIn() ? (
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
            ) : (
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>University Access</span>
                </div>
              </div>
            )}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to submit your academic projects</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Student Login</CardTitle>
              <CardDescription className="text-center">Use your Sacred Heart University credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">University Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@student.sacredheart.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                  <p className="text-xs text-gray-500">Must be a valid SHU student email address</p>
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
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded" />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="#" className="text-sm text-red-600 hover:text-red-700">
                    Forgot password?
                  </Link>
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
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/student/register" className="text-red-600 hover:text-red-700 font-semibold">
                    Register here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900">Secure Access</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Your login is protected by university security protocols. All submissions are encrypted and stored
                  securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
