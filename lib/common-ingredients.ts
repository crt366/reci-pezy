// List of common pantry ingredients that users are assumed to have
export const commonIngredients = [
  "salt",
  "pepper",
  "olive oil",
  "vegetable oil",
  "butter",
  "milk",
  "flour",
  "sugar",
  "garlic",
  "onion",
  "eggs",
  "water",
  // Common spices
  "basil",
  "oregano",
  "thyme",
  "cinnamon",
  "paprika",
  "cumin",
]

// Function to check if an ingredient is a common pantry item
export function isCommonIngredient(ingredient: string): boolean {
  const lowerIngredient = ingredient.toLowerCase()
  return commonIngredients.some(
    (common) =>
      lowerIngredient.includes(common) ||
      // Handle plurals and variations
      (common.endsWith("o") && lowerIngredient.includes(common + "es")) ||
      lowerIngredient.includes(common + "s"),
  )
}

// Add the categorizeIngredients function that was missing

// Function to categorize ingredients into common and special
export function categorizeIngredients(
  ingredients: {
    id: number
    original: string
    amount: number
    unit: string
    name: string
  }[],
): {
  common: typeof ingredients
  special: typeof ingredients
} {
  const common: typeof ingredients = []
  const special: typeof ingredients = []

  ingredients.forEach((ingredient) => {
    if (isCommonIngredient(ingredient.name) || isCommonIngredient(ingredient.original)) {
      common.push(ingredient)
    } else {
      special.push(ingredient)
    }
  })

  return { common, special }
}
