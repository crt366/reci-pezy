"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/spoonacular-api"
import { useState, useEffect } from "react"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Check if recipe is in favorites
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.some((fav: Recipe) => fav.id === recipe.id))
    }
  }, [recipe.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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
    <Card
      className="overflow-hidden h-full card-hover bg-background/50 backdrop-blur-sm border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/recipe/${recipe.id}`} className="block h-full">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            fill
            className={`object-cover transition-all duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-3 right-3 bg-white/90 hover:bg-white border-none shadow-md transition-transform duration-300 ${isFavorite ? "scale-110" : "scale-100"}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 transition-colors ${isFavorite ? "fill-primary text-primary" : ""}`} />
          </Button>

          {(recipe.readyInMinutes || recipe.servings) && (
            <div className="absolute bottom-3 left-3 flex gap-3">
              {recipe.readyInMinutes && (
                <Badge variant="outline" className="bg-black/70 text-white border-none shadow-sm backdrop-blur-sm">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {recipe.readyInMinutes} min
                </Badge>
              )}
              {recipe.servings && (
                <Badge variant="outline" className="bg-black/70 text-white border-none shadow-sm backdrop-blur-sm">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {recipe.servings}
                </Badge>
              )}
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="font-semibold line-clamp-2 text-lg mb-3 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.usedIngredientCount !== undefined && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {recipe.usedIngredientCount} ingredients used
              </Badge>
            )}
            {recipe.missedIngredientCount !== undefined && recipe.missedIngredientCount > 0 && (
              <Badge variant="outline" className="bg-muted">
                {recipe.missedIngredientCount} more needed
              </Badge>
            )}
          </div>

          {recipe.summary && (
            <p
              className="text-sm text-muted-foreground line-clamp-3"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
