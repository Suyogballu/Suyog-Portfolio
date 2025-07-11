"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface SkillsSectionProps {
  content?: any
}

export default function SkillsSection({ content }: SkillsSectionProps) {
  const skillsContent = content?.skills || {
    title: "Skills & Technologies",
    subtitle: "A comprehensive toolkit for bringing creative visions to life",
  }

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
      color: "bg-blue-600",
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "Supabase"],
      color: "bg-green-600",
    },
    {
      title: "Design Tools",
      skills: ["After Effects", "Photoshop", "Figma", "Illustrator", "Premiere Pro"],
      color: "bg-purple-600",
    },
    {
      title: "Other Skills",
      skills: ["Git", "Docker", "AWS", "Vercel", "API Development", "UI/UX Design"],
      color: "bg-orange-600",
    },
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{skillsContent.title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{skillsContent.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 h-full hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
