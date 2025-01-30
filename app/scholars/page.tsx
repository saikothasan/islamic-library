import { FeaturedScholars } from "@/components/featured-scholars"

export default function ScholarsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Islamic Scholars</h1>
      <FeaturedScholars showAll={true} />
    </div>
  )
}

