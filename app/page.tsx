"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, User, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse" />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
              className="w-20 h-20 mx-auto mb-6 relative"
            >
              <Sparkles className="w-20 h-20 text-blue-400" />
              <motion.div
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <motion.h1
              className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Suyog's Portfolio
            </motion.h1>
            <motion.p
              className="text-gray-400 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Choose your access level
            </motion.p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 },
            }}
            className="perspective-1000"
          >
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 group cursor-pointer backdrop-blur-xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                    "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <CardContent className="p-10 text-center relative z-10">
                <motion.div
                  animate={{
                    rotateX: [0, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6 group-hover:text-blue-300 transition-colors duration-300" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  Admin Portal
                </h2>
                <p className="text-gray-400 mb-8 group-hover:text-gray-300 transition-colors">
                  Command center for universe control
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  onClick={() => (window.location.href = "/admin")}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Access Admin Panel
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              rotateY: -5,
              transition: { duration: 0.3 },
            }}
            className="perspective-1000"
          >
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 group cursor-pointer backdrop-blur-xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                    "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                    "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              />
              <CardContent className="p-10 text-center relative z-10">
                <motion.div
                  animate={{
                    rotateX: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  <User className="w-16 h-16 text-purple-400 mx-auto mb-6 group-hover:text-purple-300 transition-colors duration-300" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  Public Gallery
                </h2>
                <p className="text-gray-400 mb-8 group-hover:text-gray-300 transition-colors">
                  Explore the creative multiverse
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => (window.location.href = "/portfolio")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Portfolio
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-gray-500 text-sm"
        >
          <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            © 2024 Suyog's Portfolio. All dimensions reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
