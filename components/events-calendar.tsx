import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

const allEvents = [
  { title: "Islamic Finance Seminar", date: "May 15, 2025", time: "2:00 PM - 4:00 PM", location: "Online" },
  {
    title: "Ramadan Preparation Workshop",
    date: "June 1, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Main Auditorium",
  },
  { title: "Quranic Arabic Course", date: "June 10, 2025", time: "6:00 PM - 8:00 PM", location: "Room 201" },
  { title: "Islamic History Lecture Series", date: "June 20, 2025", time: "3:00 PM - 5:00 PM", location: "Online" },
  { title: "Islamic Art Exhibition", date: "July 5, 2025", time: "11:00 AM - 6:00 PM", location: "Art Gallery" },
  { title: "Interfaith Dialogue Forum", date: "July 15, 2025", time: "7:00 PM - 9:00 PM", location: "Conference Hall" },
  { title: "Islamic Science Symposium", date: "August 1, 2025", time: "9:00 AM - 5:00 PM", location: "Science Center" },
  {
    title: "Eid al-Adha Celebration",
    date: "August 10, 2025",
    time: "8:00 AM - 2:00 PM",
    location: "Community Center",
  },
]

export function EventsCalendar({ showAll = false }) {
  const events = showAll ? allEvents : allEvents.slice(0, 4)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{showAll ? "All Upcoming Events" : "Upcoming Events"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time}
                </div>
                <p className="text-sm text-gray-600">{event.location}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

