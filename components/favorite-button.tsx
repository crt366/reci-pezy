"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/spoonacular-api"

interface FavoriteButtonProps {
  recipe: Recipe
}

export function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Check if recipe is in favorites
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.some((fav: Recipe) => fav.id === recipe.id))
    }
  }, [recipe.id])

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites")
    let favorites: Recipe[] = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav: Recipe) => fav.id !== recipe.id)
    } else {
      // Add to favorites
      favorites.push(recipe)
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        toggleFavorite()
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-accent" : ""}`} />
    </Button>
  )
}
