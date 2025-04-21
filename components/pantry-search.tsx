"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { commonIngredients } from "@/lib/common-ingredients"

interface PantrySearchProps {
  initialIngredients?: string[]
}

export function PantrySearch({ initialIngredients = commonIngredients }: PantrySearchProps) {
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients)
  const [newIngredient, setNewIngredient] = useState("")
  const router = useRouter()

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, newIngredient.trim().toLowerCase()])
      setNewIngredient("")
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.length > 0) {
      router.push(`/pantry-recipes?ingredients=${encodeURIComponent(ingredients.join(","))}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredient()
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add an ingredient..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button type="button" size="icon" onClick={addIngredient} disabled={!newIngredient.trim()}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add ingredient</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[50px] p-2 border rounded-md bg-background">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                {ingredient}
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {ingredient}</span>
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No ingredients added. Common pantry staples are included by default.
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Find Recipes With These Ingredients
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          We assume you have common pantry staples like salt, pepper, oils, butter, and spices.
        </p>
      </div>
    </div>
  )
}
