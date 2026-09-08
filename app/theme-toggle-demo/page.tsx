import { ThemeToggle } from "@/components/ui/theme-toggle"

function DefaultToggle() {
  return (
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default function ThemeToggleDemoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink">
      <DefaultToggle />
    </main>
  )
}
