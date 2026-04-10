


import { Services } from "@/types/";
import { useQuery } from "@tanstack/react-query";

interface ProductResponse {
  success: boolean;
  servicedata: Services[];
}




// Fetch main services
const fetchServices = async (): Promise<ProductResponse> => {
  const response = await fetch("/api/fetch/fetch.services", {
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


// Hook for fetching all services
export const useServices = () => {
  return useQuery<ProductResponse, Error>({
    queryKey: ["servicedata"],
    queryFn: fetchServices,
  });
};