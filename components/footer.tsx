import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Islamic Library</h3>
          <p className="text-sm">Preserving and sharing Islamic knowledge for generations to come.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                Donate
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                E-Books
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                Audio Lectures
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                Research Papers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#e4d6a7]">
                Manuscripts
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-[#e4d6a7]">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-[#e4d6a7]">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-[#e4d6a7]">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-[#e4d6a7]">
              <Youtube className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-600 text-center text-sm">
        <p>&copy; 2025 Islamic Library. All rights reserved.</p>
      </div>
    </footer>
  )
}

