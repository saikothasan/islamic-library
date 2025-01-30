import { FeaturedCategories } from "@/components/featured-categories"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Book Categories</h1>
      <FeaturedCategories showAll={true} />
    </div>
  )
}

