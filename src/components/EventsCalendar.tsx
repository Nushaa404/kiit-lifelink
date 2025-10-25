import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "academic" | "cultural" | "sports" | "tech" | "club";
  location: string;
  time: string;
}

// Dummy event data
const dummyEvents: Event[] = [
  {
    id: "1",
    title: "TechFest 2025",
    date: new Date(2025, 9, 28), // October 28, 2025
    type: "tech",
    location: "Campus Auditorium",
    time: "10:00 AM"
  },
  {
    id: "2",
    title: "Cultural Fest",
    date: new Date(2025, 9, 30), // October 30, 2025
    type: "cultural",
    location: "Main Ground",
    time: "5:00 PM"
  },
  {
    id: "3",
    title: "Sports Tournament",
    date: new Date(2025, 10, 2), // November 2, 2025
    type: "sports",
    location: "Sports Complex",
    time: "8:00 AM"
  },
  {
    id: "4",
    title: "AI Workshop",
    date: new Date(2025, 10, 5), // November 5, 2025
    type: "tech",
    location: "CS Department",
    time: "2:00 PM"
  },
  {
    id: "5",
    title: "Mid-Term Exams",
    date: new Date(2025, 10, 10), // November 10, 2025
    type: "academic",
    location: "Exam Hall",
    time: "9:00 AM"
  },
];

const eventTypeColors = {
  academic: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  cultural: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  sports: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  tech: "bg-primary/10 text-primary border-primary/20",
  club: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

export const EventsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get events for selected date
  const eventsForSelectedDate = selectedDate
    ? dummyEvents.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Get upcoming events (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingEvents = dummyEvents
    .filter((event) => event.date >= today && event.date <= nextWeek)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Mark dates with events
  const datesWithEvents = dummyEvents.map((event) => event.date);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Campus Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border"
            modifiers={{
              hasEvent: datesWithEvents,
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: "bold",
                textDecoration: "underline",
                color: "hsl(var(--primary))",
              },
            }}
          />
          
          {eventsForSelectedDate.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-sm">
                Events on {selectedDate?.toLocaleDateString()}
              </h4>
              {eventsForSelectedDate.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg bg-accent/50 border border-border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h5 className="font-medium">{event.title}</h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={eventTypeColors[event.type]}
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Upcoming Events (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {event.title}
                      </h4>
                      <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {event.date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={eventTypeColors[event.type]}
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No upcoming events in the next 7 days
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
