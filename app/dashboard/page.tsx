"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ReadingListItem {
  id: string
  book: {
    id: string
    title: string
    author: string
  }
  status: "want_to_read" | "currently_reading" | "read"
}

interface QuranBookmark {
  id: string
  surah_number: number
  ayah_number: number
  note: string
}

interface HadithBookmark {
  id: string
  collection: string
  hadith_number: number
  note: string
}

export default function DashboardPage() {
  const { supabase, session } = useSupabase()
  const [readingList, setReadingList] = useState<ReadingListItem[]>([])
  const [quranBookmarks, setQuranBookmarks] = useState<QuranBookmark[]>([])
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([])

  useEffect(() => {
    if (session) {
      fetchReadingList()
      fetchQuranBookmarks()
      fetchHadithBookmarks()
    }
  }, [session])

  const fetchReadingList = async () => {
    const { data, error } = await supabase
      .from("reading_lists")
      .select("id, status, books(id, title, author)")
      .eq("user_id", session!.user.id)
      .limit(5)
    if (error) console.error("Error fetching reading list:", error)
    else setReadingList(data)
  }

  const fetchQuranBookmarks = async () => {
    const { data, error } = await supabase.from("quran_bookmarks").select("*").eq("user_id", session!.user.id).limit(5)
    if (error) console.error("Error fetching Quran bookmarks:", error)
    else setQuranBookmarks(data)
  }

  const fetchHadithBookmarks = async () => {
    const { data, error } = await supabase.from("hadith_bookmarks").select("*").eq("user_id", session!.user.id).limit(5)
    if (error) console.error("Error fetching Hadith bookmarks:", error)
    else setHadithBookmarks(data)
  }

  if (!session) return <div>Please log in to view your dashboard.</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Reading List</CardTitle>
          </CardHeader>
          <CardContent>
            {readingList.length > 0 ? (
              <ul className="space-y-2">
                {readingList.map((item) => (
                  <li key={item.id}>
                    <Link href={`/books/${item.book.id}`} className="hover:underline">
                      {item.book.title} by {item.book.author}
                    </Link>
                    <span className="ml-2 text-sm text-gray-500">({item.status})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No books in your reading list yet.</p>
            )}
            <Link href="/reading-list" className="block mt-4">
              <Button variant="outline">View All</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quran Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            {quranBookmarks.length > 0 ? (
              <ul className="space-y-2">
                {quranBookmarks.map((bookmark) => (
                  <li key={bookmark.id}>
                    <Link href={`/quran/${bookmark.surah_number}#${bookmark.ayah_number}`} className="hover:underline">
                      Surah {bookmark.surah_number}, Ayah {bookmark.ayah_number}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Quran bookmarks yet.</p>
            )}
            <Link href="/quran-bookmarks" className="block mt-4">
              <Button variant="outline">View All</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hadith Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            {hadithBookmarks.length > 0 ? (
              <ul className="space-y-2">
                {hadithBookmarks.map((bookmark) => (
                  <li key={bookmark.id}>
                    <Link href={`/hadith/${bookmark.collection}/${bookmark.hadith_number}`} className="hover:underline">
                      {bookmark.collection} #{bookmark.hadith_number}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Hadith bookmarks yet.</p>
            )}
            <Link href="/hadith-bookmarks" className="block mt-4">
              <Button variant="outline">View All</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

