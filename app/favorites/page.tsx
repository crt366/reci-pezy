"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "../page-layout"
import { RecipeCard } from "@/components/recipe-card"
import type { Recipe } from "@/lib/spoonacular-api"

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
    <PageLayout>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Favorite Recipes</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Quick access to recipes you've saved
              </p>
            </div>
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="text-center">Loading your favorites...</div>
            ) : favorites.length > 0 ? (
              <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {favorites.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground">You haven't saved any favorites yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
