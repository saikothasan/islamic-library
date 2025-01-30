import { EventsCalendar } from "@/components/events-calendar"

export default function EventsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <EventsCalendar showAll={true} />
    </div>
  )
}

