import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    author: string
  }
}

export default function BlogPage() {
  const blogDir = "app/blog/posts"
  const files = fs.readdirSync(path.join(blogDir))

  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "")
    const markdownWithMeta = fs.readFileSync(path.join(blogDir, filename), "utf-8")
    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post: BlogPost) => (
        <Card key={post.slug}>
          <CardHeader>
            <CardTitle>{post.frontmatter.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              {post.frontmatter.date} by {post.frontmatter.author}
            </p>
            <Link href={`/blog/${post.slug}`}>
              <Button variant="outline">Read More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

