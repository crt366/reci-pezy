import Image from "next/image"
import { Clock, Users, Check, ShoppingBag } from "lucide-react"
import { PageLayout } from "../../page-layout"
import { getRecipeById } from "@/lib/spoonacular-api"
import { Badge } from "@/components/ui/badge"
import { FavoriteButton } from "@/components/favorite-button"
import { isCommonIngredient } from "@/lib/common-ingredients"

interface RecipePageProps {
  params: { id: string }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeById(Number.parseInt(params.id))

  // Categorize ingredients
  const haveIngredients = recipe.extendedIngredients.filter(
    (ingredient) => isCommonIngredient(ingredient.name) || isCommonIngredient(ingredient.original),
  )

  const needIngredients = recipe.extendedIngredients.filter(
    (ingredient) => !isCommonIngredient(ingredient.name) && !isCommonIngredient(ingredient.original),
  )

  return (
    <PageLayout>
      <article className="container px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{recipe.title}</h1>
              <FavoriteButton recipe={recipe} />
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.diets?.map((diet) => (
                <Badge key={diet} variant="secondary">
                  {diet}
                </Badge>
              ))}
              {recipe.cuisines?.map((cuisine) => (
                <Badge key={cuisine} variant="outline">
                  {cuisine}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {recipe.readyInMinutes && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{recipe.readyInMinutes} mins</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              )}
            </div>

            <div className="relative aspect-video overflow-hidden rounded-lg">
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

            <div className="grid md:grid-cols-2 gap-6">
              {needIngredients.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-bold">Shopping List</h2>
                  </div>
                  <ul className="space-y-2">
                    {needIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex items-start">
                        <span className="mr-2">•</span>
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
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-bold">Ingredients You Have</h2>
                  </div>
                  <ul className="space-y-2">
                    {haveIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex items-start text-muted-foreground">
                        <Check className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
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

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Instructions</h2>
              {recipe.analyzedInstructions.length > 0 ? (
                <ol className="space-y-4">
                  {recipe.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number} className="flex">
                      <span className="mr-4 font-bold">{step.number}.</span>
                      <span>{step.step}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions || "No instructions available." }} />
              )}
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}
