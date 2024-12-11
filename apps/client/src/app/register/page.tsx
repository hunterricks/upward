'use client'

import { AuthForm } from '@/components/auth/auth-form'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Join UPWARD and start managing your design projects with ease.
            </p>
          </div>

          <div className="mt-10">
            <AuthForm
              type="register"
              onSubmit={async (data) => {
                // TODO: Implement registration logic
                console.log('Register:', data)
              }}
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
