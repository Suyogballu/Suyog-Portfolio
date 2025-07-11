"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Shield,
  LogOut,
  Edit,
  Palette,
  Code,
  BarChart,
  Database,
  Download,
  Activity,
  Zap,
  Crown,
  Rocket,
  ImageIcon,
  LinkIcon,
  Star,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import VisualEditor from "./visual-editor"
import ContentManager from "./content-manager"
import StyleEditor from "./style-editor"
import AdvancedEditor from "./advanced-editor"
import AnalyticsDashboard from "./analytics-dashboard"
import BackupManager from "./backup-manager"
import SiteMonitor from "./site-monitor"
import MediaManager from "./media-manager"
import SocialManager from "./social-manager"
import ProjectManager from "./project-manager"
import SkillsManager from "./skills-manager"

interface AdminDashboardProps {
  onLogout: () => void
}

// ULTIMATE Global state for website content using localStorage
export const useWebsiteContent = () => {
  const [content, setContent] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("websiteContent")
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch (error) {
          console.error("Error parsing stored content:", error)
        }
      }
    }
    return {
      hero: {
        title: "Hi, I'm Suyog",
        subtitle:
          "Creative Designer & Developer crafting digital experiences that inspire and engage audiences worldwide",
        primaryButton: "View My Work",
        secondaryButton: "Get In Touch",
        backgroundImage: "",
        profileImage: "",
      },
      about: {
        title: "About Me",
        description:
          "I'm an 18-year-old creative professional passionate about bringing ideas to life through code and design. With a focus on modern technologies and user-centered design, I create digital experiences that make a difference.",
        journey:
          'Started coding at 15, I\'ve been on an incredible journey of learning and creating. From my first "Hello World" to building complex applications, every project has been a stepping stone towards mastering the art of digital creation.',
        yearsOfExperience: 3,
        profileImage: "",
      },
      skills: {
        title: "Skills & Technologies",
        subtitle: "A comprehensive toolkit for bringing creative visions to life",
        categories: [
          {
            id: 1,
            title: "Frontend Development",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
            color: "bg-blue-600",
          },
          {
            id: 2,
            title: "Backend Development",
            skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "Supabase"],
            color: "bg-green-600",
          },
          {
            id: 3,
            title: "Design Tools",
            skills: ["After Effects", "Photoshop", "Figma", "Illustrator", "Premiere Pro"],
            color: "bg-purple-600",
          },
          {
            id: 4,
            title: "Other Skills",
            skills: ["Git", "Docker", "AWS", "Vercel", "API Development", "UI/UX Design"],
            color: "bg-orange-600",
          },
        ],
      },
      highlights: {
        title: "Project Highlights",
        subtitle: "A showcase of my recent work and creative projects",
        projects: [
          {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution with modern UI and secure payment integration",
            image: "",
            tags: ["React", "Node.js", "MongoDB"],
            link: "#",
            featured: true,
          },
          {
            id: 2,
            title: "Motion Graphics Pack",
            description: "Professional After Effects templates for social media content creators",
            image: "",
            tags: ["After Effects", "Motion Design"],
            link: "#",
            featured: false,
          },
        ],
      },
      downloads: {
        title: "Download Center",
        subtitle: "Premium design assets and templates to elevate your creative projects",
        packs: [
          {
            id: 1,
            title: "After Effects CC Pack",
            description: "Professional motion graphics templates and presets for content creators",
            price: "$29.99",
            originalPrice: "$49.99",
            image: "",
            payhipUrl: "https://payhip.com/ae-pack",
            rating: 4.9,
            downloads: 1250,
            featured: true,
            tags: ["After Effects", "Motion Graphics", "Templates"],
            showFakeStats: true,
          },
        ],
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you!",
        email: "suyog@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
      },
      social: {
        platforms: [
          { id: 1, name: "GitHub", url: "https://github.com/suyog", icon: "github", enabled: true },
          { id: 2, name: "LinkedIn", url: "https://linkedin.com/in/suyog", icon: "linkedin", enabled: true },
          { id: 3, name: "Twitter", url: "https://twitter.com/suyog", icon: "twitter", enabled: true },
          { id: 4, name: "Instagram", url: "https://instagram.com/suyog", icon: "instagram", enabled: false },
          { id: 5, name: "TikTok", url: "https://tiktok.com/@suyog", icon: "tiktok", enabled: false },
          { id: 6, name: "YouTube", url: "https://youtube.com/@suyog", icon: "youtube", enabled: false },
          { id: 7, name: "Discord", url: "https://discord.gg/suyog", icon: "discord", enabled: false },
        ],
      },
      styles: {
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        accentColor: "#ec4899",
        backgroundColor: "#111827",
        textColor: "#ffffff",
        fontFamily: "Inter",
      },
    }
  })

  const updateContent = (section: string, data: any) => {
    const newContent = { ...content, [section]: { ...content[section], ...data } }
    setContent(newContent)
    if (typeof window !== "undefined") {
      localStorage.setItem("websiteContent", JSON.stringify(newContent))
      window.dispatchEvent(new CustomEvent("contentUpdated", { detail: newContent }))
    }
  }

  useEffect(() => {
    const handleContentUpdate = (event: any) => {
      setContent(event.detail)
    }

    window.addEventListener("contentUpdated", handleContentUpdate)
    return () => window.removeEventListener("contentUpdated", handleContentUpdate)
  }, [])

  return { content, updateContent }
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("editor")
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const handleAutoSave = () => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            🚀 INITIALIZING BEAST MODE...
          </motion.h2>
          <p className="text-gray-400 text-lg">Loading the most powerful admin dashboard ever created</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* ULTIMATE Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-gray-700/50 bg-gray-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
                className="relative"
              >
                <Crown className="w-12 h-12 text-yellow-400" />
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  🔥 ULTIMATE BEAST ADMIN 🔥
                </h1>
                <p className="text-lg text-gray-400 flex items-center mt-1">
                  <Rocket className="w-5 h-5 mr-2" />
                  Complete Portfolio Control Universe
                  {saveStatus === "saving" && <span className="ml-3 text-blue-400 animate-pulse">💾 Saving...</span>}
                  {saveStatus === "saved" && <span className="ml-3 text-green-400">✅ Saved Successfully</span>}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-gray-400 hover:text-white group bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-6 py-3"
            >
              <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Exit Beast Mode
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* ULTIMATE Tab Navigation */}
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-3 border border-gray-700/50 shadow-2xl">
            <TabsList className="grid w-full grid-cols-12 bg-transparent gap-2 p-0">
              <TabsTrigger
                value="editor"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Edit className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Live Editor</span>
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Media</span>
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Star className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Zap className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Social</span>
              </TabsTrigger>
              <TabsTrigger
                value="styles"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Palette className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Styles</span>
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <FileText className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <BarChart className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="database"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Database className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Database</span>
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Code className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Advanced</span>
              </TabsTrigger>
              <TabsTrigger
                value="backup"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Backup</span>
              </TabsTrigger>
              <TabsTrigger
                value="monitor"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300 rounded-xl py-3"
              >
                <Activity className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Monitor</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="editor">
                <VisualEditor onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="media">
                <MediaManager onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectManager onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsManager onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="social">
                <SocialManager onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="styles">
                <StyleEditor onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="content">
                <ContentManager onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="database">
                <DatabaseManager />
              </TabsContent>

              <TabsContent value="advanced">
                <AdvancedEditor onSave={handleAutoSave} />
              </TabsContent>

              <TabsContent value="backup">
                <BackupManager />
              </TabsContent>

              <TabsContent value="monitor">
                <SiteMonitor />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}

// ENHANCED Database Manager Component
function DatabaseManager() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [importData, setImportData] = useState("")

  const exportData = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const data = {
        websiteContent: localStorage.getItem("websiteContent"),
        adminCredentials: localStorage.getItem("adminCredentials"),
        seoSettings: localStorage.getItem("seoSettings"),
        contactInfo: localStorage.getItem("contactInfo"),
        socialLinks: localStorage.getItem("socialLinks"),
        customSections: localStorage.getItem("customSections"),
        advancedSettings: localStorage.getItem("advancedSettings"),
        systemSettings: localStorage.getItem("systemSettings"),
        timestamp: new Date().toISOString(),
        version: "3.0.0-ULTIMATE-BEAST",
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `suyog-portfolio-ULTIMATE-BEAST-backup-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      setIsProcessing(false)
    }, 1000)
  }

  const importDataHandler = () => {
    if (!importData.trim()) return

    setIsProcessing(true)
    try {
      const parsed = JSON.parse(importData)
      Object.keys(parsed).forEach((key) => {
        if (key !== "timestamp" && key !== "version" && parsed[key]) {
          localStorage.setItem(key, parsed[key])
        }
      })
      setTimeout(() => {
        setIsProcessing(false)
        alert("🚀 ULTIMATE BEAST DATA IMPORTED! Reloading...")
        window.location.reload()
      }, 1500)
    } catch (error) {
      setIsProcessing(false)
      alert("❌ Invalid JSON data. Please check your backup file.")
    }
  }

  const clearAllData = () => {
    if (confirm("⚠️ NUCLEAR WARNING: This will permanently delete ALL portfolio data. Are you absolutely sure?")) {
      if (confirm("🔥 FINAL WARNING: This action cannot be undone. Continue?")) {
        localStorage.clear()
        alert("💥 ALL DATA OBLITERATED! Redirecting...")
        window.location.href = "/"
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-700/30 border-blue-500/40 shadow-xl">
          <CardContent className="p-6 text-center">
            <Database className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <p className="text-blue-300 text-sm font-medium">Storage Used</p>
            <p className="text-3xl font-bold text-white">
              {(JSON.stringify(localStorage).length / 1024).toFixed(2)} KB
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-600/20 to-green-700/30 border-green-500/40 shadow-xl">
          <CardContent className="p-6 text-center">
            <FileText className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p className="text-green-300 text-sm font-medium">Data Items</p>
            <p className="text-3xl font-bold text-white">{Object.keys(localStorage).length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-700/30 border-purple-500/40 shadow-xl">
          <CardContent className="p-6 text-center">
            <Zap className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-purple-300 text-sm font-medium">Performance</p>
            <p className="text-3xl font-bold text-white">BEAST</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-600/20 to-orange-700/30 border-orange-500/40 shadow-xl">
          <CardContent className="p-6 text-center">
            <Shield className="w-10 h-10 text-orange-400 mx-auto mb-3" />
            <p className="text-orange-300 text-sm font-medium">Security</p>
            <p className="text-3xl font-bold text-white">ULTIMATE</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gray-800/60 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl">
              <Download className="w-6 h-6 mr-3 text-blue-400" />🚀 ULTIMATE Export System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-400 text-lg">
              Export your complete portfolio data with military-grade compression and security.
            </p>
            <Button
              onClick={exportData}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-4 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  />
                  Processing Beast Data...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Export ULTIMATE BEAST Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl">
              <Database className="w-6 h-6 mr-3 text-green-400" />🔥 ULTIMATE Import System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-400 text-lg">
              Import portfolio data with quantum-level validation and error handling.
            </p>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              className="w-full h-40 bg-gray-700 border-gray-600 text-white p-4 rounded-xl font-mono text-sm resize-none focus:border-green-400 transition-colors"
              placeholder="Paste your ULTIMATE BEAST backup JSON data here..."
            />
            <Button
              onClick={importDataHandler}
              disabled={!importData.trim() || isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-4 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  />
                  Importing Beast Data...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5 mr-3" />
                  Import ULTIMATE BEAST Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ULTIMATE DANGER ZONE */}
      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-red-500/60 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center text-2xl">
            <Zap className="w-8 h-8 mr-3" />
            ⚠️ NUCLEAR DANGER ZONE ⚠️
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-500/20 border-2 border-red-500/40 rounded-xl p-6">
            <h4 className="text-red-300 font-bold mb-4 text-xl">🔥 TOTAL DATA ANNIHILATION</h4>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              This will permanently delete ALL portfolio data, settings, configurations, images, and everything else.
              This action is IRREVERSIBLE and will destroy the entire universe of your portfolio.
            </p>
            <Button
              onClick={clearAllData}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 text-lg"
            >
              <Zap className="w-5 h-5 mr-3" />
              OBLITERATE EVERYTHING
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
