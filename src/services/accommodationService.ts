import { Accommodation } from "../interfaces/accommodations.interface";
import { apiBookings } from "./apiBookings";
//getAllAccommodations

export const getAllAccommodations = async (): Promise<Accommodation[] | []> => {
    const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
    
    if (!token) {
      console.error(token);
      return [];
    }
  
    try {
      const { data } = await apiBookings.get<Accommodation[]>("/api/V1/accomodations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return data ?? [];
    } catch (error) {
      console.error("Error al obtener los alojamientos:", error);
      return [];
    }
};
