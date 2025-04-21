// Spoonacular API service

type SearchRecipesParams = {
  query?: string
  cuisine?: string
  diet?: string
  intolerances?: string
  number?: number
  offset?: number
}

type SearchByIngredientsParams = {
  ingredients: string[]
  number?: number
  ranking?: 1 | 2 // 1 = maximize used ingredients, 2 = minimize missing ingredients
  ignorePantry?: boolean
}

type RecipeSearchResponse = {
  results: Recipe[]
  offset: number
  number: number
  totalResults: number
}

export type Recipe = {
  id: number
  title: string
  image: string
  imageType: string
  readyInMinutes?: number
  servings?: number
  sourceUrl?: string
  usedIngredientCount?: number
  missedIngredientCount?: number
  likes?: number
}

export type RecipeDetail = Recipe & {
  summary: string
  instructions: string
  extendedIngredients: {
    id: number
    original: string
    amount: number
    unit: string
    name: string
  }[]
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

export async function searchRecipesByIngredients(params: SearchByIngredientsParams): Promise<Recipe[]> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY as string,
    ingredients: params.ingredients.join(","),
    number: params.number?.toString() || "12",
    ranking: params.ranking?.toString() || "1",
    ignorePantry: params.ignorePantry?.toString() || "false",
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
