'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to UPWARD™
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your trusted partner in design and development. We bring your ideas to life with precision and creativity.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {!session ? (
            <>
              <Link
                href="/register"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-900 mb-4">
                Welcome back, {session.user?.name}!
              </p>
              <p className="text-gray-600">
                You're signed in to your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
