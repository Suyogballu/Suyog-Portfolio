"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap, Heart } from "lucide-react"
import { motion } from "framer-motion"

interface AboutSectionProps {
  content?: any
}

export default function AboutSection({ content }: AboutSectionProps) {
  const aboutContent = content?.about || {
    title: "About Me",
    description:
      "I'm an 18-year-old creative professional passionate about bringing ideas to life through code and design. With a focus on modern technologies and user-centered design, I create digital experiences that make a difference.",
    journey:
      'Started coding at 15, I\'ve been on an incredible journey of learning and creating. From my first "Hello World" to building complex applications, every project has been a stepping stone towards mastering the art of digital creation.',
  }

  const features = [
    {
      icon: Code,
      title: "Development",
      description: "Building modern web applications with cutting-edge technologies",
    },
    {
      icon: Palette,
      title: "Design",
      description: "Creating beautiful and intuitive user interfaces that users love",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and efficiency in every project",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Dedicated to delivering exceptional digital experiences",
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{aboutContent.title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{aboutContent.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group h-full">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
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
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-700"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">{aboutContent.journey}</p>
            </div>
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
