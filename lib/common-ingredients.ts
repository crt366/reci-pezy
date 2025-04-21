// List of common pantry ingredients that users are assumed to have
export const commonIngredients = [
  "salt",
  "pepper",
  "olive oil",
  "vegetable oil",
  "canola oil",
  "butter",
  "milk",
  "flour",
  "sugar",
  "brown sugar",
  "garlic",
  "onion",
  "baking powder",
  "baking soda",
  "vanilla extract",
  "eggs",
  "water",
  // Common spices
  "basil",
  "oregano",
  "thyme",
  "rosemary",
  "cumin",
  "paprika",
  "cinnamon",
  "nutmeg",
  "chili powder",
  "bay leaf",
  "cayenne pepper",
  "coriander",
  "ginger",
  "turmeric",
  "allspice",
  "cloves",
  "mustard",
  "vinegar",
  "soy sauce",
  "worcestershire sauce",
  "honey",
  "maple syrup",
  "ketchup",
  "mayonnaise",
  "dijon mustard",
  "rice",
  "pasta",
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

// Function to filter out common ingredients from a list
export function filterCommonIngredients(ingredients: string[]): string[] {
  return ingredients.filter((ingredient) => !isCommonIngredient(ingredient))
}

// Function to separate ingredients into common and special
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
