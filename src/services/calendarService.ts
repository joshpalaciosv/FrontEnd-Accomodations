import moment from "moment";
import { CalendarBooking, CalendarEntry } from "../interfaces/calendar.interface";
import { apiBookings } from "./apiBookings";
//import AccommodationsPage from "../pages/dashboard/AccommodationsPage";

export const getCalendarEntries = async (accomodationId?: string) => {
   try {
     //const accomodations = await getAllAccommodations();
     const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
   
     if (!token) {
          console.error(token);
          return [];
     }

     //console.log(accomodations);
     const events: CalendarEntry[] = [];
     //const events = [];

     //for (const accomodation of accomodations) {

          try {
               //const { data } = (await apiBookings.get<CalendarBooking[]>(`/api/V1/bookings/calendar/${accomodation.id}`)) ?? [];
               //return data;
               const { data } = (await apiBookings.get<CalendarBooking[]>(
                    `/api/V1/bookings/calendar/${accomodationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )) ?? [];

               //console.log(accomodation.id);
               //console.log(data);

               // Map the data to the desired structure and push to events array
               const mappedData = data.map(booking => ({
                    //id: booking.id,
                    status: booking.status,
                    title: booking.booking,
                    start: moment(booking.check_in_date).toDate(),
                    end: moment(booking.check_out_date).toDate(),
               }));

               //console.log(mappedData);

               events.push(...mappedData);
               console.log(events);

          }
          catch (error)
          {
               if (error.response.status = 401) {
                    console.log("Error 401");
               };
          }

     //}

     return events;

   } catch (error) {
          console.log(error);
          return [];
   } 

   

};

