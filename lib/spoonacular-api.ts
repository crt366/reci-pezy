// Spoonacular API service

export type Recipe = {
  id: number
  title: string
  image: string
  imageType?: string
  usedIngredientCount?: number
  missedIngredientCount?: number
  missedIngredients?: Ingredient[]
  usedIngredients?: Ingredient[]
  unusedIngredients?: Ingredient[]
  likes?: number
  readyInMinutes?: number
  servings?: number
  summary?: string
}

export type Ingredient = {
  id: number
  amount: number
  unit: string
  unitLong?: string
  unitShort?: string
  name: string
  original: string
  originalName?: string
  meta?: string[]
  image: string
}

export type RecipeDetail = Recipe & {
  summary: string
  instructions: string
  extendedIngredients: Ingredient[]
  analyzedInstructions: {
    name: string
    steps: {
      number: number
      step: string
      ingredients: {
        id: number
        name: string
        image: string
      }[]
    }[]
  }[]
  diets: string[]
  cuisines: string[]
  dishTypes: string[]
}

type SearchRecipesParams = {
  query?: string
  cuisine?: string
  diet?: string
  intolerances?: string
  number?: number
  offset?: number
}

type RecipeSearchResponse = {
  results: Recipe[]
  offset: number
  number: number
  totalResults: number
}

const API_KEY = process.env.SPOONACULAR_API_KEY
const BASE_URL = "https://api.spoonacular.com"

export async function searchRecipes(params: SearchRecipesParams): Promise<RecipeSearchResponse> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY as string,
    ...params,
    number: params.number?.toString() || "12",
  })

  const response = await fetch(`${BASE_URL}/recipes/complexSearch?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`)
  }

  return response.json()
}

// Check the searchRecipesByIngredients function to ensure it's correctly formatted

// The function should look like this:
export async function searchRecipesByIngredients(ingredients: string[], number = 12): Promise<Recipe[]> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY as string,
    ingredients: ingredients.join(","),
    number: number.toString(),
    ranking: "1", // Maximize used ingredients
    ignorePantry: "false",
  })

  const response = await fetch(`${BASE_URL}/recipes/findByIngredients?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes by ingredients: ${response.statusText}`)
  }

  return response.json()
}

export async function getRecipeById(id: number): Promise<RecipeDetail> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY as string,
    includeNutrition: "false",
  })

  const response = await fetch(`${BASE_URL}/recipes/${id}/information?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe details: ${response.statusText}`)
  }

  return response.json()
}

export async function getRandomRecipes(number = 6): Promise<{ recipes: Recipe[] }> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY as string,
    number: number.toString(),
  })

  const response = await fetch(`${BASE_URL}/recipes/random?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch random recipes: ${response.statusText}`)
  }

  return response.json()
}
