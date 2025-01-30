import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 bg-[#34495e] text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-10"></div>
      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore the Wisdom of Islamic Literature</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover a vast collection of Islamic books, manuscripts, and resources from renowned scholars throughout
          history.
        </p>
        <div className="max-w-md mx-auto flex">
          <Input
            type="search"
            placeholder="Search for books, authors, or topics"
            className="flex-grow bg-white text-gray-800"
          />
          <Button type="submit" className="ml-2 bg-[#e4d6a7] text-[#2c3e50] hover:bg-[#d4c697]">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

