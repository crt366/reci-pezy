export default function Loading() {
  return (
    <div className="container px-4 py-12 md:px-6 text-center">
      <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
        <div className="h-10 bg-muted rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
        <div className="aspect-video bg-muted rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}
