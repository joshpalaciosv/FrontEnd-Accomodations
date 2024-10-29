import { Booking } from "../interfaces/booking.interface";
import { apiBookings } from "./apiBookings";

//getAllBookings
export const getAllBookings = async (): Promise<Booking[] | []> => {
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
    
  if (!token) {
    console.error(token);
    return [];
  }

  try {
    const { data } = await apiBookings.get<Booking[]>("/api/V1/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return data ?? [];
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    return [];
  }
};
