import type { ReactNode } from "react"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Islamic Library Blog</h1>
      {children}
    </div>
  )
}

