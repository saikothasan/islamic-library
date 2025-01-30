import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("app/blog/posts"))

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }))

  return paths
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(path.join("app/blog/posts", `${slug}.mdx`), "utf-8")
  const { data: frontmatter, content } = matter(markdownFile)
  return {
    frontmatter,
    slug,
    content,
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const props = getPost(params)

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{props.frontmatter.title}</h1>
      <p className="text-sm text-gray-500">
        {props.frontmatter.date} by {props.frontmatter.author}
      </p>
      <MDXRemote source={props.content} />
    </article>
  )
}

