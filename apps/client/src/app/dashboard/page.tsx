'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {session.user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Active Projects</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Total Projects</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>In Progress</span>
              <span className="font-semibold text-amber-600">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Completed</span>
              <span className="font-semibold text-green-600">4</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">2 hours ago</p>
              <p>New design files uploaded to Project X</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600">Yesterday</p>
              <p>Project Y milestone completed</p>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Project X Delivery</p>
              <p className="text-sm text-gray-600">Dec 15, 2024</p>
            </div>
            <div>
              <p className="text-sm font-medium">Project Y Review</p>
              <p className="text-sm text-gray-600">Dec 20, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="divide-y">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Sarah from Design Team</span>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
              <p className="text-gray-600">Updated the latest design mockups for the homepage...</p>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">John from Development</span>
                <span className="text-sm text-gray-500">3 hours ago</span>
              </div>
              <p className="text-gray-600">The new feature implementation is ready for review...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
