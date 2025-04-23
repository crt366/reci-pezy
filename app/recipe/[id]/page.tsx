"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Clock, Users, Heart, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getRecipeById, type RecipeDetail } from "@/lib/spoonacular-api"
import { isCommonIngredient } from "@/lib/common-ingredients"
import Link from "next/link"

export default function RecipePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? Number.parseInt(params.id) : 0

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id)
        setRecipe(data)

        // Check if recipe is in favorites
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites)
          setIsFavorite(favorites.some((fav: { id: number }) => fav.id === id))
        }
      } catch (err) {
        setError("Failed to load recipe details")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchRecipe()
    }
  }, [id])

  const toggleFavorite = () => {
    if (!recipe) return

    const storedFavorites = localStorage.getItem("favorites")
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav: { id: number }) => fav.id !== recipe.id)
    } else {
      // Add to favorites
      favorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      })
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-20 md:px-6 text-center">
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="aspect-video bg-muted rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="container px-4 py-20 md:px-6 text-center">
        <div className="max-w-md mx-auto bg-destructive/10 p-6 rounded-lg">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive font-medium mb-4">{error || "Recipe not found"}</p>
          <Button asChild>
            <Link href="/">Return to home</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Categorize ingredients
  const haveIngredients = recipe.extendedIngredients.filter(
    (ingredient) => isCommonIngredient(ingredient.name) || isCommonIngredient(ingredient.original),
  )

  const needIngredients = recipe.extendedIngredients.filter(
    (ingredient) => !isCommonIngredient(ingredient.name) && !isCommonIngredient(ingredient.original),
  )

  return (
    <div className="container px-4 py-8 md:py-12 md:px-6">
      <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search
      </Link>

      <article className="mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-heading">{recipe.title}</h1>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1.5 ${
                isFavorite ? "bg-primary/10 border-primary/30 text-primary" : ""
              }`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              {isFavorite ? "Saved" : "Save Recipe"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {recipe.diets?.map((diet) => (
              <Badge key={diet} variant="secondary" className="bg-primary/10 border-primary/30 text-primary">
                {diet}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {recipe.readyInMinutes && (
              <div className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4 text-primary" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center">
                <Users className="mr-1.5 h-4 w-4 text-primary" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl shadow-soft">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: recipe.summary }} />

          <div className="grid md:grid-cols-2 gap-8">
            {needIngredients.length > 0 && (
              <div className="space-y-4 bg-muted/20 p-6 rounded-xl border border-border/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Shopping List
                </h2>
                <ul className="space-y-3">
                  {needIngredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>
                        {ingredient.amount > 0 && `${ingredient.amount} ${ingredient.unit} `}
                        {ingredient.original}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {haveIngredients.length > 0 && (
              <div className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Ingredients You Have
                </h2>
                <ul className="space-y-3">
                  {haveIngredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex items-start text-muted-foreground">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        {ingredient.amount > 0 && `${ingredient.amount} ${ingredient.unit} `}
                        {ingredient.original}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold gradient-heading">Instructions</h2>
            {recipe.analyzedInstructions.length > 0 ? (
              <ol className="space-y-6">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number} className="flex group">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      {step.number}
                    </div>
                    <div className="pt-1">
                      <p>{step.step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions || "No instructions available." }} />
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
