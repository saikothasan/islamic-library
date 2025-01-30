import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We'd love to hear from you. Please fill out the form below or use our contact information.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Address:</strong> 123 Islamic Library St, Knowledge City, 12345
            </p>
            <p>
              <strong>Email:</strong> info@islamiclibrary.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <Input id="name" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">
              Message
            </label>
            <Textarea id="message" placeholder="Your message here..." rows={5} />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </div>
  )
}

