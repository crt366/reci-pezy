export default function Loading() {
  return (
    <div className="container px-4 py-12 md:px-6 text-center">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-muted rounded w-1/3 mx-auto"></div>
        <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video bg-muted rounded"></div>
              <div className="h-6 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
