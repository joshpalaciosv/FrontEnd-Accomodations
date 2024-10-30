import { CalendarBooking } from "../interfaces/calendar.interface";
import { apiBookings } from "./apiBookings";
import {getAllAccommodations} from "./accommodationService";
import AccommodationsPage from "../pages/dashboard/AccommodationsPage";

export const getCalendarEntries = async () => {
   try {
     //const accomodations = await getAllAccommodations();
     const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
   
     if (!token) {
          console.error(token);
          return [];
     }

     console.log(accommodationsData);

     for (const accomodation of accommodationsData) {

          try {
               //const { data } = (await apiBookings.get<CalendarBooking[]>(`/api/V1/bookings/calendar/${accomodation.id}`)) ?? [];
               //return data;
               const { data } = (await apiBookings.get<CalendarBooking[]>(
                    `/api/V1/bookings/calendar/${accomodation.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )) ?? [];

               console.log(accomodation.id);
               console.log(data);
          }
          catch (error)
          {
               if (error.response.status = 401) {
                    console.log("Error 401");
               };
          }

     }

     return [];

   } catch (error) {
          console.log(error);
          return [];
   } 

   
  // Recibe la respuesta de la API y devuelve el array de usuarios tipado
  // Si la respuesta es nula, devuelve un array vacío (?? Nullish coalescing operator)
    //   const { data } = (await apiBookings.get<User[]>("/api/V1/bookings/calendar/{id_accomodation}")) ?? [];
    //   return data;
};

