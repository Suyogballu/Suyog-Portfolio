"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Download, Upload, Trash2, RefreshCw, Database, FileText, Settings } from "lucide-react"

export default function BackupManager() {
  const [importData, setImportData] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const exportAllData = () => {
    const allData = {
      websiteContent: localStorage.getItem("websiteContent"),
      seoSettings: localStorage.getItem("seoSettings"),
      contactInfo: localStorage.getItem("contactInfo"),
      socialLinks: localStorage.getItem("socialLinks"),
      customSections: localStorage.getItem("customSections"),
      advancedSettings: localStorage.getItem("advancedSettings"),
      systemSettings: localStorage.getItem("systemSettings"),
      adminCredentials: localStorage.getItem("adminCredentials"),
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    }

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `suyog-portfolio-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importAllData = () => {
    try {
      setIsLoading(true)
      const parsed = JSON.parse(importData)

      Object.keys(parsed).forEach((key) => {
        if (key !== "timestamp" && key !== "version" && parsed[key]) {
          localStorage.setItem(key, parsed[key])
        }
      })

      setTimeout(() => {
        setIsLoading(false)
        alert("Data imported successfully! The page will reload.")
        window.location.reload()
      }, 1000)
    } catch (error) {
      setIsLoading(false)
      alert("Invalid JSON data. Please check your backup file.")
    }
  }

  const clearAllData = () => {
    if (confirm("⚠️ This will permanently delete ALL portfolio data. Are you absolutely sure?")) {
      if (confirm("This action cannot be undone. Type 'DELETE' to confirm.")) {
        localStorage.clear()
        alert("All data has been cleared!")
        window.location.href = "/"
      }
    }
  }

  const resetToDefaults = () => {
    if (confirm("Reset all settings to default values? Your content will be preserved.")) {
      const contentToKeep = localStorage.getItem("websiteContent")
      const adminCreds = localStorage.getItem("adminCredentials")

      localStorage.clear()

      if (contentToKeep) localStorage.setItem("websiteContent", contentToKeep)
      if (adminCreds) localStorage.setItem("adminCredentials", adminCreds)

      alert("Settings reset to defaults!")
      window.location.reload()
    }
  }

  const getStorageSize = () => {
    let total = 0
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }
    return (total / 1024).toFixed(2) + " KB"
  }

  return (
    <div className="space-y-6">
      {/* Storage Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <Database className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-300 text-sm">Storage Used</p>
            <p className="text-2xl font-bold text-white">{getStorageSize()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/30">
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-300 text-sm">Data Items</p>
            <p className="text-2xl font-bold text-white">{Object.keys(localStorage).length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <Settings className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-300 text-sm">Last Modified</p>
            <p className="text-lg font-bold text-white">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Export/Import */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">
              Download a complete backup of your portfolio data including content, settings, and configurations.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Website Content</span>
                <span className="text-green-400">✓ Included</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">SEO Settings</span>
                <span className="text-green-400">✓ Included</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Contact Info</span>
                <span className="text-green-400">✓ Included</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Admin Credentials</span>
                <span className="text-green-400">✓ Included</span>
              </div>
            </div>
            <Button onClick={exportAllData} className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Complete Backup
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Import Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">
              Restore your portfolio from a backup file. This will overwrite all current data.
            </p>
            <div>
              <Label className="text-gray-300">Backup JSON Data</Label>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="w-full h-32 bg-gray-700 border-gray-600 text-white p-3 rounded-lg mt-2 font-mono text-sm"
                placeholder="Paste your backup JSON data here..."
              />
            </div>
            <Button
              onClick={importAllData}
              disabled={!importData.trim() || isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Backup
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="bg-red-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-medium mb-2">Reset to Defaults</h4>
              <p className="text-gray-400 text-sm mb-3">
                Reset all settings to default values while preserving your content.
              </p>
              <Button
                onClick={resetToDefaults}
                variant="outline"
                className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10 bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Settings
              </Button>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">Delete All Data</h4>
              <p className="text-gray-400 text-sm mb-3">
                Permanently delete all portfolio data. This action cannot be undone.
              </p>
              <Button onClick={clearAllData} variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Everything
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
