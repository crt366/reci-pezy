import Image from "next/image"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="Reci-Pezy Logo" fill className="object-contain" />
              </div>
              <span className="text-lg font-bold text-primary">Reci-Pezy</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Find delicious recipes with ingredients you already have.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-1 text-sm">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" /> by Reci-Pezy Team
            </div>
            <div className="text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Reci-Pezy. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
