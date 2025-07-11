"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import HighlightsSection from "@/components/highlights-section"
import DownloadCenter from "@/components/download-center"
import ContactSection from "@/components/contact-section"
import AuthModal from "@/components/auth-modal"

export default function PortfolioPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [content, setContent] = useState<any>(null)

  // Load content from localStorage
  useEffect(() => {
    const loadContent = () => {
      const stored = localStorage.getItem("websiteContent")
      if (stored) {
        try {
          setContent(JSON.parse(stored))
        } catch (error) {
          console.error("Error loading content:", error)
        }
      }
    }

    loadContent()

    // Listen for content updates
    const handleContentUpdate = (event: any) => {
      setContent(event.detail)
    }

    window.addEventListener("contentUpdated", handleContentUpdate)
    return () => window.removeEventListener("contentUpdated", handleContentUpdate)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 text-gray-400 hover:text-white bg-gray-900/80 backdrop-blur-sm border border-gray-700"
        onClick={() => (window.location.href = "/")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Universe
      </Button>

      <Navbar
        onAuthClick={(mode) => {
          setAuthMode(mode)
          setShowAuthModal(true)
        }}
      />

      <main>
        <HeroSection content={content} />
        <AboutSection content={content} />
        <SkillsSection content={content} />
        <HighlightsSection content={content} />
        <DownloadCenter content={content} />
        <ContactSection content={content} />
      </main>

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-400">© 2024 Suyog. All rights reserved.</p>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
