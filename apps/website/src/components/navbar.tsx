"use client"

import { ThemeToggle } from "@upward/ui"
import { useState, useEffect } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <a href="/" className="text-2xl font-bold text-white">
          UPWARD™
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {[
            ['Home', '/'],
            ['Services', '/services'],
            ['Work', '/work'],
            ['About', '/about'],
            ['Contact', '/contact'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
