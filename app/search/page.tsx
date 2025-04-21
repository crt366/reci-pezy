import { PageLayout } from "../page-layout"
import { SearchForm } from "@/components/search-form"
import { RecipeCard } from "@/components/recipe-card"
import { searchRecipes } from "@/lib/spoonacular-api"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  let recipes = []
  let totalResults = 0

  if (query) {
    const searchResults = await searchRecipes({ query })
    recipes = searchResults.results
    totalResults = searchResults.totalResults
  }

  return (
    <PageLayout>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Search Recipes</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find recipes by name, ingredient, or cuisine
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <SearchForm />
            </div>
          </div>

          {query && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">
                {totalResults > 0 ? `Found ${totalResults} results for "${query}"` : `No results found for "${query}"`}
              </h2>

              {totalResults > 0 && (
                <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
