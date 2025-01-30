"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { supabase, session } = useSupabase()
  const [isAdmin, setIsAdmin] = useState(false)
  const [categories, setCategories] = useState([])
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    category_id: "",
    publication_year: "",
    cover_image: "",
  })

  useEffect(() => {
    if (session) {
      checkAdminStatus()
      fetchCategories()
    }
  }, [session])

  const checkAdminStatus = async () => {
    const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", session!.user.id).single()

    if (error) {
      console.error("Error checking admin status:", error)
      return
    }

    setIsAdmin(data.is_admin)
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id, name")

    if (error) {
      console.error("Error fetching categories:", error)
      return
    }

    setCategories(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setNewBook({ ...newBook, category_id: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase.from("books").insert([newBook])

    if (error) {
      console.error("Error adding new book:", error)
      toast({
        title: "Error",
        description: "Failed to add new book. Please try again.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "New book added successfully.",
    })

    setNewBook({
      title: "",
      author: "",
      description: "",
      category_id: "",
      publication_year: "",
      cover_image: "",
    })
  }

  if (!session) return <div>Please log in to access the admin panel.</div>
  if (!isAdmin) return <div>You do not have permission to access this page.</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input type="text" id="title" name="title" value={newBook.title} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <Input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Select onValueChange={handleSelectChange} value={newBook.category_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700">
                Publication Year
              </label>
              <Input
                type="number"
                id="publication_year"
                name="publication_year"
                value={newBook.publication_year}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700">
                Cover Image URL
              </label>
              <Input
                type="url"
                id="cover_image"
                name="cover_image"
                value={newBook.cover_image}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Add Book</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

