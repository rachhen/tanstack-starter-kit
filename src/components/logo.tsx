import { Settings } from 'lucide-react'

export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Settings />
      </div>
      <h1>Better Auth UI</h1>
    </div>
  )
}
