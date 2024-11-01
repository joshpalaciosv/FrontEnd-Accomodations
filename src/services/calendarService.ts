import moment from "moment";
import { CalendarBooking, CalendarEntry } from "../interfaces/calendar.interface";
import { apiBookings } from "./apiBookings";

export const getCalendarEntries = async (accomodationId?: string) => {
   try {
     // obtengo el token de la sesion
     const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
   
     // si no hay token, devuelvo un array vacio
     if (!token) {
          console.error(token);
          return [];
     }

     // inicializo el array de eventos
     const events: CalendarEntry[] = [];

     

          try {
               
              // obtenemos las reservas del alojamiento indicado en el accomodationId

               const response = await apiBookings.get<CalendarBooking[]>(
                    `/api/V1/bookings/calendar/${accomodationId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  );
               
               // si la respuesta es correcta, mapeamos los datos y los agregamos al array de eventos
               const { data, status } = response;

               if (status === 200) { 
                    // obtenemos la informacion que necesitamos para mostrar en el calendario
                    const mappedData = data.map(booking => ({
                         //id: booking.id,
                         status: booking.status,
                         title: booking.booking,
                         start: moment(booking.check_in_date).toDate(),
                         end: moment(booking.check_out_date).toDate(),
                    }));

                    // agregamos los eventos al array de events.
                    events.push(...mappedData);
                    //console.log(events);
               }
               else
               {
                    console.error(`Error: Recibimos el status de Error # ${status}`);
                    return [];
               }
                              

          }
          catch (error: any)
          {
               // si el error es 401, devolvemos un array vacio
               // tratamos de manejar el error ya que cuando no hay alojamientos en la base de datos, el servidor devuelve un error 400, 401
               if (error.response.status === 401) {
                    console.log("Error 401");
                    return [];
               } else {
                    
                    return [];
               }
          }

     return events;

   } catch (error: any) {
           console.log(error);
          return [];
   }

   

};