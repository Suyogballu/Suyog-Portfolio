"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Trash2, Eye, Folder, FileImage, Zap, Crown } from "lucide-react"
import { motion } from "framer-motion"
import { useWebsiteContent } from "./admin-dashboard"

interface MediaManagerProps {
  onSave: () => void
}

export default function MediaManager({ onSave }: MediaManagerProps) {
  const { content, updateContent } = useWebsiteContent()
  const [uploadedImages, setUploadedImages] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("uploadedImages")
      return stored ? JSON.parse(stored) : []
    }
    return []
  })
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            url: e.target?.result as string,
            uploadDate: new Date().toISOString(),
          }

          const updatedImages = [...uploadedImages, newImage]
          setUploadedImages(updatedImages)
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages))
          onSave()
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const deleteImage = (id: number) => {
    const updatedImages = uploadedImages.filter((img) => img.id !== id)
    setUploadedImages(updatedImages)
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages))
    onSave()
  }

  const setAsHeroBackground = (imageUrl: string) => {
    updateContent("hero", { backgroundImage: imageUrl })
    onSave()
  }

  const setAsProfileImage = (imageUrl: string) => {
    updateContent("hero", { profileImage: imageUrl })
    updateContent("about", { profileImage: imageUrl })
    onSave()
  }

  const setAsProjectImage = (imageUrl: string, projectId: number) => {
    const updatedProjects = content.highlights.projects.map((project: any) =>
      project.id === projectId ? { ...project, image: imageUrl } : project,
    )
    updateContent("highlights", { projects: updatedProjects })
    onSave()
  }

  const setAsDownloadImage = (imageUrl: string, packId: number) => {
    const updatedPacks = content.downloads.packs.map((pack: any) =>
      pack.id === packId ? { ...pack, image: imageUrl } : pack,
    )
    updateContent("downloads", { packs: updatedPacks })
    onSave()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border-pink-500/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Crown className="w-8 h-8 mr-3 text-pink-400" />🎨 ULTIMATE Media Manager
          </CardTitle>
          <p className="text-gray-300 text-lg">Upload and manage all your images with drag & drop support</p>
        </CardHeader>
      </Card>

      {/* Upload Zone */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Upload className="w-6 h-6 mr-3 text-blue-400" />
            Upload Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragOver ? "border-blue-400 bg-blue-400/10" : "border-gray-600 hover:border-gray-500"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <motion.div animate={{ scale: dragOver ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {dragOver ? "Drop your images here!" : "Drag & Drop Images"}
              </h3>
              <p className="text-gray-400 mb-6">Support for JPG, PNG, GIF, WebP formats</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Image Gallery */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Folder className="w-6 h-6 mr-3 text-green-400" />
            Image Gallery ({uploadedImages.length} images)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedImages.length === 0 ? (
            <div className="text-center py-12">
              <FileImage className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No images uploaded yet</p>
              <p className="text-gray-500">Upload some images to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative bg-gray-700/50 rounded-xl overflow-hidden border border-gray-600 hover:border-blue-400 transition-all duration-300"
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(image.url, "_blank")}
                          className="text-white hover:bg-white/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteImage(image.id)}
                          className="text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-white font-medium text-sm truncate mb-2">{image.name}</h4>
                    <p className="text-gray-400 text-xs mb-3">{formatFileSize(image.size)}</p>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => setAsHeroBackground(image.url)}
                        className="w-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30"
                      >
                        Set as Hero BG
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setAsProfileImage(image.url)}
                        className="w-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30"
                      >
                        Set as Profile
                      </Button>
                    </div>

                    {/* Project Assignment */}
                    {content.highlights?.projects?.length > 0 && (
                      <div className="mt-3">
                        <Label className="text-gray-400 text-xs">Assign to Project:</Label>
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              setAsProjectImage(image.url, Number.parseInt(e.target.value))
                            }
                          }}
                          className="w-full mt-1 bg-gray-700 border border-gray-600 text-white text-xs rounded px-2 py-1"
                        >
                          <option value="">Select Project</option>
                          {content.highlights.projects.map((project: any) => (
                            <option key={project.id} value={project.id}>
                              {project.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Download Pack Assignment */}
                    {content.downloads?.packs?.length > 0 && (
                      <div className="mt-2">
                        <Label className="text-gray-400 text-xs">Assign to Download:</Label>
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              setAsDownloadImage(image.url, Number.parseInt(e.target.value))
                            }
                          }}
                          className="w-full mt-1 bg-gray-700 border border-gray-600 text-white text-xs rounded px-2 py-1"
                        >
                          <option value="">Select Pack</option>
                          {content.downloads.packs.map((pack: any) => (
                            <option key={pack.id} value={pack.id}>
                              {pack.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Assignments */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-400" />
            Current Image Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Hero Section</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Background Image:</span>
                  <span className="text-blue-400">{content.hero?.backgroundImage ? "✅ Set" : "❌ Not Set"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300">Profile Image:</span>
                  <span className="text-purple-400">{content.hero?.profileImage ? "✅ Set" : "❌ Not Set"}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Projects & Downloads</h4>
              <div className="space-y-2">
                {content.highlights?.projects?.map((project: any) => (
                  <div key={project.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                    <span className="text-gray-300 text-sm">{project.title}:</span>
                    <span className="text-green-400 text-sm">{project.image ? "✅" : "❌"}</span>
                  </div>
                ))}
                {content.downloads?.packs?.map((pack: any) => (
                  <div key={pack.id} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                    <span className="text-gray-300 text-sm">{pack.title}:</span>
                    <span className="text-orange-400 text-sm">{pack.image ? "✅" : "❌"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
