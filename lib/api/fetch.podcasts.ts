  export interface Podcast {

  podNo: string;
  podId: string;
  podTitle: string;
  podHost: string;
  podDescription: string;
  podLink: string;
  category_name: string;
  addeddate: string;
  podImage: string;
  status: string;
  podCat: number;
}

export interface PodacastCategory{
  podCat:number;
  podcategory:string;
}



 
import { useQuery } from "@tanstack/react-query";

interface PodcastResponse {
  success: boolean;
  podcastsdata: Podcast[];
}




// Fetch main career jobs
const fetchPodcasts = async (): Promise<PodcastResponse> => {
  const response = await fetch("/api/fetch/fetch.podcasts", {
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
export const usePodcasts = () => {
  return useQuery<PodcastResponse, Error>({
    queryKey: ["podcastsdata"],
    queryFn: fetchPodcasts,
  });
};