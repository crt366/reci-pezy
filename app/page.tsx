import { PageLayout } from "./page-layout"
import { SearchForm } from "@/components/search-form"
import { RecipeCard } from "@/components/recipe-card"
import { getRandomRecipes } from "@/lib/spoonacular-api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  const { recipes } = await getRandomRecipes(6)

  return (
    <PageLayout>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Your Perfect Recipe</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover delicious recipes for any occasion, diet, or ingredient preference.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Cook With What You Have</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find recipes you can make right now with ingredients already in your pantry.
              </p>
              <div className="pt-4">
                <Link href="/pantry-recipes">
                  <Button size="lg" className="gap-2">
                    Find Pantry Recipes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Recipes</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our selection of delicious recipes curated just for you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch pt-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
