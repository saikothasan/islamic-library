import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedCategories } from "@/components/featured-categories"
import { NewArrivals } from "@/components/new-arrivals"
import { FeaturedScholars } from "@/components/featured-scholars"
import { EventsCalendar } from "@/components/events-calendar"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { FeaturedQuran } from "@/components/featured-quran"
import { FeaturedHadith } from "@/components/featured-hadith"
import { RecentBlogPosts } from "@/components/recent-blog-posts"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f4e9] text-gray-800">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <NewArrivals />
        <FeaturedScholars />
        <FeaturedQuran />
        <FeaturedHadith />
        <EventsCalendar />
        <RecentBlogPosts />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

