"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Bookmark } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Hadith {
  title: string
  hadith: string
  source: string
  chapter: string
  chapterNumber: number
  hadithNumber: number
}

const collections = [
  { id: "bukhari", name: "Sahih Al-Bukhari", limit: 7563 },
  { id: "muslim", name: "Sahih Muslim", limit: 3032 },
  { id: "abudawud", name: "Abu Dawud", limit: 3998 },
  { id: "ibnmajah", name: "Ibn Majah", limit: 4342 },
  { id: "tirmidhi", name: "Al-Tirmidhi", limit: 3956 },
]

export default function HadithPage() {
  const [activeCollection, setActiveCollection] = useState(collections[0].id)
  const [hadith, setHadith] = useState<Hadith | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentNumber, setCurrentNumber] = useState(1)
  const { supabase, session } = useSupabase()

  const fetchHadith = async (collection: string, number?: number) => {
    setLoading(true)
    try {
      const url = number
        ? `https://random-hadith-generator.vercel.app/${collection}/${number}`
        : `https://random-hadith-generator.vercel.app/${collection}`
      const response = await fetch(url)
      const data = await response.json()
      setHadith(data.data)
      setCurrentNumber(data.data.hadithNumber)
    } catch (error) {
      console.error("Error fetching hadith:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHadith(activeCollection)
  }, [activeCollection, fetchHadith])

  const handlePrevious = () => {
    if (currentNumber > 1) {
      fetchHadith(activeCollection, currentNumber - 1)
    }
  }

  const handleNext = () => {
    const currentCollection = collections.find((c) => c.id === activeCollection)
    if (currentCollection && currentNumber < currentCollection.limit) {
      fetchHadith(activeCollection, currentNumber + 1)
    }
  }

  const handleRandom = () => {
    fetchHadith(activeCollection)
  }

  const handleBookmark = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark hadiths.",
        variant: "destructive",
      })
      return
    }

    if (!hadith) return

    try {
      const { data, error } = await supabase.from("hadith_bookmarks").upsert(
        {
          user_id: session.user.id,
          collection: activeCollection,
          hadith_number: hadith.hadithNumber,
        },
        { onConflict: "user_id,collection,hadith_number" },
      )

      if (error) throw error

      toast({
        title: "Bookmark added",
        description: `${activeCollection} #${hadith.hadithNumber} has been bookmarked.`,
      })
    } catch (error) {
      console.error("Error adding bookmark:", error)
      toast({
        title: "Error",
        description: "Failed to add bookmark. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Hadith Collections</h1>
      <Tabs value={activeCollection} onValueChange={setActiveCollection}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          {collections.map((collection) => (
            <TabsTrigger key={collection.id} value={collection.id}>
              {collection.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {collections.map((collection) => (
          <TabsContent key={collection.id} value={collection.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{collection.name}</span>
                  <span className="text-sm text-muted-foreground">Total Hadiths: {collection.limit}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : hadith ? (
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">{hadith.title}</div>
                    <div className="text-xl leading-relaxed" dir="auto">
                      {hadith.hadith}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Chapter: {hadith.chapter}</p>
                      <p>Chapter Number: {hadith.chapterNumber}</p>
                      <p>Hadith Number: {hadith.hadithNumber}</p>
                      <p>Source: {hadith.source}</p>
                    </div>
                  </div>
                ) : null}
                <div className="flex justify-between items-center mt-6">
                  <Button onClick={handlePrevious} disabled={loading || currentNumber <= 1}>
                    Previous
                  </Button>
                  <Button onClick={handleRandom} disabled={loading}>
                    Random Hadith
                  </Button>
                  <Button onClick={handleNext} disabled={loading || currentNumber >= collection.limit}>
                    Next
                  </Button>
                </div>
                <div className="mt-4">
                  <Button onClick={handleBookmark} disabled={loading || !hadith}>
                    <Bookmark className="mr-2 h-4 w-4" /> Bookmark
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

