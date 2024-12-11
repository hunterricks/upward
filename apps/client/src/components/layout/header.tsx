import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold">
            UPWARD™ Client Portal
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/projects" className="text-sm font-medium">
              Projects
            </Link>
            <Link href="/messages" className="text-sm font-medium">
              Messages
            </Link>
            <Link href="/documents" className="text-sm font-medium">
              Documents
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-sm font-medium">
            Profile
          </Link>
          <button className="text-sm font-medium">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
