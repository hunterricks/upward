'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          message: 'An account with this email already exists. Please sign in with your email and password instead.',
          action: 'Sign in with email'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You do not have permission to access this resource.',
          action: 'Back to home'
        }
      case 'Verification':
        return {
          title: 'Verification Required',
          message: 'Please verify your email address before signing in.',
          action: 'Resend verification email'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An error occurred during authentication. Please try again.',
          action: 'Try again'
        }
    }
  }

  const errorInfo = getErrorMessage(error || '')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {errorInfo.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorInfo.message}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center">
            <Link
              href="/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {errorInfo.action}
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
