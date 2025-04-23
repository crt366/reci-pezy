"use client"

import { useState, useEffect } from "react"
import { RecipeCard } from "@/components/recipe-card"
import type { Recipe } from "@/lib/spoonacular-api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Search } from "lucide-react"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    setIsLoading(false)
  }, [])

  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search
      </Link>

      <section className="w-full">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-heading">Your Favorite Recipes</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Quick access to recipes you've saved
            </p>
          </div>
        </div>

        <div className="mt-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-pulse space-y-8">
                <Heart className="h-12 w-12 text-primary/50 mx-auto" />
                <p className="text-muted-foreground">Loading your favorites...</p>
              </div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch animate-fade-in">
              {favorites.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto bg-muted/20 rounded-xl border border-border/50 shadow-sm">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">You haven't saved any favorites yet.</p>
              <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Find Recipes
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
