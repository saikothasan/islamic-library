import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedHadith() {
  return (
    <section className="py-16 bg-[#f8f4e9]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Hadith</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sahih al-Bukhari 6018</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4 text-center">
              The Prophet (ﷺ) said, "Religion is very easy and whoever overburdens himself in his religion will not be
              able to continue in that way. So you should not be extremists, but try to be near to perfection and
              receive the good tidings that you will be rewarded; and gain strength by worshipping in the mornings, the
              afternoons, and during the last hours of the nights."
            </p>
            <p className="text-lg mb-4 text-center font-semibold">Narrated by Abu Huraira</p>
            <div className="text-center">
              <Link href="/hadith">
                <Button variant="outline">Explore Hadith</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

