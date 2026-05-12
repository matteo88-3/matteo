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
import { useEvents, Event } from '@/lib/api/fetch.events';

type FilterType = 'all' | 'upcoming' | 'happening' | 'ended';
type EventWithStatus = Event & { status: 'upcoming' | 'happening' | 'ended' };

const EVENTS_PER_PAGE = 6;
const DESCRIPTION_CHAR_LIMIT = 220;

/* Strip HTML tags for plain-text length check */
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const NewUpcomingEvent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventWithStatus | null>(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { data, isLoading, error, isError } = useEvents();
  const events: Event[] = data?.eventsdata || [];

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  );

  /* Lock scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  /* Close full-desc inner modal when main modal closes */
  useEffect(() => {
    if (!selectedEvent) setShowFullDesc(false);
  }, [selectedEvent]);

  /* Block Escape key from closing modals */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') e.stopImmediatePropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, []);

  const now = new Date();

  const categorizedEvents: EventWithStatus[] = sortedEvents.map((event) => {
    const base = new Date(event.eventDate);

    const startDT = new Date(base);
    const [sh, sm] = (event.hourstart || '00:00').split(':').map(Number);
    startDT.setHours(sh, sm, 0, 0);

    const endDT = new Date(base);
    const [eh, em] = (event.hourend || '00:00').split(':').map(Number);
    endDT.setHours(eh, em, 0, 0);

    let status: 'upcoming' | 'happening' | 'ended' = 'upcoming';
    if (isAfter(now, startDT) && isBefore(now, endDT)) status = 'happening';
    else if (isAfter(now, endDT)) status = 'ended';

    return { ...event, status };
  });

  const filteredEvents = categorizedEvents.filter(
    (e) => activeFilter === 'all' || e.status === activeFilter
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
        return { icon: PlayCircle, text: 'Live Now', badgeClass: 'bg-gradient-to-r from-green-500 to-emerald-600' };
      case 'ended':
        return { icon: CheckCircle2, text: 'Event Ended', badgeClass: 'bg-secondary' };
      default:
        return { icon: Clock4, text: 'Upcoming', badgeClass: 'bg-primary' };
    }
  };

  /* ── Reusable Pagination Bar ── */
  const PaginationBar = () =>
    totalPages > 1 ? (
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {filteredEvents.length > 0 && (
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * EVENTS_PER_PAGE + 1}–
            {Math.min(currentPage * EVENTS_PER_PAGE, filteredEvents.length)} of {filteredEvents.length} events
          </p>
        )}
      </div>
    ) : null;

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded-2xl w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
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

  /* ── Main render ── */
  return (
    <>
      <div id="events" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
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
          <div className="flex justify-center mb-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 flex flex-wrap gap-1 justify-center">
              {([
                { key: 'all', label: 'All Events', count: categorizedEvents.length },
                { key: 'upcoming', label: 'Upcoming', count: categorizedEvents.filter((e) => e.status === 'upcoming').length },
                { key: 'happening', label: 'Live Now', count: categorizedEvents.filter((e) => e.status === 'happening').length },
                { key: 'ended', label: 'Past Events', count: categorizedEvents.filter((e) => e.status === 'ended').length },
              ] as { key: FilterType; label: string; count: number }[]).map((f) => (
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

          {/* ── Pagination TOP ── */}
          <PaginationBar />

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
                    ? 'There are no events scheduled at the moment.'
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
                    <Link href={`${event.eventLink}`} target='_blank'>
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={event.coverimage || '/aboutus.jpg'}
                          alt={event.eventTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2 shadow-lg ${statusConfig.badgeClass}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.text}
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg text-center">
                          <div className="text-sm font-bold text-gray-900">{format(new Date(event.eventDate), 'MMM')}</div>
                          <div className="text-lg font-bold text-blue-600">{format(new Date(event.eventDate), 'dd')}</div>
                        </div>
                      </div>
                    </Link>

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
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 bg-primary text-white hover:opacity-90 shadow-lg text-sm"
                      >
                        {event.status === 'ended' ? (
                          <>View Details <ArrowRight className="w-4 h-4 ml-2" /></>
                        ) : (
                          <><Ticket className="w-4 h-4 mr-2" /> Book Your Seat</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-8 text-center">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 inline-flex items-center shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-red-800">Unable to Load Events</h4>
                  <p className="text-red-600 text-sm mt-1">{isError}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN EVENT MODAL
          Closes ONLY via the Close / X button.
          Backdrop click is intentionally disabled.
      ══════════════════════════════════════════ */}
      {selectedEvent && (() => {
        const cfg = getStatusConfig(selectedEvent.status);
        const Icon = cfg.icon;
        const plainDesc = selectedEvent.description ? stripHtml(selectedEvent.description) : '';
        const isLong = plainDesc.length > DESCRIPTION_CHAR_LIMIT;

        /* Build a safe short preview by cutting at the nearest space */
        const shortPreview = isLong
          ? (() => {
              const cutAt = selectedEvent.description!.indexOf(' ', DESCRIPTION_CHAR_LIMIT);
              return (cutAt === -1 ? selectedEvent.description!.substring(0, DESCRIPTION_CHAR_LIMIT) : selectedEvent.description!.substring(0, cutAt)) + '…';
            })()
          : selectedEvent.description;

        return (
          /* No onClick handler on backdrop — intentional */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

            {/* Modal card: flex column, capped height, image fixed + body scrolls + footer fixed */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">

              {/* ── Fixed image header ── */}
              <div className="relative h-52 shrink-0 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedEvent.coverimage || '/aboutus.jpg'}
                  alt={selectedEvent.eventTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* X close button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Status badge */}
                <div className={`absolute bottom-4 left-4 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2 ${cfg.badgeClass}`}>
                  <Icon className="w-4 h-4" />
                  {cfg.text}
                </div>
              </div>

              {/* ── Scrollable middle body ── */}
              <div className="overflow-y-auto flex-1 px-6 pt-5 pb-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedEvent.eventTitle}</h2>

                {/* Description preview + View More */}
                {selectedEvent.description && (
                  <div className="mb-5">
                    <div
                      className="text-gray-600 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: shortPreview! }}
                    />
                    {isLong && (
                      <button
                        onClick={() => setShowFullDesc(true)}
                        className="mt-2 text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        View More <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Event meta details */}
                <div className="space-y-3 mb-4">
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
              </div>

              {/* ── Fixed footer with action buttons ── */}
              <div className="px-6 py-4 border-t border-gray-100 bg-white shrink-0 flex gap-3 rounded-b-3xl">
                <Link
                  href={`${selectedEvent.eventLink}`}
                  target='_blank'
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

            {/* ══════════════════════════════════════════
                INNER "FULL DESCRIPTION" MODAL
                Sits on top of the main modal.
                Also closes ONLY via its own Close / X button.
            ══════════════════════════════════════════ */}
            {showFullDesc && (
              /* No onClick handler on backdrop — intentional */
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm z-10">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh] overflow-hidden">

                  {/* Inner header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <h3 className="text-lg font-bold text-gray-900">Full Description</h3>
                    <button
                      onClick={() => setShowFullDesc(false)}
                      className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                      aria-label="Close description"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable full description */}
                  <div className="overflow-y-auto flex-1 px-6 py-5">
                    <div
                      className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedEvent.description! }}
                    />
                  </div>

                  {/* Inner footer */}
                  <div className="px-6 py-4 border-t border-gray-100 shrink-0">
                    <button
                      onClick={() => setShowFullDesc(false)}
                      className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </>
  );
};

export default NewUpcomingEvent;