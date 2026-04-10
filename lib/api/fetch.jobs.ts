


import { JobCareer } from "@/types/";
import { useQuery } from "@tanstack/react-query";

interface JobCareerResponse {
  success: boolean;
  jobcareerdata: JobCareer[];
}




// Fetch main career jobs
const fetchJobCareers = async (): Promise<JobCareerResponse> => {
  const response = await fetch("/api/fetch/fetch.jobcareers", {
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


// Hook for fetching all job careers
export const useJobCareers = () => {
  return useQuery<JobCareerResponse, Error>({
    queryKey: ["jobcareerdata"],
    queryFn: fetchJobCareers,
  });
};