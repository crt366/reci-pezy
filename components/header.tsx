"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Reci-Pezy Logo" width={40} height={40} />
          <span className="text-xl font-bold text-primary">Reci-Pezy</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/pantry-recipes" className="text-sm font-medium hover:underline underline-offset-4">
            Pantry Recipes
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:underline underline-offset-4">
            Categories
          </Link>
          <Link href="/favorites" className="text-sm font-medium hover:underline underline-offset-4">
            Favorites
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/search" className="hidden md:flex">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 px-4">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/pantry-recipes" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Pantry Recipes
            </Link>
            <Link href="/categories" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link href="/favorites" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Favorites
            </Link>
            <Link href="/search" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
