"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Zap, Crown, Edit, Eye, Code } from "lucide-react"
import { motion } from "framer-motion"
import { useWebsiteContent } from "./admin-dashboard"

interface SkillsManagerProps {
  onSave: () => void
}

const colorOptions = [
  { name: "Blue", value: "bg-blue-600", preview: "from-blue-500 to-blue-600" },
  { name: "Green", value: "bg-green-600", preview: "from-green-500 to-green-600" },
  { name: "Purple", value: "bg-purple-600", preview: "from-purple-500 to-purple-600" },
  { name: "Orange", value: "bg-orange-600", preview: "from-orange-500 to-orange-600" },
  { name: "Red", value: "bg-red-600", preview: "from-red-500 to-red-600" },
  { name: "Pink", value: "bg-pink-600", preview: "from-pink-500 to-pink-600" },
  { name: "Indigo", value: "bg-indigo-600", preview: "from-indigo-500 to-indigo-600" },
  { name: "Cyan", value: "bg-cyan-600", preview: "from-cyan-500 to-cyan-600" },
]

export default function SkillsManager({ onSave }: SkillsManagerProps) {
  const { content, updateContent } = useWebsiteContent()
  const [newCategory, setNewCategory] = useState({
    title: "",
    skills: "",
    color: "bg-blue-600",
  })
  const [newSkill, setNewSkill] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const updateSkillsSection = (field: string, value: any) => {
    updateContent("skills", { [field]: value })
    onSave()
  }

  const addCategory = () => {
    if (!newCategory.title || !newCategory.skills) return

    const newId = Math.max(...(content.skills?.categories?.map((c: any) => c.id) || [0]), 0) + 1
    const updatedCategories = [
      ...(content.skills?.categories || []),
      {
        id: newId,
        title: newCategory.title,
        skills: newCategory.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
        color: newCategory.color,
      },
    ]
    updateContent("skills", { categories: updatedCategories })
    setNewCategory({ title: "", skills: "", color: "bg-blue-600" })
    onSave()
  }

  const removeCategory = (id: number) => {
    const updatedCategories = content.skills.categories.filter((category: any) => category.id !== id)
    updateContent("skills", { categories: updatedCategories })
    onSave()
  }

  const updateCategory = (id: number, field: string, value: any) => {
    const updatedCategories = content.skills.categories.map((category: any) =>
      category.id === id ? { ...category, [field]: value } : category,
    )
    updateContent("skills", { categories: updatedCategories })
    onSave()
  }

  const updateCategorySkills = (id: number, skillsString: string) => {
    const skills = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill)
    updateCategory(id, "skills", skills)
  }

  const addSkillToCategory = (categoryId: number) => {
    if (!newSkill.trim()) return

    const category = content.skills.categories.find((c: any) => c.id === categoryId)
    if (category) {
      const updatedSkills = [...category.skills, newSkill.trim()]
      updateCategory(categoryId, "skills", updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkillFromCategory = (categoryId: number, skillIndex: number) => {
    const category = content.skills.categories.find((c: any) => c.id === categoryId)
    if (category) {
      const updatedSkills = category.skills.filter((_: any, index: number) => index !== skillIndex)
      updateCategory(categoryId, "skills", updatedSkills)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-emerald-500/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Crown className="w-8 h-8 mr-3 text-emerald-400" />⚡ ULTIMATE Skills Manager
          </CardTitle>
          <p className="text-gray-300 text-lg">Manage your skills, technologies, and expertise levels</p>
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
              value={content.skills?.title || ""}
              onChange={(e) => updateSkillsSection("title", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-blue-400"
              placeholder="e.g., Skills & Technologies"
            />
          </div>
          <div>
            <Label className="text-gray-300 font-semibold">Section Subtitle</Label>
            <Input
              value={content.skills?.subtitle || ""}
              onChange={(e) => updateSkillsSection("subtitle", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-blue-400"
              placeholder="Brief description of your skills section"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add New Category */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="w-6 h-6 mr-3 text-green-400" />
            Add New Skill Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-300 font-semibold">Category Title</Label>
              <Input
                value={newCategory.title}
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                placeholder="e.g., Frontend Development"
                className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
              />
            </div>
            <div>
              <Label className="text-gray-300 font-semibold">Skills (comma separated)</Label>
              <Input
                value={newCategory.skills}
                onChange={(e) => setNewCategory({ ...newCategory, skills: e.target.value })}
                placeholder="React, Next.js, TypeScript"
                className="bg-gray-700 border-gray-600 text-white mt-2 focus:border-green-400"
              />
            </div>
            <div>
              <Label className="text-gray-300 font-semibold">Color Theme</Label>
              <select
                value={newCategory.color}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                className="w-full mt-2 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-green-400"
              >
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            onClick={addCategory}
            disabled={!newCategory.title || !newCategory.skills}
            className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      {/* Current Categories */}
      <Card className="bg-gray-800/60 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-400" />
            Skill Categories ({content.skills?.categories?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!content.skills?.categories || content.skills.categories.length === 0 ? (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No skill categories added yet</p>
              <p className="text-gray-500">Add your first skill category above</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {content.skills.categories.map((category: any) => {
                const colorOption = colorOptions.find((c) => c.value === category.color) || colorOptions[0]

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-700/50 rounded-xl border border-gray-600 overflow-hidden hover:border-blue-400 transition-all duration-300"
                  >
                    {/* Category Header */}
                    <div className={`p-4 bg-gradient-to-r ${colorOption.preview}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-lg">{category.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCategory(category.id)}
                          className="text-white hover:bg-white/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <Label className="text-gray-300 text-sm">Category Title</Label>
                        <Input
                          value={category.title}
                          onChange={(e) => updateCategory(category.id, "title", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white mt-1"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 text-sm">Color Theme</Label>
                        <select
                          value={category.color}
                          onChange={(e) => updateCategory(category.id, "color", e.target.value)}
                          className="w-full mt-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2"
                        >
                          {colorOptions.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-gray-300 text-sm">Skills</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-3">
                          {category.skills?.map((skill: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-gray-600 text-gray-300 group cursor-pointer hover:bg-red-500/20"
                              onClick={() => removeSkillFromCategory(category.id, index)}
                            >
                              {skill}
                              <Trash2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Badge>
                          ))}
                        </div>

                        {/* Add Individual Skill */}
                        <div className="flex gap-2">
                          <Input
                            value={selectedCategory === category.id ? newSkill : ""}
                            onChange={(e) => {
                              setNewSkill(e.target.value)
                              setSelectedCategory(category.id)
                            }}
                            placeholder="Add new skill"
                            className="bg-gray-700 border-gray-600 text-white text-sm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addSkillToCategory(category.id)
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => addSkillToCategory(category.id)}
                            disabled={!newSkill.trim() || selectedCategory !== category.id}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Bulk Edit Skills */}
                        <div className="mt-3">
                          <Label className="text-gray-300 text-xs">Bulk Edit (comma separated)</Label>
                          <Input
                            value={category.skills?.join(", ") || ""}
                            onChange={(e) => updateCategorySkills(category.id, e.target.value)}
                            placeholder="React, Next.js, TypeScript"
                            className="bg-gray-700 border-gray-600 text-white mt-1 text-sm"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-600">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Skills Count:</span>
                          <span className="text-white font-semibold">{category.skills?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
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
              <h2 className="text-3xl font-bold text-white mb-4">{content.skills?.title || "Skills & Technologies"}</h2>
              <p className="text-gray-300">
                {content.skills?.subtitle || "A comprehensive toolkit for bringing creative visions to life"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {content.skills?.categories?.map((category: any) => {
                const colorOption = colorOptions.find((c) => c.value === category.color) || colorOptions[0]

                return (
                  <div key={category.id} className="bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                        <h3 className="text-white font-semibold">{category.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills?.map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {(!content.skills?.categories || content.skills.categories.length === 0) && (
              <p className="text-gray-400 text-center">No skill categories to display</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
