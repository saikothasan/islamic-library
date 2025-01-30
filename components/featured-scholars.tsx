import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const allScholars = [
  { name: "Imam Al-Ghazali", expertise: "Theology, Philosophy", image: "/scholar-1.jpg" },
  { name: "Ibn Taymiyyah", expertise: "Jurisprudence, Hadith", image: "/scholar-2.jpg" },
  { name: "Imam Bukhari", expertise: "Hadith Scholar", image: "/scholar-3.jpg" },
  { name: "Ibn Kathir", expertise: "Quranic Exegesis", image: "/scholar-4.jpg" },
  { name: "Imam Malik", expertise: "Islamic Law", image: "/scholar-5.jpg" },
  { name: "Al-Razi", expertise: "Philosophy, Medicine", image: "/scholar-6.jpg" },
  { name: "Ibn Sina", expertise: "Medicine, Philosophy", image: "/scholar-7.jpg" },
  { name: "Ibn Rushd", expertise: "Philosophy, Islamic Law", image: "/scholar-8.jpg" },
]

export function FeaturedScholars({ showAll = false }) {
  const scholars = showAll ? allScholars : allScholars.slice(0, 4)

  return (
    <section className="py-16 bg-[#f8f4e9]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{showAll ? "All Scholars" : "Featured Scholars"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scholars.map((scholar, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={scholar.image || "/placeholder.svg"}
                  alt={scholar.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="font-semibold text-lg mb-1">{scholar.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{scholar.expertise}</p>
                <Button variant="outline" className="w-full">
                  View Works
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

