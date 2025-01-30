"use client"

import { useState, Suspense, type React } from "react"
import { useSearchParams } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Book {
  id: string
  title: string
  author: string
}

interface Scholar {
  id: string
  name: string
  expertise: string[]
}

interface Hadith {
  id: string
  title: string
  hadith: string
  source: string
}

interface SearchResults {
  books: Book[]
  scholars: Scholar[]
  hadiths: Hadith[]
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResults>({ books: [], scholars: [], hadiths: [] })
  const [loading, setLoading] = useState(false)
  const { supabase } = useSupabase()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Search books
      const { data: books } = await supabase
        .from("books")
        .select("id, title, author")
        .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
        .limit(5)

      // Search scholars
      const { data: scholars } = await supabase
        .from("scholars")
        .select("id, name, expertise")
        .or(`name.ilike.%${query}%,expertise.cs.{${query}}`)
        .limit(5)

      // Search hadiths (this is a mock search as we don't have hadiths in our database)
      const hadithResponse = await fetch(`https://random-hadith-generator.vercel.app/bukhari?q=${query}`)
      const hadithData = await hadithResponse.json()

      setResults({
        books: books || [],
        scholars: scholars || [],
        hadiths: hadithData.data ? [hadithData.data] : [],
      })
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Search Islamic Library</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books, authors, scholars, or hadiths"
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>
      <Tabs defaultValue="books">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="scholars">Scholars</TabsTrigger>
          <TabsTrigger value="hadiths">Hadiths</TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          {results.books.map((book) => (
            <Card key={book.id} className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/books/${book.id}`} className="hover:underline">
                    {book.title}
                  </Link>
                </h2>
                <p className="text-gray-600">{book.author}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="scholars">
          {results.scholars.map((scholar) => (
            <Card key={scholar.id} className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/scholars/${scholar.id}`} className="hover:underline">
                    {scholar.name}
                  </Link>
                </h2>
                <p className="text-gray-600">{scholar.expertise.join(", ")}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="hadiths">
          {results.hadiths.map((hadith, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{hadith.title}</h2>
                <p className="text-gray-600 mb-2">{hadith.hadith}</p>
                <p className="text-sm text-gray-500">Source: {hadith.source}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}

