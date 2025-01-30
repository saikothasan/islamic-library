import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const books = [
  { title: "The Sealed Nectar", author: "Safiur-Rahman Al-Mubarakpuri", cover: "/book-cover-1.jpg" },
  { title: "Riyad as-Salihin", author: "Imam An-Nawawi", cover: "/book-cover-2.jpg" },
  { title: "The Divine Reality", author: "Hamza Andreas Tzortzis", cover: "/book-cover-3.jpg" },
  { title: "Reclaim Your Heart", author: "Yasmin Mogahed", cover: "/book-cover-4.jpg" },
]

export function NewArrivals() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{book.author}</p>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

