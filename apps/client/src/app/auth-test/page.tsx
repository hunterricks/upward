'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthTestPage() {
  const { data: session, status } = useSession()
  const [testEmail, setTestEmail] = useState('')
  const [testPassword, setTestPassword] = useState('')
  const [result, setResult] = useState<string>('')

  // Test Registration
  const testRegistration = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          name: 'Test User'
        })
      })
      const data = await res.json()
      setResult(`Registration ${res.ok ? 'successful' : 'failed'}: ${JSON.stringify(data)}`)
    } catch (error) {
      setResult(`Registration error: ${error}`)
    }
  }

  // Test Login with Credentials
  const testCredentialsLogin = async () => {
    try {
      const result = await signIn('credentials', {
        email: testEmail,
        password: testPassword,
        redirect: false
      })
      setResult(`Login ${result?.ok ? 'successful' : 'failed'}: ${JSON.stringify(result)}`)
    } catch (error) {
      setResult(`Login error: ${error}`)
    }
  }

  // Test Rate Limiting
  const testRateLimiting = async () => {
    setResult('Testing rate limiting...')
    for (let i = 0; i < 6; i++) {
      try {
        const result = await signIn('credentials', {
          email: testEmail,
          password: 'wrongpassword',
          redirect: false
        })
        setResult(prev => `${prev}\nAttempt ${i + 1}: ${JSON.stringify(result)}`)
      } catch (error) {
        setResult(prev => `${prev}\nAttempt ${i + 1} error: ${error}`)
      }
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second between attempts
    }
  }

  // Test Protected Route Access
  const testProtectedRoute = async () => {
    try {
      const res = await fetch('/api/auth/protected-test')
      const data = await res.json()
      setResult(`Protected route test: ${JSON.stringify(data)}`)
    } catch (error) {
      setResult(`Protected route error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Auth System Test Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Current Status: {status}
          </p>
          {session && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Logged in as: {session.user?.email}
            </p>
          )}
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Test Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Test Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={testRegistration}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Test Registration
            </button>
            <button
              onClick={testCredentialsLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Test Login
            </button>
            <button
              onClick={() => signIn('google', { redirect: false })}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Test Google Login
            </button>
            <button
              onClick={testRateLimiting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Test Rate Limiting
            </button>
            <button
              onClick={testProtectedRoute}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Test Protected Route
            </button>
            <button
              onClick={() => signOut({ redirect: false })}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Test Results:</h3>
            <pre className="mt-2 p-4 bg-gray-800 text-white rounded-md overflow-auto max-h-60">
              {result || 'No test run yet'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
