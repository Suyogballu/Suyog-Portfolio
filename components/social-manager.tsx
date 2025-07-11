"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Trash2,
  LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Crown,
  Zap,
  ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"
import { useWebsiteContent } from "./admin-dashboard"

interface SocialManagerProps {
  onSave: () => void
}

const socialIcons: { [key: string]: any } = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  discord: MessageCircle,
  tiktok: MessageCircle,
  facebook: MessageCircle,
  twitch: MessageCircle,
  reddit: MessageCircle,
}

const socialColors: { [key: string]: string } = {
  github: "from-gray-600 to-gray-700",
  linkedin: "from-blue-600 to-blue-700",
  twitter: "from-sky-500 to-sky-600",
  instagram: "from-pink-500 to-purple-600",
  youtube: "from-red-500 to-red-600",
  discord: "from-indigo-500 to-purple-600",
  tiktok: "from-black to-gray-800",
  facebook: "from-blue-600 to-blue-800",
  twitch: "from-purple-500 to-purple-700",
  reddit: "from-orange-500 to-red-600",
}

export default function SocialManager({ onSave }: SocialManagerProps) {
  const { content, updateContent } = useWebsiteContent()
  const [newPlatform, setNewPlatform] = useState({ name: "", url: "", icon: "github" })

  const updateSocialPlatform = (id: number, field: string, value: any) => {
    const updatedPlatforms = content.social.platforms.map((platform: any) =>
      platform.id === id ? { ...platform, [field]: value } : platform,
    )
    updateContent("social", { platforms: updatedPlatforms })
    onSave()
  }

  const addSocialPlatform = () => {
    if (!newPlatform.name || !newPlatform.url) return

    const newId = Math.max(...content.social.platforms.map((p: any) => p.id), 0) + 1
    const updatedPlatforms = [
      ...content.social.platforms,
      {
        id: newId,
        name: newPlatform.name,
        url: newPlatform.url,
        icon: newPlatform.icon,
        enabled: true,
      },
    ]
    updateContent("social", { platforms: updatedPlatforms })
    setNewPlatform({ name: "", url: "", icon: "github" })
    onSave()
  }

  const removeSocialPlatform = (id: number) => {
    const updatedPlatforms = content.social.platforms.filter((platform: any) => platform.id !== id)
    updateContent("social", { platforms: updatedPlatforms })
    onSave()
  }

  const availableIcons = Object.keys(socialIcons)

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-500/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Crown className="w-8 h-8 mr-3 text-violet-400" />🔗 ULTIMATE Social Media Manager
          </CardTitle>
          <p className="text-gray-300 text-lg">Manage all your social media links and visibility</p>
        </CardHeader>
      </Card>

      {/* Add New Platform */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="w-6 h-6 mr-3 text-green-400" />
            Add New Social Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label className="text-gray-300 font-semibold">Platform Name</Label>
              <Input
                value={newPlatform.name}
                onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                placeholder="e.g., TikTok"
                className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
              />
            </div>
            <div>
              <Label className="text-gray-300 font-semibold">URL</Label>
              <Input
                value={newPlatform.url}
                onChange={(e) => setNewPlatform({ ...newPlatform, url: e.target.value })}
                placeholder="https://tiktok.com/@username"
                className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
              />
            </div>
            <div>
              <Label className="text-gray-300 font-semibold">Icon</Label>
              <select
                value={newPlatform.icon}
                onChange={(e) => setNewPlatform({ ...newPlatform, icon: e.target.value })}
                className="w-full mt-2 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-green-400"
              >
                {availableIcons.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon.charAt(0).toUpperCase() + icon.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={addSocialPlatform}
                disabled={!newPlatform.name || !newPlatform.url}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Platform
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Social Platforms */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <LinkIcon className="w-6 h-6 mr-3 text-blue-400" />
            Current Social Platforms ({content.social?.platforms?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {content.social?.platforms?.map((platform: any) => {
              const IconComponent = socialIcons[platform.icon] || LinkIcon
              const colorClass = socialColors[platform.icon] || "from-gray-600 to-gray-700"

              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    platform.enabled
                      ? "border-green-500/50 bg-gradient-to-r " + colorClass + "/20"
                      : "border-gray-600 bg-gray-700/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg">{platform.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={platform.enabled}
                        onCheckedChange={(checked) => updateSocialPlatform(platform.id, "enabled", checked)}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSocialPlatform(platform.id)}
                        className="text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300 text-sm">Platform Name</Label>
                      <Input
                        value={platform.name}
                        onChange={(e) => updateSocialPlatform(platform.id, "name", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">URL</Label>
                      <div className="flex mt-1">
                        <Input
                          value={platform.url}
                          onChange={(e) => updateSocialPlatform(platform.id, "url", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white rounded-r-none"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(platform.url, "_blank")}
                          className="border-gray-600 bg-gray-700 hover:bg-gray-600 rounded-l-none"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">Icon</Label>
                      <select
                        value={platform.icon}
                        onChange={(e) => updateSocialPlatform(platform.id, "icon", e.target.value)}
                        className="w-full mt-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2"
                      >
                        {availableIcons.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon.charAt(0).toUpperCase() + icon.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300 text-sm">Status:</span>
                      <span className={`font-semibold ${platform.enabled ? "text-green-400" : "text-red-400"}`}>
                        {platform.enabled ? "✅ Visible" : "❌ Hidden"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {(!content.social?.platforms || content.social.platforms.length === 0) && (
            <div className="text-center py-12">
              <LinkIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No social platforms added yet</p>
              <p className="text-gray-500">Add your first social media link above</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-400" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-xl border border-gray-600">
            <h3 className="text-white font-semibold mb-4 text-center">Social Media Links</h3>
            <div className="flex justify-center space-x-4 flex-wrap gap-2">
              {content.social?.platforms
                ?.filter((platform: any) => platform.enabled)
                ?.map((platform: any) => {
                  const IconComponent = socialIcons[platform.icon] || LinkIcon
                  const colorClass = socialColors[platform.icon] || "from-gray-600 to-gray-700"

                  return (
                    <motion.a
                      key={platform.id}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-gradient-to-r ${colorClass} hover:scale-110 transition-all duration-300 shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </motion.a>
                  )
                })}
            </div>
            {!content.social?.platforms?.some((p: any) => p.enabled) && (
              <p className="text-gray-400 text-center">No enabled social platforms to display</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
