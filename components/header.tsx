"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X, Heart, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="relative h-10 w-10">
            <Image src="/logo.png" alt="Reci-Pezy Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-primary">Reci-Pezy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Link>

          <div className="h-4 w-px bg-border mx-2"></div>

          <Button variant="default" size="sm" asChild>
            <Link href="/">Find Recipes</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 px-4 border-t animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
            <div className="h-px bg-border my-2"></div>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Find Recipes
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
