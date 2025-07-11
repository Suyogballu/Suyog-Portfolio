"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Shield, Mail, Calendar, MoreHorizontal, UserCheck, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function UserManager() {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      joinDate: "2024-01-15",
      status: "Active",
      lastActive: "2 hours ago",
      downloads: 5,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Moderator",
      joinDate: "2024-01-10",
      status: "Active",
      lastActive: "1 day ago",
      downloads: 12,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      joinDate: "2024-01-20",
      status: "Pending",
      lastActive: "Never",
      downloads: 0,
    },
  ])

  const [modRequests, setModRequests] = useState([
    {
      id: 1,
      name: "Alex Chen",
      email: "alex@example.com",
      message:
        "I have 3 years of community management experience and would love to help moderate the platform. I'm passionate about design and have been following your work for a long time.",
      requestDate: "2024-01-22",
      experience: "3 years",
      portfolio: "https://alexchen.dev",
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma@example.com",
      message:
        "I'm passionate about design and have been an active member for 6 months. I'd like to contribute as a moderator and help maintain the quality of the community.",
      requestDate: "2024-01-21",
      experience: "6 months",
      portfolio: "https://emmadavis.design",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const handleApproveRequest = (id: number) => {
    setModRequests(modRequests.filter((req) => req.id !== id))
    // Add logic to promote user to moderator
  }

  const handleDeclineRequest = (id: number) => {
    setModRequests(modRequests.filter((req) => req.id !== id))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-white">1,234</p>
                  <p className="text-blue-400 text-xs">+12% this month</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-bold text-white">987</p>
                  <p className="text-green-400 text-xs">+8% this week</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Moderators</p>
                  <p className="text-3xl font-bold text-white">5</p>
                  <p className="text-purple-400 text-xs">2 pending requests</p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">New Signups</p>
                  <p className="text-3xl font-bold text-white">47</p>
                  <p className="text-orange-400 text-xs">This week</p>
                </div>
                <UserCheck className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Moderator Requests */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Moderator Requests ({modRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {modRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg border border-gray-600 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-semibold text-lg">{request.name}</h4>
                        <Badge variant="outline" className="border-purple-500 text-purple-400">
                          Mod Request
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                        <p className="text-gray-400 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {request.email}
                        </p>
                        <p className="text-gray-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {request.requestDate}
                        </p>
                        <p className="text-gray-400">Experience: {request.experience}</p>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-3">{request.message}</p>
                      {request.portfolio && (
                        <a
                          href={request.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm underline"
                        >
                          View Portfolio →
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 bg-transparent hover:bg-gray-700"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {modRequests.length === 0 && (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No pending moderator requests</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Management
            </CardTitle>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white w-64"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="moderator">Moderators</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 py-3 font-medium">User</th>
                  <th className="text-left text-gray-400 py-3 font-medium">Role</th>
                  <th className="text-left text-gray-400 py-3 font-medium">Join Date</th>
                  <th className="text-left text-gray-400 py-3 font-medium">Status</th>
                  <th className="text-left text-gray-400 py-3 font-medium">Activity</th>
                  <th className="text-left text-gray-400 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant={user.role === "Moderator" ? "default" : "secondary"}
                          className={user.role === "Moderator" ? "bg-purple-600" : ""}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 text-gray-300">{user.joinDate}</td>
                      <td className="py-4">
                        <Badge
                          variant={user.status === "Active" ? "default" : "secondary"}
                          className={user.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <p className="text-gray-300">{user.lastActive}</p>
                          <p className="text-gray-500">{user.downloads} downloads</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No users found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
