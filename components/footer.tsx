import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Reci-Pezy Logo" width={30} height={30} />
            <span className="text-lg font-bold text-primary">Reci-Pezy</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
          </nav>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Reci-Pezy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
