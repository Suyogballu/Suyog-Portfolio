"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Star, ExternalLink, ImageIcon, Crown, Edit, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useWebsiteContent } from "./admin-dashboard"

interface ProjectManagerProps {
  onSave: () => void
}

export default function ProjectManager({ onSave }: ProjectManagerProps) {
  const { content, updateContent } = useWebsiteContent()
  const [editingProject, setEditingProject] = useState<any>(null)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    link: "",
    featured: false,
  })

  const updateProject = (id: number, field: string, value: any) => {
    const updatedProjects = content.highlights.projects.map((project: any) =>
      project.id === id ? { ...project, [field]: value } : project,
    )
    updateContent("highlights", { projects: updatedProjects })
    onSave()
  }

  const addProject = () => {
    if (!newProject.title || !newProject.description) return

    const newId = Math.max(...content.highlights.projects.map((p: any) => p.id), 0) + 1
    const updatedProjects = [
      ...content.highlights.projects,
      {
        id: newId,
        title: newProject.title,
        description: newProject.description,
        image: newProject.image,
        tags: newProject.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        link: newProject.link,
        featured: newProject.featured,
      },
    ]
    updateContent("highlights", { projects: updatedProjects })
    setNewProject({
      title: "",
      description: "",
      image: "",
      tags: "",
      link: "",
      featured: false,
    })
    onSave()
  }

  const removeProject = (id: number) => {
    const updatedProjects = content.highlights.projects.filter((project: any) => project.id !== id)
    updateContent("highlights", { projects: updatedProjects })
    onSave()
  }

  const updateProjectTags = (id: number, tagsString: string) => {
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    updateProject(id, "tags", tags)
  }

  const getUploadedImages = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("uploadedImages")
      return stored ? JSON.parse(stored) : []
    }
    return []
  }

  const uploadedImages = getUploadedImages()

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Crown className="w-8 h-8 mr-3 text-indigo-400" />⭐ ULTIMATE Project Manager
          </CardTitle>
          <p className="text-gray-300 text-lg">Manage your project highlights and portfolio showcase</p>
        </CardHeader>
      </Card>

      {/* Section Settings */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Edit className="w-6 h-6 mr-3 text-blue-400" />
            Section Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300 font-semibold">Section Title</Label>
            <Input
              value={content.highlights?.title || ""}
              onChange={(e) => updateContent("highlights", { title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-blue-400"
              placeholder="e.g., Project Highlights"
            />
          </div>
          <div>
            <Label className="text-gray-300 font-semibold">Section Subtitle</Label>
            <Textarea
              value={content.highlights?.subtitle || ""}
              onChange={(e) => updateContent("highlights", { subtitle: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-blue-400"
              placeholder="Brief description of your projects section"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add New Project */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="w-6 h-6 mr-3 text-green-400" />
            Add New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 font-semibold">Project Title</Label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g., E-Commerce Platform"
                  className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
                />
              </div>
              <div>
                <Label className="text-gray-300 font-semibold">Description</Label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief description of your project"
                  className="bg-gray-700 border-gray-600 text-white mt-2 h-24 focus:border-green-400"
                />
              </div>
              <div>
                <Label className="text-gray-300 font-semibold">Tags (comma separated)</Label>
                <Input
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 font-semibold">Project Link</Label>
                <Input
                  value={newProject.link}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  placeholder="https://github.com/username/project"
                  className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
                />
              </div>

              <div>
                <Label className="text-gray-300 font-semibold">Project Image</Label>
                {uploadedImages.length > 0 ? (
                  <select
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full mt-2 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-green-400"
                  >
                    <option value="">Select an image</option>
                    {uploadedImages.map((image: any) => (
                      <option key={image.id} value={image.url}>
                        {image.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-2 p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-center">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No images uploaded yet</p>
                    <p className="text-gray-500 text-xs">Go to Media tab to upload images</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Switch
                  checked={newProject.featured}
                  onCheckedChange={(checked) => setNewProject({ ...newProject, featured: checked })}
                />
                <Label className="text-gray-300">Featured Project</Label>
              </div>

              <Button
                onClick={addProject}
                disabled={!newProject.title || !newProject.description}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Projects */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-400" />
            Current Projects ({content.highlights?.projects?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!content.highlights?.projects || content.highlights.projects.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No projects added yet</p>
              <p className="text-gray-500">Add your first project above</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {content.highlights.projects.map((project: any) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/50 rounded-xl border border-gray-600 overflow-hidden hover:border-blue-400 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gray-800">
                    {project.image ? (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-500 text-black">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <Label className="text-gray-300 text-sm">Title</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(project.id, "title", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-1 h-20"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">Tags</Label>
                      <Input
                        value={project.tags?.join(", ") || ""}
                        onChange={(e) => updateProjectTags(project.id, e.target.value)}
                        placeholder="React, Node.js, MongoDB"
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                      />
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags?.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-gray-600 text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">Project Link</Label>
                      <div className="flex mt-1">
                        <Input
                          value={project.link}
                          onChange={(e) => updateProject(project.id, "link", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white rounded-r-none"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(project.link, "_blank")}
                          className="border-gray-600 bg-gray-700 hover:bg-gray-600 rounded-l-none"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300 text-sm">Image</Label>
                      <select
                        value={project.image || ""}
                        onChange={(e) => updateProject(project.id, "image", e.target.value)}
                        className="w-full mt-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2"
                      >
                        <option value="">No image</option>
                        {uploadedImages.map((image: any) => (
                          <option key={image.id} value={image.url}>
                            {image.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={project.featured}
                          onCheckedChange={(checked) => updateProject(project.id, "featured", checked)}
                        />
                        <Label className="text-gray-300 text-sm">Featured</Label>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeProject(project.id)}
                        className="text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="w-6 h-6 mr-3 text-green-400" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-xl border border-gray-600">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {content.highlights?.title || "Project Highlights"}
              </h2>
              <p className="text-gray-300">{content.highlights?.subtitle || "A showcase of my recent work"}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {content.highlights?.projects?.slice(0, 4).map((project: any) => (
                <div key={project.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                  <div className="h-32 bg-gray-700 relative">
                    {project.image ? (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-black text-xs">
                          <Star className="w-2 h-2 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 3).map((tag: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(!content.highlights?.projects || content.highlights.projects.length === 0) && (
              <p className="text-gray-400 text-center">No projects to display</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
