"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Code,
  Globe,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Save,
  Plus,
  Trash2,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AdvancedEditor() {
  const [loading, setLoading] = useState(false)

  const [seoSettings, setSeoSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("seoSettings")
      if (stored) return JSON.parse(stored)
    }
    return {
      title: "Suyog's Portfolio",
      description: "Creative Designer & Developer Portfolio",
      keywords: "design, development, portfolio, creative",
      ogImage: "",
      favicon: "",
    }
  })

  const [contactInfo, setContactInfo] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("contactInfo")
      if (stored) return JSON.parse(stored)
    }
    return {
      email: "suyog@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      availability: "Available for freelance",
    }
  })

  const [socialLinks, setSocialLinks] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("socialLinks")
      if (stored) return JSON.parse(stored)
    }
    return {
      github: "https://github.com/suyog",
      linkedin: "https://linkedin.com/in/suyog",
      twitter: "https://twitter.com/suyog",
      instagram: "https://instagram.com/suyog",
      youtube: "https://youtube.com/@suyog",
    }
  })

  const [customSections, setCustomSections] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("customSections")
      if (stored) return JSON.parse(stored)
    }
    return [
      { id: 1, title: "Services", content: "Web Development, UI/UX Design", enabled: true },
      { id: 2, title: "Testimonials", content: "Client testimonials and reviews", enabled: false },
      { id: 3, title: "Blog", content: "Latest articles and insights", enabled: false },
    ]
  })

  const [advancedSettings, setAdvancedSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("advancedSettings")
      if (stored) return JSON.parse(stored)
    }
    return {
      enableAnimations: true,
      enableParticles: true,
      enableSmoothScroll: true,
      enableDarkMode: true,
      enableAnalytics: false,
      enableChatWidget: false,
      maintenanceMode: false,
      enableComments: false,
    }
  })

  const saveToLocalStorage = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  const handleSaveSEO = async () => {
    setLoading(true)
    saveToLocalStorage("seoSettings", seoSettings)
    setTimeout(() => setLoading(false), 500)
  }

  const handleSaveContact = async () => {
    setLoading(true)
    saveToLocalStorage("contactInfo", contactInfo)
    setTimeout(() => setLoading(false), 500)
  }

  const handleSaveSocial = async () => {
    setLoading(true)
    saveToLocalStorage("socialLinks", socialLinks)
    setTimeout(() => setLoading(false), 500)
  }

  const handleSaveAdvanced = async () => {
    setLoading(true)
    saveToLocalStorage("advancedSettings", advancedSettings)
    setTimeout(() => setLoading(false), 500)
  }

  const addCustomSection = () => {
    const newSection = {
      id: Date.now(),
      title: "New Section",
      content: "Section content",
      enabled: true,
    }
    const newSections = [...customSections, newSection]
    setCustomSections(newSections)
    saveToLocalStorage("customSections", newSections)
  }

  const removeCustomSection = (id: number) => {
    const newSections = customSections.filter((section) => section.id !== id)
    setCustomSections(newSections)
    saveToLocalStorage("customSections", newSections)
  }

  const updateCustomSection = (id: number, field: string, value: any) => {
    const newSections = customSections.map((section) => (section.id === id ? { ...section, [field]: value } : section))
    setCustomSections(newSections)
    saveToLocalStorage("customSections", newSections)
  }

  // Rest of the component remains the same...
  return (
    <div className="space-y-6">
      {/* SEO Settings - same JSX */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              SEO & Meta Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Page Title</Label>
              <Input
                value={seoSettings.title}
                onChange={(e) => setSeoSettings({ ...seoSettings, title: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Your portfolio title"
              />
            </div>

            <div>
              <Label className="text-gray-300">Meta Description</Label>
              <Textarea
                value={seoSettings.description}
                onChange={(e) => setSeoSettings({ ...seoSettings, description: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Brief description for search engines"
              />
            </div>

            <div>
              <Label className="text-gray-300">Keywords</Label>
              <Input
                value={seoSettings.keywords}
                onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div>
              <Label className="text-gray-300">Open Graph Image URL</Label>
              <Input
                value={seoSettings.ogImage}
                onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="https://example.com/og-image.jpg"
              />
            </div>

            <Button onClick={handleSaveSEO} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save SEO Settings
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information - same JSX */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email Address
              </Label>
              <Input
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                type="email"
              />
            </div>

            <div>
              <Label className="text-gray-300 flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone Number
              </Label>
              <Input
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </Label>
              <Input
                value={contactInfo.location}
                onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300">Availability Status</Label>
              <Input
                value={contactInfo.availability}
                onChange={(e) => setContactInfo({ ...contactInfo, availability: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Available for freelance"
              />
            </div>

            <Button onClick={handleSaveContact} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Contact Info
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Links */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-300 flex items-center">
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </Label>
              <Input
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300 flex items-center">
                <Linkedin className="w-4 h-4 mr-1" />
                LinkedIn
              </Label>
              <Input
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300 flex items-center">
                <Twitter className="w-4 h-4 mr-1" />
                Twitter
              </Label>
              <Input
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300 flex items-center">
                <Instagram className="w-4 h-4 mr-1" />
                Instagram
              </Label>
              <Input
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-300 flex items-center">
                <Youtube className="w-4 h-4 mr-1" />
                YouTube
              </Label>
              <Input
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
              />
            </div>
          </div>

          <Button onClick={handleSaveSocial} disabled={loading} className="mt-4 bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save Social Links
          </Button>
        </CardContent>
      </Card>

      {/* Custom Sections */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Custom Sections</CardTitle>
            <Button onClick={addCustomSection} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-1" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={section.enabled}
                      onCheckedChange={(checked) => updateCustomSection(section.id, "enabled", checked)}
                    />
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                      className="bg-gray-600 border-gray-500 text-white w-48"
                    />
                  </div>
                  <Button onClick={() => removeCustomSection(section.id)} size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                  className="bg-gray-600 border-gray-500 text-white"
                  placeholder="Section content..."
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Visual Effects</h3>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Enable Animations</Label>
                <Switch
                  checked={advancedSettings.enableAnimations}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, enableAnimations: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Floating Particles</Label>
                <Switch
                  checked={advancedSettings.enableParticles}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, enableParticles: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Smooth Scrolling</Label>
                <Switch
                  checked={advancedSettings.enableSmoothScroll}
                  onCheckedChange={(checked) =>
                    setAdvancedSettings({ ...advancedSettings, enableSmoothScroll: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Dark Mode</Label>
                <Switch
                  checked={advancedSettings.enableDarkMode}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, enableDarkMode: checked })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Features</h3>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Google Analytics</Label>
                <Switch
                  checked={advancedSettings.enableAnalytics}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, enableAnalytics: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Chat Widget</Label>
                <Switch
                  checked={advancedSettings.enableChatWidget}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, enableChatWidget: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Comments System</Label>
                <Switch
                  checked={advancedSettings.enableComments}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, enableComments: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Maintenance Mode</Label>
                <Switch
                  checked={advancedSettings.maintenanceMode}
                  onCheckedChange={(checked) => setAdvancedSettings({ ...advancedSettings, maintenanceMode: checked })}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSaveAdvanced}
            disabled={loading}
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Advanced Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
