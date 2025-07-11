"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Palette, Zap, Save, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"
import { useWebsiteContent } from "./admin-dashboard"

export default function StyleEditor() {
  const { content, updateContent } = useWebsiteContent()
  const [activeColorScheme, setActiveColorScheme] = useState("custom")

  const colorSchemes = [
    {
      id: "blue",
      name: "Ocean Blue",
      colors: {
        primary: "#3b82f6",
        secondary: "#1e40af",
        accent: "#06b6d4",
        background: "#0f172a",
        text: "#ffffff",
      },
    },
    {
      id: "purple",
      name: "Cosmic Purple",
      colors: {
        primary: "#8b5cf6",
        secondary: "#7c3aed",
        accent: "#ec4899",
        background: "#1e1b4b",
        text: "#ffffff",
      },
    },
    {
      id: "green",
      name: "Matrix Green",
      colors: {
        primary: "#10b981",
        secondary: "#059669",
        accent: "#34d399",
        background: "#064e3b",
        text: "#ffffff",
      },
    },
    {
      id: "orange",
      name: "Sunset Orange",
      colors: {
        primary: "#f97316",
        secondary: "#ea580c",
        accent: "#fb923c",
        background: "#7c2d12",
        text: "#ffffff",
      },
    },
  ]

  const handleColorChange = (colorType: string, value: string) => {
    updateContent("styles", { [colorType]: value })
  }

  const applyColorScheme = (scheme: any) => {
    updateContent("styles", {
      primaryColor: scheme.colors.primary,
      secondaryColor: scheme.colors.secondary,
      accentColor: scheme.colors.accent,
      backgroundColor: scheme.colors.background,
      textColor: scheme.colors.text,
    })
    setActiveColorScheme(scheme.id)
  }

  const fonts = ["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans", "Lato", "Source Sans Pro", "Nunito"]

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Style Controls */}
      <div className="space-y-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Color Schemes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => (
                <motion.div
                  key={scheme.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    activeColorScheme === scheme.id
                      ? "border-blue-400 bg-blue-400/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  onClick={() => applyColorScheme(scheme)}
                >
                  <div className="flex space-x-1 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: scheme.colors.primary }} />
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: scheme.colors.secondary }} />
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: scheme.colors.accent }} />
                  </div>
                  <p className="text-white text-sm font-medium">{scheme.name}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Custom Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Primary Color</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    type="color"
                    value={content.styles?.primaryColor || "#3b82f6"}
                    onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                    className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                  />
                  <Input
                    type="text"
                    value={content.styles?.primaryColor || "#3b82f6"}
                    onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                    className="flex-1 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Secondary Color</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    type="color"
                    value={content.styles?.secondaryColor || "#8b5cf6"}
                    onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                    className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                  />
                  <Input
                    type="text"
                    value={content.styles?.secondaryColor || "#8b5cf6"}
                    onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                    className="flex-1 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Accent Color</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    type="color"
                    value={content.styles?.accentColor || "#ec4899"}
                    onChange={(e) => handleColorChange("accentColor", e.target.value)}
                    className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                  />
                  <Input
                    type="text"
                    value={content.styles?.accentColor || "#ec4899"}
                    onChange={(e) => handleColorChange("accentColor", e.target.value)}
                    className="flex-1 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Background</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    type="color"
                    value={content.styles?.backgroundColor || "#111827"}
                    onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                    className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                  />
                  <Input
                    type="text"
                    value={content.styles?.backgroundColor || "#111827"}
                    onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                    className="flex-1 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Font Family</Label>
              <select
                className="w-full mt-2 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-400 transition-colors"
                value={content.styles?.fontFamily || "Inter"}
                onChange={(e) => handleColorChange("fontFamily", e.target.value)}
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-gray-300">Font Size Scale</Label>
              <Slider defaultValue={[100]} max={150} min={75} step={5} className="mt-3" />
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500">
            <Save className="w-4 h-4 mr-2" />
            Apply Styles
          </Button>
          <Button variant="outline" className="border-gray-600 bg-transparent hover:bg-gray-700">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Style Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: content.styles?.backgroundColor || "#111827",
                fontFamily: content.styles?.fontFamily || "Inter",
              }}
            >
              <motion.h1
                className="text-3xl font-bold mb-4"
                style={{ color: content.styles?.textColor || "#ffffff" }}
                animate={{
                  background: `linear-gradient(45deg, ${content.styles?.primaryColor || "#3b82f6"}, ${content.styles?.secondaryColor || "#8b5cf6"})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Suyog's Portfolio
              </motion.h1>

              <p className="text-gray-400 mb-6">This is how your content will look with the selected styles.</p>

              <div className="flex space-x-3 mb-6">
                <Button
                  style={{ backgroundColor: content.styles?.primaryColor || "#3b82f6" }}
                  className="hover:opacity-90"
                >
                  Primary Button
                </Button>
                <Button
                  style={{ backgroundColor: content.styles?.secondaryColor || "#8b5cf6" }}
                  className="hover:opacity-90"
                >
                  Secondary Button
                </Button>
              </div>

              <div
                className="p-4 rounded-lg mb-4"
                style={{ backgroundColor: `${content.styles?.accentColor || "#ec4899"}20` }}
              >
                <h3 className="font-semibold mb-2" style={{ color: content.styles?.accentColor || "#ec4899" }}>
                  Accent Color Example
                </h3>
                <p className="text-gray-400 text-sm">
                  This shows how accent colors will appear in cards and highlights.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 rounded" style={{ backgroundColor: content.styles?.primaryColor || "#3b82f6" }} />
                <div className="h-8 rounded" style={{ backgroundColor: content.styles?.secondaryColor || "#8b5cf6" }} />
                <div className="h-8 rounded" style={{ backgroundColor: content.styles?.accentColor || "#ec4899" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Animation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Animation Speed</Label>
              <Slider defaultValue={[100]} max={200} min={50} step={10} className="mt-3" />
            </div>

            <div>
              <Label className="text-gray-300">Hover Effects</Label>
              <select className="w-full mt-2 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option>Subtle Scale</option>
                <option>Glow Effect</option>
                <option>Rotate</option>
                <option>Bounce</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600" />
                <span className="text-gray-300">Parallax Scrolling</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600" />
                <span className="text-gray-300">Floating Particles</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                <span className="text-gray-300">Typing Animation</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
