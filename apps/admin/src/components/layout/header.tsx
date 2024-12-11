import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold">
            UPWARD™ Admin
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/clients" className="text-sm font-medium">
              Clients
            </Link>
            <Link href="/projects" className="text-sm font-medium">
              Projects
            </Link>
            <Link href="/settings" className="text-sm font-medium">
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
