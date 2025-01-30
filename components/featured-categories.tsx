import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Feather, Globe, Users, Heart, ChurchIcon as Mosque, Scroll, GraduationCap } from "lucide-react"

const allCategories = [
  { title: "Quran & Tafsir", icon: Book },
  { title: "Hadith & Sunnah", icon: Feather },
  { title: "Islamic History", icon: Globe },
  { title: "Islamic Philosophy", icon: Users },
  { title: "Spirituality & Sufism", icon: Heart },
  { title: "Islamic Law (Fiqh)", icon: Scroll },
  { title: "Islamic Ethics", icon: Mosque },
  { title: "Islamic Education", icon: GraduationCap },
]

export function FeaturedCategories({ showAll = false }) {
  const categories = showAll ? allCategories : allCategories.slice(0, 4)

  return (
    <section className="py-16 bg-[#f8f4e9]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{showAll ? "All Categories" : "Featured Categories"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <category.icon className="w-12 h-12 mx-auto text-[#2c3e50]" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center text-xl">{category.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

