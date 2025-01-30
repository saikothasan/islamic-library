"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([])

  useEffect(() => {
    fetchSurahs()
  }, [])

  const fetchSurahs = async () => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah")
      const data = await response.json()
      setSurahs(data.data)
    } catch (error) {
      console.error("Error fetching surahs:", error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">The Holy Quran</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((surah) => (
          <Card key={surah.number}>
            <CardHeader>
              <CardTitle>
                {surah.number}. {surah.englishName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{surah.englishNameTranslation}</p>
              <p className="mb-4">Ayahs: {surah.numberOfAyahs}</p>
              <Link href={`/quran/${surah.number}`}>
                <Button>Read Surah</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

