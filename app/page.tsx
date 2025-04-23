"use client"

import { useState } from "react"
import { IngredientSearch } from "@/components/ingredient-search"
import { RecipeCard } from "@/components/recipe-card"
import { searchRecipesByIngredients, getRecipeById, type Recipe } from "@/lib/spoonacular-api"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Check the handleSearch function to ensure it's correctly calling the API and handling the results

  // The function should look like this:
  const handleSearch = async (ingredients: string[]) => {
    setIsLoading(true)
    try {
      // Make sure this function call is correct
      const results = await searchRecipesByIngredients(ingredients)

      // Fetch additional details for each recipe to get summaries
      const detailedRecipes = await Promise.all(
        results.map(async (recipe) => {
          try {
            const details = await getRecipeById(recipe.id)
            return {
              ...recipe,
              summary: details.summary,
              readyInMinutes: details.readyInMinutes,
              servings: details.servings,
            }
          } catch (error) {
            console.error(`Error fetching details for recipe ${recipe.id}:`, error)
            return recipe
          }
        }),
      )

      setRecipes(detailedRecipes)
      setHasSearched(true)
    } catch (error) {
      console.error("Error searching recipes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-primary/10 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center mb-12">
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading">
                Find Recipes With What You Have
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Enter ingredients you already have, and we'll show you what you can make
              </p>
            </div>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-soft border border-border/50 max-w-3xl mx-auto">
            <IngredientSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="w-full py-20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground">Searching for delicious recipes...</p>
          </div>
        </div>
      )}

      {hasSearched && !isLoading && (
        <section className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-heading">
                  {recipes.length > 0
                    ? `${recipes.length} Recipes You Can Make`
                    : "No recipes found with these ingredients"}
                </h2>
                {recipes.length > 0 && (
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                    Here are recipes that use ingredients you already have
                  </p>
                )}
              </div>
            </div>

            {recipes.length > 0 ? (
              <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch animate-fade-in">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-8 text-center max-w-md mx-auto">
                <p className="text-muted-foreground">
                  We couldn't find any recipes with those ingredients. Try adding more ingredients or different
                  combinations.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
