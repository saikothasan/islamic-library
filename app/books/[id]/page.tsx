"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  description: string
  cover_image: string
  publication_year: number
  category: string
}

interface Review {
  id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  profiles: { name: string }
}

interface ReadingListItem {
  status: "want_to_read" | "currently_reading" | "read"
}

export default function BookPage() {
  const [book, setBook] = useState<Book | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [userReview, setUserReview] = useState<Review | null>(null)
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" })
  const [readingListStatus, setReadingListStatus] = useState<ReadingListItem["status"] | null>(null)
  const { supabase, session } = useSupabase()
  const params = useParams()
  const router = useRouter()
  const bookId = params.id

  useEffect(() => {
    fetchBook()
    fetchReviews()
    if (session) {
      fetchUserReview()
      fetchReadingListStatus()
    }
  }, [session])

  const fetchBook = async () => {
    try {
      const { data, error } = await supabase.from("books").select("*").eq("id", bookId).single()

      if (error) throw error
      setBook(data)
    } catch (error) {
      console.error("Error fetching book:", error)
    }
  }

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, profiles(name)")
        .eq("book_id", bookId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setReviews(data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const fetchUserReview = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("book_id", bookId)
        .eq("user_id", session!.user.id)
        .single()

      if (error && error.code !== "PGRST116") throw error
      setUserReview(data)
      if (data) {
        setNewReview({ rating: data.rating, comment: data.comment })
      }
    } catch (error) {
      console.error("Error fetching user review:", error)
    }
  }

  const fetchReadingListStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("reading_lists")
        .select("status")
        .eq("book_id", bookId)
        .eq("user_id", session!.user.id)
        .single()

      if (error && error.code !== "PGRST116") throw error
      setReadingListStatus(data?.status || null)
    } catch (error) {
      console.error("Error fetching reading list status:", error)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      router.push("/auth")
      return
    }

    try {
      const reviewData = {
        book_id: bookId,
        user_id: session.user.id,
        rating: newReview.rating,
        comment: newReview.comment,
      }

      let error
      if (userReview) {
        const { error: updateError } = await supabase.from("reviews").update(reviewData).eq("id", userReview.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase.from("reviews").insert(reviewData)
        error = insertError
      }

      if (error) throw error

      fetchReviews()
      fetchUserReview()
    } catch (error) {
      console.error("Error submitting review:", error)
    }
  }

  const handleReadingListUpdate = async (status: ReadingListItem["status"]) => {
    if (!session) {
      router.push("/auth")
      return
    }

    try {
      const { error } = await supabase.from("reading_lists").upsert(
        {
          user_id: session.user.id,
          book_id: bookId,
          status,
        },
        { onConflict: "user_id,book_id" },
      )

      if (error) throw error

      setReadingListStatus(status)
    } catch (error) {
      console.error("Error updating reading list:", error)
    }
  }

  if (!book) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img
                src={book.cover_image || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <p className="text-lg mb-2">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-lg mb-2">
                <strong>Category:</strong> {book.category}
              </p>
              <p className="text-lg mb-2">
                <strong>Publication Year:</strong> {book.publication_year}
              </p>
              <p className="text-lg mb-4">
                <strong>Description:</strong>
              </p>
              <p className="text-gray-700 mb-4">{book.description}</p>
              {session && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Reading List</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant={readingListStatus === "want_to_read" ? "default" : "outline"}
                      onClick={() => handleReadingListUpdate("want_to_read")}
                    >
                      Want to Read
                    </Button>
                    <Button
                      variant={readingListStatus === "currently_reading" ? "default" : "outline"}
                      onClick={() => handleReadingListUpdate("currently_reading")}
                    >
                      Currently Reading
                    </Button>
                    <Button
                      variant={readingListStatus === "read" ? "default" : "outline"}
                      onClick={() => handleReadingListUpdate("read")}
                    >
                      Read
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {session && (
            <form onSubmit={handleReviewSubmit} className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Your Review</h3>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Write your review here..."
                className="mb-2"
              />
              <Button type="submit">Submit Review</Button>
            </form>
          )}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{review.profiles.name}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

