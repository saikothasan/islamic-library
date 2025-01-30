import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedQuran() {
  return (
    <section className="py-16 bg-[#34495e] text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Quran Verse</h2>
        <Card className="bg-[#2c3e50] text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Surah Al-Baqarah, Verse 255 (Ayat al-Kursi)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4 text-center arabic-text" dir="rtl">
              اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ
              إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ
              وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ
            </p>
            <p className="text-lg mb-4 text-center">
              Allah! There is no god but He - the Living, The Self-Subsisting, Eternal. No slumber can seize Him nor
              sleep. His are all things in the heavens and on earth. Who is there that can intercede in His presence
              except as He permits? He knows what appears to His creatures as before or after or behind them. Nor shall
              they compass aught of His knowledge except as He wills. His Throne extends over the heavens and the earth,
              and He feels no fatigue in guarding and preserving them for He is the Most High, the Supreme.
            </p>
            <div className="text-center">
              <Link href="/quran">
                <Button variant="outline">Explore Quran</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

