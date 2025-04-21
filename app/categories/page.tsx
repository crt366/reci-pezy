import Link from "next/link"
import { PageLayout } from "../page-layout"
import { Card, CardContent } from "@/components/ui/card"

const cuisines = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
]

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
]

export default function CategoriesPage() {
  return (
    <PageLayout>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Browse Categories</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore recipes by cuisine or dietary preference
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Cuisines</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cuisines.map((cuisine) => (
                  <Link key={cuisine} href={`/search?cuisine=${encodeURIComponent(cuisine)}`}>
                    <Card className="hover:bg-muted transition-colors">
                      <CardContent className="p-4 text-center">
                        <span>{cuisine}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Dietary Preferences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {diets.map((diet) => (
                  <Link key={diet} href={`/search?diet=${encodeURIComponent(diet)}`}>
                    <Card className="hover:bg-muted transition-colors">
                      <CardContent className="p-4 text-center">
                        <span>{diet}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
