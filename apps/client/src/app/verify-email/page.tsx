'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState('Verifying...')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasAttempted, setHasAttempted] = useState(false)

  useEffect(() => {
    const verifyEmail = async () => {
      // Prevent multiple verification attempts
      if (hasAttempted) return
      setHasAttempted(true)

      try {
        if (!token) {
          setError('No verification token provided')
          setIsLoading(false)
          return
        }

        console.log('Making verification request with token:', token.substring(0, 10) + '...')
        const apiUrl = `${window.location.origin}/api/auth/verify-email?token=${token}`

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
        
        const data = await response.json()

        if (response.ok) {
          setStatus('Email verified successfully!')
          setTimeout(() => {
            router.push('/auth/email-verified')
          }, 2000)
        } else {
          throw new Error(data.error || 'Verification failed')
        }
      } catch (error: any) {
        console.error('Verification error:', error)
        setError(error.message || 'An error occurred during verification')
        setTimeout(() => {
          router.push('/auth/error?message=' + encodeURIComponent(error.message || 'An error occurred during verification'))
        }, 2000)
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token, router, hasAttempted])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          <div className="mt-8">
            <div className="text-center">
              {error ? (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Verification Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        {error}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          {status}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {isLoading && (
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
