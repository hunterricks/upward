import { AuthForm } from '@/components/auth/auth-form'
import Image from 'next/image'

export default function LoginPage() {
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
              Sign in to your UPWARD™ account to continue managing your projects.
            </p>
          </div>

          <div className="mt-10">
            <AuthForm
              type="login"
              onSubmit={async (data) => {
                // TODO: Implement login logic
                console.log('Login:', data)
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
              "The UPWARD™ platform has streamlined our entire design workflow. It's been a game-changer."
            </blockquote>
            <p className="mt-4">
              <span className="font-semibold">Michael Chen</span> • Design Lead at Pixel Perfect
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
