import { Badge } from "@/components/ui/badge"
import { categorizeIngredients } from "@/lib/common-ingredients"
import type { RecipeDetail } from "@/lib/spoonacular-api"

interface ShoppingListProps {
  recipe: RecipeDetail
}

export function ShoppingList({ recipe }: ShoppingListProps) {
  const { special: specialIngredients } = categorizeIngredients(recipe.extendedIngredients)

  if (specialIngredients.length === 0) {
    return (
      <div className="p-4 bg-accent/10 rounded-lg">
        <p className="text-center">Good news! You likely have all the ingredients for this recipe in your pantry!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Shopping List</h3>
        <Badge variant="outline">{specialIngredients.length} items</Badge>
      </div>
      <ul className="space-y-1">
        {specialIngredients.map((ingredient) => (
          <li key={ingredient.id} className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              {ingredient.amount > 0 && `${ingredient.amount} ${ingredient.unit} `}
              {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
