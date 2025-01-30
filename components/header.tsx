"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, User, BookOpen, Search } from "lucide-react"
import { useSupabase } from "./supabase-provider"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { supabase, session } = useSupabase()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
    router.refresh()
  }

  return (
    <header className="bg-[#2c3e50] text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 mr-2"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Islamic Library
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/categories" className="hover:text-[#e4d6a7]">
            Categories
          </Link>
          <Link href="/scholars" className="hover:text-[#e4d6a7]">
            Scholars
          </Link>
          <Link href="/books" className="hover:text-[#e4d6a7]">
            Books
          </Link>
          <Link href="/quran" className="hover:text-[#e4d6a7]">
            Quran
          </Link>
          <Link href="/hadith" className="hover:text-[#e4d6a7]">
            Hadith
          </Link>
          <Link href="/events" className="hover:text-[#e4d6a7]">
            Events
          </Link>
          <Link href="/blog" className="hover:text-[#e4d6a7]">
            Blog
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/search">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>العربية</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Türkçe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/reading-list">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Reading List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                  {loading ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="outline" className="bg-[#e4d6a7] text-[#2c3e50] hover:bg-[#d4c697]">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

