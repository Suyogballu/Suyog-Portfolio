"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, ArrowLeft, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [storedCredentials, setStoredCredentials] = useState<{ username: string; password: string } | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("adminCredentials")
    if (stored) {
      setStoredCredentials(JSON.parse(stored))
    }

    const isAuthenticated = localStorage.getItem("isAdminAuthenticated")
    if (isAuthenticated === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (!storedCredentials) {
      if (credentials.username && credentials.password) {
        localStorage.setItem("adminCredentials", JSON.stringify(credentials))
        localStorage.setItem("isAdminAuthenticated", "true")
        setStoredCredentials(credentials)
        setIsLoggedIn(true)
      } else {
        setError("Please enter both username and password")
      }
    } else {
      if (credentials.username === storedCredentials.username && credentials.password === storedCredentials.password) {
        localStorage.setItem("isAdminAuthenticated", "true")
        setIsLoggedIn(true)
      } else {
        setError("Invalid credentials")
      }
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated")
    setIsLoggedIn(false)
    setCredentials({ username: "", password: "" })
  }

  if (isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
              "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white mb-6 group"
          onClick={() => (window.location.href = "/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Universe
        </Button>

        <Card className="bg-gray-800/80 border-2 border-blue-500/30 backdrop-blur-xl relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />

          <CardHeader className="text-center relative z-10">
            <motion.div
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotateY: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
              className="mb-4"
            >
              <Shield className="w-16 h-16 text-blue-400 mx-auto" />
            </motion.div>

            <CardTitle className="text-3xl text-white mb-2">
              {storedCredentials ? "Admin Access" : "Initialize Admin"}
            </CardTitle>
            <motion.p
              className="text-gray-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {storedCredentials ? "Enter the matrix" : "Create your admin credentials"}
            </motion.p>
          </CardHeader>

          <CardContent className="relative z-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Label htmlFor="username" className="text-gray-300 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="bg-gray-700/80 border-gray-600 text-white mt-2 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>

              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="password" className="text-gray-300 font-medium">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="bg-gray-700/80 border-gray-600 text-white pr-12 focus:border-blue-400 transition-colors"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Lock className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Accessing..." : storedCredentials ? "Enter Admin Zone" : "Initialize System"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
