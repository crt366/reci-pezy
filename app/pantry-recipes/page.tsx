import { PageLayout } from "../page-layout"
import { PantrySearch } from "@/components/pantry-search"
import { RecipeCard } from "@/components/recipe-card"
import { searchRecipesByIngredients } from "@/lib/spoonacular-api"
import { commonIngredients } from "@/lib/common-ingredients"

interface PantryRecipesPageProps {
  searchParams: { ingredients?: string }
}

export default async function PantryRecipesPage({ searchParams }: PantryRecipesPageProps) {
  // Parse ingredients from search params or use common ingredients
  const ingredientsList = searchParams.ingredients
    ? decodeURIComponent(searchParams.ingredients).split(",")
    : commonIngredients

  // Search for recipes using the ingredients
  const recipes = await searchRecipesByIngredients({
    ingredients: ingredientsList,
    ranking: 1, // Maximize used ingredients
    number: 12,
  })

  return (
    <PageLayout>
      <section className="w-full py-12 md:py-24 bg-accent/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pantry Recipes</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find recipes you can make with ingredients you already have
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <PantrySearch initialIngredients={ingredientsList} />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter">
                {recipes.length > 0
                  ? `${recipes.length} Recipes You Can Make Now`
                  : "No recipes found with these ingredients"}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                These recipes use ingredients you already have in your pantry
              </p>
            </div>
          </div>

          {recipes.length > 0 && (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  showPantryBadge={true}
                  usedIngredients={recipe.usedIngredientCount}
                  missedIngredients={recipe.missedIngredientCount}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
