"use client"

import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface HeroSectionProps {
  content?: any
}

export default function HeroSection({ content }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const heroContent = content?.hero || {
    title: "Hi, I'm Suyog",
    subtitle: "Creative Designer & Developer crafting digital experiences that inspire and engage audiences worldwide",
    primaryButton: "View My Work",
    secondaryButton: "Get In Touch",
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-4 -right-4 w-8 h-8"
            >
              <Sparkles className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              {heroContent.title.split("Suyog").length > 1 ? (
                <>
                  {heroContent.title.split("Suyog")[0]}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Suyog
                  </span>
                  {heroContent.title.split("Suyog")[1]}
                </>
              ) : (
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {heroContent.title}
                </span>
              )}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              onClick={() => scrollToSection("downloads")}
            >
              <Download className="w-5 h-5 mr-2" />
              {heroContent.primaryButton}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-3 text-lg bg-transparent backdrop-blur-sm"
              onClick={() => scrollToSection("contact")}
            >
              {heroContent.secondaryButton}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-400 hover:text-white transition-colors animate-bounce"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
