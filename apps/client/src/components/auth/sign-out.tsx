'use client'

import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: '/login' })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signing out...
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please wait while we sign you out.
          </p>
        </div>
      </div>
    </div>
  )
}