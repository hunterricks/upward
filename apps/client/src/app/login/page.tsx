'use client'

import { AuthForm } from '@/components/auth/auth-form'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const from = searchParams.get('from')

  const handleSubmit = async (data: any) => {
    try {
      const result = await signIn('credentials', {
        ...data,
        callbackUrl: from || '/dashboard',
        redirect: false,
      })

      if (result?.error) {
        console.error('Login error:', result.error)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your UPWARD account to continue managing your projects.
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {error === 'OAuthSignin' && 'Error starting Google sign in. Please try again.'}
                    {error === 'OAuthCallback' && 'Error during Google sign in. Please try again.'}
                    {error === 'OAuthCreateAccount' && 'Error creating your account. Please try again.'}
                    {error === 'EmailCreateAccount' && 'Error creating your account. Please try again.'}
                    {error === 'Callback' && 'Error during sign in. Please try again.'}
                    {error === 'OAuthAccountNotLinked' && 'This email is already associated with another account.'}
                    {error === 'default' && 'An error occurred. Please try again.'}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10">
            <AuthForm
              type="login"
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/auth-background.jpg"
          alt="Office interior"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 flex items-end z-20 p-20">
          <div className="text-white">
            <blockquote className="text-xl font-semibold">
              "UPWARD has transformed how we manage our design projects. The platform is intuitive and powerful."
            </blockquote>
            <p className="mt-4">
              <span className="font-semibold">Sarah Johnson</span> • Creative Director at Studio Nine
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
