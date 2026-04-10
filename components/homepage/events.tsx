"use client";

import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Ticket,
  PlayCircle,
  CheckCircle2,
  Clock4,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Event {
  eventId: string;
  eventTitle: string;
  coverimage: string;
  eventDate: string;
  eventTime: string;
  hourstart: string;
  hourend: string;
  eventLocation?: string;
  description?: string;
  attendees?: string;
}

const DUMMY_EVENTS: Event[] = [
  {
    eventId: "1",
    eventTitle: "Tech Conference 2024",
    coverimage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    eventDate: "2026-12-15",
    eventTime: "10:00 AM - 6:00 PM",
    hourstart: "10:00",
    hourend: "18:00",
    eventLocation: "San Francisco, CA",
    description: "The premier tech conference of the year bringing together innovators, engineers, and visionaries to shape the future of technology. Sessions on AI, cloud, and developer tools.",
    attendees: "2,400 registered",
  },
  {
    eventId: "2",
    eventTitle: "AI Summit - Future of Intelligence",
    coverimage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    eventDate: "2024-12-20",
    eventTime: "9:00 AM - 5:00 PM",
    hourstart: "09:00",
    hourend: "17:00",
    eventLocation: "New York, NY",
    description: "Dive deep into the latest AI breakthroughs with leading researchers and industry practitioners. Workshops, panels, and networking across two packed days.",
    attendees: "1,800 attended",
  },
  {
    eventId: "3",
    eventTitle: "Developer Workshop: React & Next.js",
    coverimage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    eventDate: "2024-11-10",
    eventTime: "1:00 PM - 4:00 PM",
    hourstart: "13:00",
    hourend: "16:00",
    eventLocation: "Online (Zoom)",
    description: "Hands-on workshop covering the latest React patterns and Next.js App Router. Suitable for intermediate developers looking to level up their frontend skills.",
    attendees: "640 attended",
  },
  {
    eventId: "4",
    eventTitle: "Blockchain & Web3 Conference",
    coverimage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    eventDate: "2024-11-25",
    eventTime: "10:00 AM - 7:00 PM",
    hourstart: "10:00",
    hourend: "19:00",
    eventLocation: "Miami, FL",
    description: "Explore decentralized technologies, NFT ecosystems, DeFi protocols, and the infrastructure powering the next iteration of the web.",
    attendees: "3,100 attended",
  },
  {
    eventId: "5",
    eventTitle: "UX/UI Design Hackathon",
    coverimage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    eventDate: "2024-10-05",
    eventTime: "9:00 AM - 9:00 PM",
    hourstart: "09:00",
    hourend: "21:00",
    eventLocation: "Austin, TX",
    description: "48 hours to design, prototype, and pitch a product concept. Teams compete for mentorship prizes and visibility with top design studios.",
    attendees: "520 attended",
  },
  {
    eventId: "6",
    eventTitle: "Cybersecurity Summit 2024",
    coverimage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    eventDate: "2025-01-18",
    eventTime: "8:00 AM - 6:00 PM",
    hourstart: "08:00",
    hourend: "18:00",
    eventLocation: "Chicago, IL",
    description: "Security professionals share threat intelligence, tooling, and defensive strategies in an era of escalating cyber risks.",
    attendees: "980 attended",
  },
  {
    eventId: "7",
    eventTitle: "Data Science Symposium",
    coverimage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    eventDate: "2025-02-10",
    eventTime: "10:00 AM - 5:00 PM",
    hourstart: "10:00",
    hourend: "17:00",
    eventLocation: "Boston, MA",
    description: "Academic and industry researchers present cutting-edge findings in machine learning, statistical modeling, and large-scale data engineering.",
    attendees: "1,150 attended",
  },
  {
    eventId: "8",
    eventTitle: "Startup Pitch Night",
    coverimage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
    eventDate: "2026-04-10",
    eventTime: "8:00 AM - 10:00 PM",
    hourstart: "08:00",
    hourend: "22:00",
    eventLocation: "Seattle, WA",
    description: "Early-stage founders pitch to a panel of investors and experienced operators. A great evening to network, get inspired, and maybe find your next co-founder.",
    attendees: "310 registered",
  },
  {
    eventId: "9",
    eventTitle: "Cloud Computing Workshop",
    coverimage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    eventDate: "2024-12-05",
    eventTime: "11:00 AM - 3:00 PM",
    hourstart: "11:00",
    hourend: "15:00",
    eventLocation: "Online (Teams)",
    description: "Practical deep-dive into AWS, Azure, and GCP architectures. Learn cost-optimization strategies, multi-cloud patterns, and infrastructure-as-code best practices.",
    attendees: "760 attended",
  },
];

type FilterType = 'all' | 'upcoming' | 'happening' | 'ended';
type EventWithStatus = Event & { status: 'upcoming' | 'happening' | 'ended' };

const EVENTS_PER_PAGE = 6;

const NewUpcomingEvent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [awardsError, setAwardsError] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventWithStatus | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Sort by date ascending
       const sorted = [...DUMMY_EVENTS].sort(
  (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
);
        setEvents(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Error loading events:', error);
        setAwardsError("An error occurred while loading events.");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  const now = new Date();

  const categorizedEvents: EventWithStatus[] = events.map(event => {
    const eventStartDate = new Date(event.eventDate);

    const startDateTime = new Date(eventStartDate);
    const [startHours, startMinutes] = event.hourstart.split(":").map(Number);
    startDateTime.setHours(startHours, startMinutes, 0, 0);

    const endDateTime = new Date(eventStartDate);
    const [endHours, endMinutes] = event.hourend.split(":").map(Number);
    endDateTime.setHours(endHours, endMinutes, 0, 0);

    let status: 'upcoming' | 'happening' | 'ended' = "upcoming";
    if (isAfter(now, startDateTime) && isBefore(now, endDateTime)) {
      status = "happening";
    } else if (isAfter(now, endDateTime)) {
      status = "ended";
    }

    return { ...event, status };
  });

  const filteredEvents = categorizedEvents.filter(event =>
    activeFilter === 'all' || event.status === activeFilter
  );

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'happening':
        return {
          icon: PlayCircle,
          text: 'Live Now',
          badgeClass: 'bg-gradient-to-r from-green-500 to-emerald-600',
          ctaLabel: 'Join Now',
        };
      case 'ended':
        return {
          icon: CheckCircle2,
          text: 'Event Ended',
          badgeClass: 'bg-secondary',
          ctaLabel: 'View Details',
        };
      default:
        return {
          icon: Clock4,
          text: 'Upcoming',
          badgeClass: 'bg-primary',
          ctaLabel: 'Book Your Seat',
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded-2xl w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-32 h-12 bg-gray-300 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-60 bg-gradient-to-r from-gray-300 to-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </div>
                  <div className="h-12 bg-gray-300 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id='events' className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
              Events &amp; Gatherings
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join our exclusive events and experiences. Connect, learn, and grow with our community.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 flex flex-wrap gap-1 justify-center">
              {([
                { key: 'all', label: 'All Events', count: categorizedEvents.length },
                { key: 'upcoming', label: 'Upcoming', count: categorizedEvents.filter(e => e.status === 'upcoming').length },
                { key: 'happening', label: 'Live Now', count: categorizedEvents.filter(e => e.status === 'happening').length },
                { key: 'ended', label: 'Past Events', count: categorizedEvents.filter(e => e.status === 'ended').length },
              ] as { key: FilterType; label: string; count: number }[]).map(f => (
                <button
                  key={f.key}
                  onClick={() => handleFilterChange(f.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === f.key
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedEvents.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Events Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {activeFilter === 'all'
                    ? "There are no events scheduled at the moment."
                    : `No ${activeFilter} events found.`}
                </p>
              </div>
            ) : (
              paginatedEvents.map((event, index) => {
                const formattedDate = format(new Date(event.eventDate), "do MMMM yyyy");
                const statusConfig = getStatusConfig(event.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={event.eventId}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link href={`/events/${event.eventId}`}>
                      {/* Image */}
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={event.coverimage || "/aboutus.jpg"}
                          alt={event.eventTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                        {/* Status Badge */}
                        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2 shadow-lg ${statusConfig.badgeClass}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.text}
                        </div>

                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-center">
                          <div className="text-sm font-bold text-gray-900">
                            {format(new Date(event.eventDate), "MMM")}
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {format(new Date(event.eventDate), "dd")}
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.eventTitle}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-3 text-blue-500" />
                          <span className="text-sm">{formattedDate}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-3 text-orange-500" />
                          <span className="text-sm">{event.hourstart} - {event.hourend}</span>
                        </div>
                        {event.eventLocation && (
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-3 text-green-500" />
                            <span className="text-sm">{event.eventLocation}</span>
                          </div>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 bg-primary text-white hover:opacity-90 shadow-lg text-sm"
                        >
                          {event.status === 'ended' ? (
                            <>View Details <ArrowRight className="w-4 h-4 ml-2" /></>
                          ) : (
                            <><Ticket className="w-4 h-4 mr-2" /> Book Your Seat</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-lg'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Pagination info */}
          {filteredEvents.length > 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Showing {(currentPage - 1) * EVENTS_PER_PAGE + 1}–{Math.min(currentPage * EVENTS_PER_PAGE, filteredEvents.length)} of {filteredEvents.length} events
            </p>
          )}

          {/* Error */}
          {awardsError && (
            <div className="mt-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 inline-flex items-center shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-red-800">Unable to Load Events</h4>
                  <p className="text-red-600 text-sm mt-1">{awardsError}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={selectedEvent.coverimage}
                alt={selectedEvent.eventTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Status badge */}
              {(() => {
                const cfg = getStatusConfig(selectedEvent.status);
                const Icon = cfg.icon;
                return (
                  <div className={`absolute bottom-4 left-4 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2 ${cfg.badgeClass}`}>
                    <Icon className="w-4 h-4" />
                    {cfg.text}
                  </div>
                );
              })()}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.eventTitle}</h2>

              {selectedEvent.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedEvent.description}</p>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-3 text-blue-500 shrink-0" />
                  <span className="text-sm">{format(new Date(selectedEvent.eventDate), "do MMMM yyyy")}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-3 text-orange-500 shrink-0" />
                  <span className="text-sm">{selectedEvent.hourstart} – {selectedEvent.hourend}</span>
                </div>
                {selectedEvent.eventLocation && (
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-3 text-green-500 shrink-0" />
                    <span className="text-sm">{selectedEvent.eventLocation}</span>
                  </div>
                )}
                {selectedEvent.attendees && (
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-3 text-purple-500 shrink-0" />
                    <span className="text-sm">{selectedEvent.attendees}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/events/${selectedEvent.eventId}`}
                  className="flex-1 inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold bg-primary text-white hover:opacity-90 transition-opacity shadow-lg"
                >
                  {selectedEvent.status === 'ended' ? (
                    <>View Event Page <ArrowRight className="w-4 h-4 ml-2" /></>
                  ) : (
                    <><Ticket className="w-4 h-4 mr-2" /> Book Your Seat</>
                  )}
                </Link>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewUpcomingEvent;