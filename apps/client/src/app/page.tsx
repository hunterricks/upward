import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="font-bold">UPWARD™</div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

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
                  UPWARD™ provides a seamless platform for managing design projects, collaborating with your team, and delivering exceptional results to your clients.
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
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src="/images/dashboard-preview.jpg"
                    alt="Dashboard preview"
                    width={800}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p> 2024 UPWARD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
