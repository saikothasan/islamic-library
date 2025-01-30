"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BookWithStatus {
  id: number
  title: string
  author: string
  cover_image: string
  status: "want_to_read" | "currently_reading" | "read"
}

export default function ReadingListPage() {
  const [books, setBooks] = useState<BookWithStatus[]>([])
  const { supabase, session } = useSupabase()

  useEffect(() => {
    if (session) {
      fetchReadingList()
    }
  }, [session])

  const fetchReadingList = async () => {
    try {
      const { data, error } = await supabase
        .from("reading_lists")
        .select("books(id, title, author, cover_image), status")
        .eq("user_id", session!.user.id)

      if (error) throw error
      setBooks(data.map((item: any) => ({ ...item.books, status: item.status })))
    } catch (error) {
      console.error("Error fetching reading list:", error)
    }
  }

  const updateBookStatus = async (bookId: number, newStatus: BookWithStatus["status"]) => {
    try {
      const { error } = await supabase
        .from("reading_lists")
        .update({ status: newStatus })
        .eq("user_id", session!.user.id)
        .eq("book_id", bookId)

      if (error) throw error
      fetchReadingList()
    } catch (error) {
      console.error("Error updating book status:", error)
    }
  }

  if (!session) return <div>Please log in to view your reading list.</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Reading List</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="want_to_read">Want to Read</TabsTrigger>
          <TabsTrigger value="currently_reading">Currently Reading</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <BookGrid books={books} updateBookStatus={updateBookStatus} />
        </TabsContent>
        <TabsContent value="want_to_read">
          <BookGrid
            books={books.filter((book) => book.status === "want_to_read")}
            updateBookStatus={updateBookStatus}
          />
        </TabsContent>
        <TabsContent value="currently_reading">
          <BookGrid
            books={books.filter((book) => book.status === "currently_reading")}
            updateBookStatus={updateBookStatus}
          />
        </TabsContent>
        <TabsContent value="read">
          <BookGrid books={books.filter((book) => book.status === "read")} updateBookStatus={updateBookStatus} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookGrid({
  books,
  updateBookStatus,
}: {
  books: BookWithStatus[]
  updateBookStatus: (bookId: number, newStatus: BookWithStatus["status"]) => Promise<void>
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {books.map((book) => (
        <Card key={book.id} className="overflow-hidden">
          <CardContent className="p-0">
            <img src={book.cover_image || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{book.author}</p>
            <div className="flex space-x-2 mb-2">
              <Button
                variant={book.status === "want_to_read" ? "default" : "outline"}
                size="sm"
                onClick={() => updateBookStatus(book.id, "want_to_read")}
              >
                Want to Read
              </Button>
              <Button
                variant={book.status === "currently_reading" ? "default" : "outline"}
                size="sm"
                onClick={() => updateBookStatus(book.id, "currently_reading")}
              >
                Reading
              </Button>
              <Button
                variant={book.status === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => updateBookStatus(book.id, "read")}
              >
                Read
              </Button>
            </div>
            <Link href={`/books/${book.id}`}>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

