"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Plus, Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { commonIngredients } from "@/lib/common-ingredients"

interface IngredientSearchProps {
  onSearch: (ingredients: string[]) => void
  initialIngredients?: string[]
  isLoading?: boolean
}

export function IngredientSearch({ onSearch, initialIngredients = [], isLoading = false }: IngredientSearchProps) {
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients)
  const [newIngredient, setNewIngredient] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (newIngredient.trim().length > 0) {
      const filtered = commonIngredients.filter(
        (ingredient) =>
          ingredient.toLowerCase().includes(newIngredient.toLowerCase()) &&
          !ingredients.includes(ingredient.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [newIngredient, ingredients])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const addIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim().toLowerCase()
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      setIngredients([...ingredients, trimmedIngredient])
      setNewIngredient("")
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.length > 0) {
      onSearch(ingredients)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredient(newIngredient)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Add an ingredient..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => newIngredient.trim() && setSuggestions.length > 0 && setShowSuggestions(true)}
                className="pl-4 pr-10 py-6 text-base shadow-sm border-input/50 input-focus-ring"
                autoComplete="off"
              />
              {newIngredient && (
                <button
                  type="button"
                  onClick={() => setNewIngredient("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear input</span>
                </button>
              )}
            </div>
            <Button
              type="button"
              size="icon"
              onClick={() => addIngredient(newIngredient)}
              disabled={!newIngredient.trim()}
              className="h-12 w-12 rounded-full shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add ingredient</span>
            </Button>
          </div>

          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full bg-background border rounded-md mt-1 shadow-soft overflow-hidden animate-fade-in"
            >
              <ul className="py-1 max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2.5 hover:bg-muted cursor-pointer flex items-center text-sm"
                    onClick={() => addIngredient(suggestion)}
                  >
                    <Plus className="h-3.5 w-3.5 mr-2 text-primary" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-background/50 shadow-sm">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/15 transition-colors"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {ingredient}</span>
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground flex items-center">
              <ChevronDown className="h-4 w-4 mr-1 text-primary animate-pulse-subtle" />
              Add ingredients you have to find matching recipes
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-base font-medium shadow-md hover:shadow-lg transition-all"
          disabled={ingredients.length === 0 || isLoading}
        >
          <Search className="mr-2 h-5 w-5" />
          {isLoading ? "Searching..." : "Find Recipes"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          We assume you have common pantry staples like salt, pepper, oils, and basic spices.
        </p>
      </div>
    </div>
  )
}
