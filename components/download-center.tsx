"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Star, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface DownloadCenterProps {
  content?: any
}

export default function DownloadCenter({ content }: DownloadCenterProps) {
  const downloadsContent = content?.downloads || {
    title: "Download Center",
    subtitle: "Premium design assets and templates to elevate your creative projects",
  }

  const packs = [
    {
      id: 1,
      title: "After Effects CC Pack",
      description: "Professional motion graphics templates and presets for content creators",
      price: "$29.99",
      originalPrice: "$49.99",
      image: "/placeholder.svg?height=250&width=350",
      payhipUrl: "https://payhip.com/ae-pack",
      rating: 4.9,
      downloads: 1250,
      featured: true,
      tags: ["After Effects", "Motion Graphics", "Templates"],
    },
    {
      id: 2,
      title: "Shake Presets Bundle",
      description: "Dynamic camera shake effects and transitions for video editing",
      price: "$19.99",
      originalPrice: "$34.99",
      image: "/placeholder.svg?height=250&width=350",
      payhipUrl: "https://payhip.com/shake-bundle",
      rating: 4.8,
      downloads: 890,
      featured: false,
      tags: ["Presets", "Video Effects", "Transitions"],
    },
    {
      id: 3,
      title: "Velocity Pack",
      description: "High-speed motion templates perfect for sports and action content",
      price: "$24.99",
      originalPrice: "$39.99",
      image: "/placeholder.svg?height=250&width=350",
      payhipUrl: "https://payhip.com/velocity-pack",
      rating: 4.7,
      downloads: 650,
      featured: true,
      tags: ["Sports", "Action", "High Energy"],
    },
    {
      id: 4,
      title: "UI Animation Kit",
      description: "Smooth UI animations and micro-interactions for web and mobile",
      price: "$34.99",
      originalPrice: "$54.99",
      image: "/placeholder.svg?height=250&width=350",
      payhipUrl: "https://payhip.com/ui-kit",
      rating: 4.9,
      downloads: 420,
      featured: false,
      tags: ["UI/UX", "Web Design", "Mobile"],
    },
  ]

  return (
    <section id="downloads" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{downloadsContent.title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{downloadsContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={pack.image || "/placeholder.svg"}
                    alt={pack.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {pack.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center text-yellow-400 text-sm">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {pack.rating}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{pack.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{pack.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {pack.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-400">{pack.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pack.originalPrice}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <Download className="w-4 h-4 inline mr-1" />
                      {pack.downloads.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(pack.payhipUrl, "_blank")}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Resume Download</h3>
              <p className="text-gray-300 mb-6">
                Get my complete professional resume with detailed experience and skills
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume (PDF)
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
