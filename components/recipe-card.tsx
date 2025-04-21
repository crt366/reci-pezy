import Image from "next/image"
import Link from "next/link"
import { Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FavoriteButton } from "@/components/favorite-button"
import type { Recipe } from "@/lib/spoonacular-api"

interface RecipeCardProps {
  recipe: Recipe
  showPantryBadge?: boolean
  usedIngredients?: number
  missedIngredients?: number
}

export function RecipeCard({ recipe, showPantryBadge = false, usedIngredients, missedIngredients }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <Link href={`/recipe/${recipe.id}`} className="block">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton recipe={recipe} />
          </div>
          {showPantryBadge && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-accent text-white flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Pantry Friendly</span>
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 text-lg">{recipe.title}</h3>

          {(usedIngredients !== undefined || missedIngredients !== undefined) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {usedIngredients !== undefined && usedIngredients > 0 && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {usedIngredients} ingredients used
                </Badge>
              )}
              {missedIngredients !== undefined && missedIngredients > 0 && (
                <Badge variant="outline" className="text-muted-foreground">
                  {missedIngredients} additional needed
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        {recipe.readyInMinutes && (
          <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            {recipe.servings && <div>{recipe.servings} servings</div>}
          </CardFooter>
        )}
      </Link>
    </Card>
  )
}
