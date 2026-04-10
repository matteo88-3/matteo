
import { ServiceDetail } from "@/types/";
import { useQuery } from "@tanstack/react-query";

interface ProductResponse {
  success: boolean;
  servicedetaildata: ServiceDetail;
}



// Fetch main service details
const fetchInRDet = async ({serviceNo} : {serviceNo:string}): Promise<ProductResponse> => {
  const response = await fetch("/api/fetch/fetch.service.detail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: window.location.origin, // Pass the origin from the browser
    },
    body: JSON.stringify({ serviceNo }), // Pass serviceNo in the request body
   
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
};

// Hook for fetching award details
export const useServiceDetail = (serviceNo: string) => {
    return useQuery<ProductResponse, Error>({
      queryKey: ["servicedetail", serviceNo], // Pass serviceNo to ensure caching per service
      queryFn: () => fetchInRDet({ serviceNo }),
      enabled: !!serviceNo, // Only run if serviceNo is available
    });
  };
  
