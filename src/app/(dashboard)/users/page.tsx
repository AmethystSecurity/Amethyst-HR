'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Trash2, Search, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface User {
  id: string
  email: string
  username: string
  createdAt: string
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/auth/users')
      const data = await response.json()
      if (data.success) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`/api/auth/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId))
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-text-primary font-heading">User Management</h1>
        <p className="text-text-secondary mt-2">View and manage registered user accounts</p>
      </motion.div>

      <Card className="p-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg-glass border border-border-glass rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amethyst/50 focus:ring-1 focus:ring-amethyst/20 transition-all"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-amethyst animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-glass">
                  <th className="text-left py-4 px-4 text-text-secondary font-medium">Username</th>
                  <th className="text-left py-4 px-4 text-text-secondary font-medium">Email</th>
                  <th className="text-left py-4 px-4 text-text-secondary font-medium">Created</th>
                  <th className="text-right py-4 px-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border-glass/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amethyst/20 flex items-center justify-center">
                          <span className="text-amethyst font-medium">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-text-primary font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-text-secondary">{user.email}</td>
                    <td className="py-4 px-4 text-text-secondary">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="inline-flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-border-glass flex items-center justify-between">
          <span className="text-text-secondary">Total Users:</span>
          <span className="text-2xl font-bold text-amethyst">{users.length}</span>
        </div>
      </Card>
    </div>
  )
}