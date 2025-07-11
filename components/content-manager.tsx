"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Upload, ExternalLink, FileText, Zap, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContentManager() {
  const [packs, setPacks] = useState([
    {
      id: 1,
      title: "After Effects CC Pack",
      description: "Professional AE templates and presets for content creators",
      price: "$29.99",
      payhipUrl: "https://payhip.com/ae-pack",
      thumbnail: "/placeholder.svg?height=200&width=300",
      featured: true,
      downloads: 1250,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Shake Presets Bundle",
      description: "Dynamic camera shake effects and transitions",
      price: "$19.99",
      payhipUrl: "https://payhip.com/shake-bundle",
      thumbnail: "/placeholder.svg?height=200&width=300",
      featured: false,
      downloads: 890,
      rating: 4.8,
    },
  ])

  const [showAddPack, setShowAddPack] = useState(false)
  const [editingPack, setEditingPack] = useState<any>(null)
  const [newPack, setNewPack] = useState({
    title: "",
    description: "",
    price: "",
    payhipUrl: "",
    thumbnail: "",
    featured: false,
  })

  const handleAddPack = () => {
    if (newPack.title && newPack.description && newPack.price && newPack.payhipUrl) {
      setPacks([
        ...packs,
        {
          id: Date.now(),
          ...newPack,
          thumbnail: newPack.thumbnail || "/placeholder.svg?height=200&width=300",
          downloads: 0,
          rating: 5.0,
        },
      ])
      setNewPack({ title: "", description: "", price: "", payhipUrl: "", thumbnail: "", featured: false })
      setShowAddPack(false)
    }
  }

  const handleDeletePack = (id: number) => {
    setPacks(packs.filter((pack) => pack.id !== id))
  }

  const handleEditPack = (pack: any) => {
    setEditingPack(pack)
    setNewPack(pack)
    setShowAddPack(true)
  }

  const handleUpdatePack = () => {
    setPacks(packs.map((pack) => (pack.id === editingPack.id ? { ...pack, ...newPack } : pack)))
    setEditingPack(null)
    setNewPack({ title: "", description: "", price: "", payhipUrl: "", thumbnail: "", featured: false })
    setShowAddPack(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Content Management</h2>
          <p className="text-gray-400">Manage your digital products and downloads</p>
        </div>
        <Button
          onClick={() => setShowAddPack(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Pack
        </Button>
      </div>

      <AnimatePresence>
        {showAddPack && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  {editingPack ? "Edit Pack" : "Add New Pack"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Pack Title</Label>
                    <Input
                      value={newPack.title}
                      onChange={(e) => setNewPack({ ...newPack, title: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white mt-2"
                      placeholder="e.g., Velocity Pack"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Price</Label>
                    <Input
                      value={newPack.price}
                      onChange={(e) => setNewPack({ ...newPack, price: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white mt-2"
                      placeholder="e.g., $24.99"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Description</Label>
                  <Textarea
                    value={newPack.description}
                    onChange={(e) => setNewPack({ ...newPack, description: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    placeholder="Describe your pack..."
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Payhip URL</Label>
                  <Input
                    value={newPack.payhipUrl}
                    onChange={(e) => setNewPack({ ...newPack, payhipUrl: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    placeholder="https://payhip.com/your-product"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Thumbnail URL</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      value={newPack.thumbnail}
                      onChange={(e) => setNewPack({ ...newPack, thumbnail: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white flex-1"
                      placeholder="Image URL or upload..."
                    />
                    <Button variant="outline" className="border-gray-600 bg-transparent hover:bg-gray-700">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newPack.featured}
                    onChange={(e) => setNewPack({ ...newPack, featured: e.target.checked })}
                    className="rounded bg-gray-700 border-gray-600"
                  />
                  <Label htmlFor="featured" className="text-gray-300 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Featured Pack
                  </Label>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={editingPack ? handleUpdatePack : handleAddPack}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                  >
                    {editingPack ? "Update Pack" : "Add Pack"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddPack(false)
                      setEditingPack(null)
                      setNewPack({
                        title: "",
                        description: "",
                        price: "",
                        payhipUrl: "",
                        thumbnail: "",
                        featured: false,
                      })
                    }}
                    className="border-gray-600 bg-transparent hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group h-full">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={pack.thumbnail || "/placeholder.svg"}
                      alt={pack.title}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {pack.featured && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-yellow-500 text-black px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="p-1 bg-gray-800/80 hover:bg-gray-700"
                        onClick={() => handleEditPack(pack)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="destructive" className="p-1" onClick={() => handleDeletePack(pack.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{pack.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{pack.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-400 font-bold text-lg">{pack.price}</span>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {pack.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>{pack.downloads.toLocaleString()} downloads</span>
                      <span>Active</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 bg-transparent hover:bg-gray-700"
                        onClick={() => window.open(pack.payhipUrl, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Resume Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Current Resume</h4>
              <p className="text-gray-400 text-sm">suyog-resume-2024.pdf • Last updated 2 days ago</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-gray-600 bg-transparent hover:bg-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                Replace
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">1,234</div>
              <div className="text-sm text-gray-400">Total Downloads</div>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">89</div>
              <div className="text-sm text-gray-400">This Month</div>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">4.8</div>
              <div className="text-sm text-gray-400">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
