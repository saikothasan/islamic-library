"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, PauseCircle, Bookmark } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Ayah {
  number: number
  text: string
  audio: string
}

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  ayahs: Ayah[]
}

export default function SurahPage() {
  const params = useParams()
  const surahNumber = params.surahNumber
  const [surah, setSurah] = useState<Surah | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { supabase, session } = useSupabase()

  useEffect(() => {
    fetchSurah()
  }, [])

  const fetchSurah = async () => {
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
      const data = await response.json()
      setSurah(data.data)
    } catch (error) {
      console.error("Error fetching surah:", error)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    if (currentAyah < (surah?.numberOfAyahs || 0) - 1) {
      setCurrentAyah(currentAyah + 1)
    } else {
      setIsPlaying(false)
      setCurrentAyah(0)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = surah?.ayahs[currentAyah]?.audio || ""
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentAyah, surah, isPlaying]) // Added isPlaying to dependencies

  const handleBookmark = async (ayahNumber: number) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark ayahs.",
        variant: "destructive",
      })
      return
    }

    try {
      const { data, error } = await supabase.from("quran_bookmarks").upsert(
        {
          user_id: session.user.id,
          surah_number: Number(surahNumber),
          ayah_number: ayahNumber,
        },
        { onConflict: "user_id,surah_number,ayah_number" },
      )

      if (error) throw error

      toast({
        title: "Bookmark added",
        description: `Surah ${surahNumber}, Ayah ${ayahNumber} has been bookmarked.`,
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

  if (!surah) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {surah.number}. {surah.englishName} ({surah.name})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{surah.englishNameTranslation}</p>
          <div className="mb-4">
            <Button onClick={togglePlay}>
              {isPlaying ? <PauseCircle className="mr-2" /> : <PlayCircle className="mr-2" />}
              {isPlaying ? "Pause" : "Play"} Audio
            </Button>
          </div>
          <audio ref={audioRef} onEnded={handleAudioEnded} />
          <div className="space-y-4">
            {surah.ayahs.map((ayah, index) => (
              <div key={ayah.number} className={`p-4 rounded ${index === currentAyah ? "bg-primary/10" : ""}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-2xl text-right" dir="rtl">
                    {ayah.text}
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => handleBookmark(ayah.number)}>
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Verse {ayah.number}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

