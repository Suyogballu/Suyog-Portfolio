"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import { motion } from "framer-motion"

interface HighlightsSectionProps {
  content?: any
}

export default function HighlightsSection({ content }: HighlightsSectionProps) {
  const highlightsContent = content?.highlights || {
    title: "Project Highlights",
    subtitle: "A showcase of my recent work and creative projects",
  }

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI and secure payment integration",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      featured: true,
    },
    {
      title: "Motion Graphics Pack",
      description: "Professional After Effects templates for social media content creators",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["After Effects", "Motion Design"],
      link: "#",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio site with dark theme and smooth animations",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      link: "#",
      featured: true,
    },
    {
      title: "Mobile App UI",
      description: "Clean and intuitive mobile app interface design with user-centered approach",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["UI/UX", "Figma", "Mobile Design"],
      link: "#",
      featured: false,
    },
  ]

  return (
    <section id="highlights" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{highlightsContent.title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{highlightsContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-yellow-500 text-black px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
