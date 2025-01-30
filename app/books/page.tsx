"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Book {
  id: number
  title: string
  author: string
  cover_image: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const { supabase } = useSupabase()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase.from("books").select("*").order("title", { ascending: true })

      if (error) throw error
      setBooks(data || [])
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Islamic Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img src={book.cover_image || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{book.author}</p>
              <Link href={`/books/${book.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

