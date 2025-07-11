"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Globe, Zap, CheckCircle, Clock, Users, Eye, RefreshCw, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function SiteMonitor() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastChecked, setLastChecked] = useState(new Date())
  const [metrics, setMetrics] = useState({
    uptime: "99.9%",
    responseTime: "245ms",
    pageViews: 12543,
    uniqueVisitors: 3421,
    bounceRate: "32%",
    avgSessionDuration: "3m 24s",
  })

  const [systemStatus, setSystemStatus] = useState([
    { service: "Website", status: "operational", responseTime: "245ms" },
    { service: "Admin Panel", status: "operational", responseTime: "189ms" },
    { service: "Contact Form", status: "operational", responseTime: "156ms" },
    { service: "Download Center", status: "operational", responseTime: "298ms" },
  ])

  const [recentActivity, setRecentActivity] = useState([
    { time: "2 minutes ago", action: "User visited portfolio page", type: "info" },
    { time: "5 minutes ago", action: "Download: AE Pack", type: "success" },
    { time: "12 minutes ago", action: "Contact form submission", type: "info" },
    { time: "18 minutes ago", action: "Admin login", type: "warning" },
    { time: "25 minutes ago", action: "User visited about page", type: "info" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setLastChecked(new Date())
      // Simulate random metrics updates
      setMetrics((prev) => ({
        ...prev,
        responseTime: Math.floor(Math.random() * 100 + 200) + "ms",
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const refreshStatus = () => {
    setLastChecked(new Date())
    // Simulate status check
    setTimeout(() => {
      setSystemStatus((prev) =>
        prev.map((service) => ({
          ...service,
          responseTime: Math.floor(Math.random() * 100 + 150) + "ms",
        })),
      )
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-400"
      case "degraded":
        return "text-yellow-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-600">Operational</Badge>
      case "degraded":
        return <Badge className="bg-yellow-600">Degraded</Badge>
      case "down":
        return <Badge className="bg-red-600">Down</Badge>
      default:
        return <Badge className="bg-gray-600">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className="bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">All Systems Operational</h2>
                <p className="text-green-300">Portfolio is running smoothly</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-300 text-sm">Uptime</p>
              <p className="text-3xl font-bold text-white">{metrics.uptime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Response Time</p>
              <p className="text-2xl font-bold text-white">{metrics.responseTime}</p>
              <p className="text-green-400 text-xs flex items-center justify-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Fast
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Page Views</p>
              <p className="text-2xl font-bold text-white">{metrics.pageViews.toLocaleString()}</p>
              <p className="text-purple-400 text-xs">Today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Unique Visitors</p>
              <p className="text-2xl font-bold text-white">{metrics.uniqueVisitors.toLocaleString()}</p>
              <p className="text-green-400 text-xs">Today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Avg. Session</p>
              <p className="text-2xl font-bold text-white">{metrics.avgSessionDuration}</p>
              <p className="text-orange-400 text-xs">Duration</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                System Status
              </CardTitle>
              <Button onClick={refreshStatus} size="sm" variant="outline" className="border-gray-600 bg-transparent">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((service, index) => (
                <div key={service.service} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className={`w-5 h-5 ${getStatusColor(service.status)}`} />
                    <div>
                      <p className="text-white font-medium">{service.service}</p>
                      <p className="text-gray-400 text-sm">{service.responseTime}</p>
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">Last checked: {lastChecked.toLocaleTimeString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-400"
                        : activity.type === "warning"
                          ? "bg-yellow-400"
                          : activity.type === "error"
                            ? "bg-red-400"
                            : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">A+</div>
              <p className="text-gray-400">Performance Score</p>
              <p className="text-green-400 text-sm">Excellent</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98</div>
              <p className="text-gray-400">SEO Score</p>
              <p className="text-blue-400 text-sm">Very Good</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">95</div>
              <p className="text-gray-400">Accessibility</p>
              <p className="text-purple-400 text-sm">Excellent</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
