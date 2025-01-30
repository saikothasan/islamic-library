import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const recentPosts = [
  {
    title: "The Importance of Seeking Knowledge in Islam",
    excerpt: "Explore the significance of education and lifelong learning in Islamic teachings...",
    date: "2023-05-15",
    slug: "importance-of-seeking-knowledge",
  },
  {
    title: "Understanding the Five Pillars of Islam",
    excerpt: "A comprehensive guide to the fundamental practices that shape a Muslim's life...",
    date: "2023-05-10",
    slug: "understanding-five-pillars-of-islam",
  },
  {
    title: "The Role of Charity in Islamic Society",
    excerpt: "Discover how charitable giving strengthens community bonds and spiritual growth...",
    date: "2023-05-05",
    slug: "role-of-charity-in-islamic-society",
  },
]

export function RecentBlogPosts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.excerpt}</p>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button>View All Posts</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

