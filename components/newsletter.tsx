import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  return (
    <section className="py-16 bg-[#34495e] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Stay updated with our latest additions, events, and Islamic knowledge resources.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <Input type="email" placeholder="Enter your email" className="flex-grow bg-white text-gray-800" />
          <Button type="submit" className="bg-[#e4d6a7] text-[#2c3e50] hover:bg-[#d4c697]">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

