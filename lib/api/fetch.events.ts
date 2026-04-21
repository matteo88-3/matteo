export interface Event {
  eventId: string;
  eventTitle: string;
  description: string;
  coverimage: string;
  eventDate: string;
  eventTime: string;
  hourstart: string;
  hourend: string;
  eventLocation: string;
  attendees: string;
}

 
import { useQuery } from "@tanstack/react-query";

interface EventResponse {
  success: boolean;
  eventsdata: Event[];
}




// Fetch main career jobs
const fetchEvents = async (): Promise<EventResponse> => {
  const response = await fetch("/api/fetch/fetch.events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: window.location.origin, // Pass the origin from the browser
    },
   
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch Services");
  }

  return data;
};


// Hook for fetching all events
export const useEvents = () => {
  return useQuery<EventResponse, Error>({
    queryKey: ["eventsdata"],
    queryFn: fetchEvents,
  });
};