"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input, Textarea } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Layout,
  Save,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  ImageIcon,
  Zap,
  Rocket,
  Crown,
  User,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"
import { useWebsiteContent } from "./admin-dashboard"

interface VisualEditorProps {
  onSave: () => void
}

export default function VisualEditor({ onSave }: VisualEditorProps) {
  const { content, updateContent } = useWebsiteContent()
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [activeSection, setActiveSection] = useState("hero")

  const handleContentUpdate = (section: string, field: string, value: string) => {
    updateContent(section, { [field]: value })
    onSave()
  }

  const sections = [
    { id: "hero", name: "Hero Section", icon: Rocket, color: "from-blue-500 to-cyan-500" },
    { id: "about", name: "About Me", icon: User, color: "from-purple-500 to-pink-500" },
    { id: "skills", name: "Skills", icon: Zap, color: "from-green-500 to-emerald-500" },
    { id: "highlights", name: "Highlights", icon: ImageIcon, color: "from-orange-500 to-red-500" },
    { id: "downloads", name: "Downloads", icon: Layout, color: "from-indigo-500 to-purple-500" },
    { id: "contact", name: "Contact", icon: Crown, color: "from-yellow-500 to-orange-500" },
  ]

  const getUploadedImages = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("uploadedImages")
      return stored ? JSON.parse(stored) : []
    }
    return []
  }

  const uploadedImages = getUploadedImages()

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* ULTIMATE Editor Panel */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl">
              <Crown className="w-6 h-6 mr-3 text-blue-400" />🚀 ULTIMATE Content Editor
            </CardTitle>
            <p className="text-gray-400">Edit every aspect of your portfolio</p>
          </CardHeader>
          <CardContent>
            {/* ENHANCED Section Selector */}
            <div className="mb-6">
              <Label className="text-gray-300 mb-4 block font-bold text-lg">Edit Section</Label>
              <div className="grid grid-cols-1 gap-3">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    size="lg"
                    onClick={() => setActiveSection(section.id)}
                    className={`${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} hover:opacity-90 text-white shadow-xl border-0`
                        : "border-gray-600 bg-gray-700/30 hover:bg-gray-600/50 text-gray-300"
                    } transition-all duration-300 justify-start h-14 text-base font-semibold`}
                  >
                    <section.icon className="w-5 h-5 mr-3" />
                    {section.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* ULTIMATE Content Editors */}
            <div className="space-y-6">
              {activeSection === "hero" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">🎯 Hero Title</Label>
                    <Input
                      value={content.hero?.title || ""}
                      onChange={(e) => handleContentUpdate("hero", "title", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-blue-400 transition-colors text-lg p-4"
                      placeholder="Your amazing hero title"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📝 Subtitle</Label>
                    <Textarea
                      value={content.hero?.subtitle || ""}
                      onChange={(e) => handleContentUpdate("hero", "subtitle", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-blue-400 transition-colors h-32 text-base"
                      placeholder="Describe what makes you awesome"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 font-bold mb-2 block">🔥 Primary Button</Label>
                      <Input
                        value={content.hero?.primaryButton || ""}
                        onChange={(e) => handleContentUpdate("hero", "primaryButton", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-400"
                        placeholder="Button text"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 font-bold mb-2 block">💫 Secondary Button</Label>
                      <Input
                        value={content.hero?.secondaryButton || ""}
                        onChange={(e) => handleContentUpdate("hero", "secondaryButton", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-400"
                        placeholder="Button text"
                      />
                    </div>
                  </div>

                  {/* Image Selection */}
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">🖼️ Background Image</Label>
                    <select
                      value={content.hero?.backgroundImage || ""}
                      onChange={(e) => handleContentUpdate("hero", "backgroundImage", e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-blue-400"
                    >
                      <option value="">No background image</option>
                      {uploadedImages.map((image: any) => (
                        <option key={image.id} value={image.url}>
                          {image.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">👤 Profile Image</Label>
                    <select
                      value={content.hero?.profileImage || ""}
                      onChange={(e) => handleContentUpdate("hero", "profileImage", e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-blue-400"
                    >
                      <option value="">No profile image</option>
                      {uploadedImages.map((image: any) => (
                        <option key={image.id} value={image.url}>
                          {image.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {activeSection === "about" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📋 Section Title</Label>
                    <Input
                      value={content.about?.title || ""}
                      onChange={(e) => handleContentUpdate("about", "title", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 text-lg p-4"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📖 Description</Label>
                    <Textarea
                      value={content.about?.description || ""}
                      onChange={(e) => handleContentUpdate("about", "description", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 h-40"
                      placeholder="Tell your story..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">🚀 Journey Story</Label>
                    <Textarea
                      value={content.about?.journey || ""}
                      onChange={(e) => handleContentUpdate("about", "journey", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 h-40"
                      placeholder="Your coding journey..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">⏰ Years of Experience</Label>
                    <Input
                      type="number"
                      value={content.about?.yearsOfExperience || 0}
                      onChange={(e) => handleContentUpdate("about", "yearsOfExperience", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-purple-400 text-lg p-4"
                      min="0"
                      max="50"
                    />
                  </div>
                </motion.div>
              )}

              {activeSection === "contact" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📧 Contact Title</Label>
                    <Input
                      value={content.contact?.title || ""}
                      onChange={(e) => handleContentUpdate("contact", "title", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-yellow-400 text-lg p-4"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">💬 Contact Description</Label>
                    <Textarea
                      value={content.contact?.subtitle || ""}
                      onChange={(e) => handleContentUpdate("contact", "subtitle", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-yellow-400 h-32"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📧 Email Address</Label>
                    <Input
                      type="email"
                      value={content.contact?.email || ""}
                      onChange={(e) => handleContentUpdate("contact", "email", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-yellow-400 text-lg p-4"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📱 Phone Number</Label>
                    <Input
                      value={content.contact?.phone || ""}
                      onChange={(e) => handleContentUpdate("contact", "phone", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-yellow-400 text-lg p-4"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 font-bold text-lg mb-2 block">📍 Location</Label>
                    <Input
                      value={content.contact?.location || ""}
                      onChange={(e) => handleContentUpdate("contact", "location", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white focus:border-yellow-400 text-lg p-4"
                      placeholder="City, Country"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex space-x-3 mt-8">
              <Button
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-xl py-4 text-lg font-bold"
                onClick={onSave}
              >
                <Save className="w-5 h-5 mr-2" />💾 Save Changes
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 bg-transparent hover:bg-gray-700 py-4"
                onClick={() => window.open("/portfolio", "_blank")}
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ULTIMATE Preview Panel */}
      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 shadow-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center text-xl">
                <Eye className="w-6 h-6 mr-3 text-green-400" />🔥 ULTIMATE Live Preview
              </CardTitle>
              <div className="flex space-x-3">
                <Button
                  variant={previewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                  className={previewMode === "desktop" ? "bg-blue-600" : ""}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("tablet")}
                  className={previewMode === "tablet" ? "bg-blue-600" : ""}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                  className={previewMode === "mobile" ? "bg-blue-600" : ""}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`mx-auto bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl border-2 border-gray-700 ${
                previewMode === "desktop" ? "w-full" : previewMode === "tablet" ? "w-3/4" : "w-80"
              }`}
            >
              <div className="h-[600px] p-8 space-y-8 overflow-y-auto custom-scrollbar">
                {/* ULTIMATE Hero Preview */}
                <motion.div
                  className="text-center relative overflow-hidden rounded-2xl"
                  style={{
                    backgroundImage: content.hero?.backgroundImage ? `url(${content.hero.backgroundImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl" />
                  <div className="relative z-10 p-8">
                    {content.hero?.profileImage && (
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                        <img
                          src={content.hero.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {content.hero?.title || "Hi, I'm Suyog"}
                    </h1>
                    <p className="text-gray-300 text-base mb-8 leading-relaxed max-w-2xl mx-auto">
                      {content.hero?.subtitle || "Creative Designer & Developer"}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3">
                        {content.hero?.primaryButton || "View My Work"}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-gray-400 text-gray-300 px-6 py-3 bg-transparent"
                      >
                        {content.hero?.secondaryButton || "Get In Touch"}
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* ULTIMATE About Preview */}
                <div className="p-8 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-2xl border border-gray-600/50 backdrop-blur-sm">
                  <h3 className="text-white font-bold mb-4 text-2xl">{content.about?.title || "About Me"}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 text-base leading-relaxed mb-4">
                        {content.about?.description?.substring(0, 200) ||
                          "Passionate about creating amazing experiences..."}
                        {content.about?.description && content.about.description.length > 200 && "..."}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {content.about?.journey?.substring(0, 150) || "My journey started..."}
                        {content.about?.journey && content.about.journey.length > 150 && "..."}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-block p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                        <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-purple-300 text-sm">Experience</p>
                        <p className="text-3xl font-bold text-white">{content.about?.yearsOfExperience || 0}+ Years</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Preview */}
                <div className="p-8 bg-gradient-to-r from-yellow-800/30 to-orange-800/30 rounded-2xl border border-yellow-600/30">
                  <h3 className="text-white font-bold mb-4 text-2xl">{content.contact?.title || "Contact"}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {content.contact?.subtitle?.substring(0, 150) || "Let's work together..."}
                    {content.contact?.subtitle && content.contact.subtitle.length > 150 && "..."}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">{content.contact?.email || "email@example.com"}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-semibold">{content.contact?.phone || "+1 (555) 123-4567"}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-semibold">{content.contact?.location || "City, Country"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
