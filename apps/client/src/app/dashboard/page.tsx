'use client'

import { useSession } from 'next-auth/react'
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session?.user?.name}</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
              <span className="text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">12</p>
            <p className="text-sm text-gray-600 mt-2">2 added this month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <span className="text-amber-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">8</p>
            <p className="text-sm text-gray-600 mt-2">3 updated today</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <span className="text-green-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">4</p>
            <p className="text-sm text-gray-600 mt-2">1 this week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
              <span className="text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">6</p>
            <p className="text-sm text-gray-600 mt-2">Active collaborators</p>
          </div>
        </div>

        {/* Recent Activity and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New design files uploaded</p>
                  <p className="text-sm text-gray-600">Sarah uploaded 3 new files to Project X</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Project milestone completed</p>
                  <p className="text-sm text-gray-600">Project Y Phase 1 has been marked as complete</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Review design mockups</p>
                  <p className="text-xs text-gray-500">Due Dec 18, 2024</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">In Progress</span>
              </div>

              <div className="flex items-center gap-4">
                <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Client meeting</p>
                  <p className="text-xs text-gray-500">Due Dec 20, 2024</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Upcoming</span>
              </div>

              <div className="flex items-center gap-4">
                <input type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Project delivery</p>
                  <p className="text-xs text-gray-500">Due Dec 22, 2024</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
