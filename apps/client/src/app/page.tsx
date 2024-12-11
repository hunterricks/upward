import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  Manage your design projects with ease
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  UPWARD provides a seamless platform for managing design projects, collaborating with your team, and delivering exceptional results to your clients.
                </p>
                <div className="mt-10 flex gap-4">
                  <Link
                    href="/register"
                    className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Start your free trial
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="/dashboard-preview.png"
                  alt="Dashboard preview"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <p className="text-center text-sm text-gray-600">
              {new Date().getFullYear()} UPWARD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
