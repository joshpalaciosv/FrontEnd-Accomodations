import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { Box, Typography, Select, Option, CircularProgress } from '@mui/joy';
// import { BarChart3, TrendingUp, Eye, Clock } from 'lucide-react';
import { getCalendarEntries } from "../services/calendarService";
import { CalendarEntry } from "../interfaces/calendar.interface";
import { getAllAccommodations } from "../services/accommodationService";
import { Accommodation } from "../interfaces/accommodations.interface";
import '../style.css';

//   const eventsOLD = [
//     {
//       start: moment("2024-10-27T10:00:00").toDate(),
//      end: moment("2024-10-27T11:00:00").toDate(),
//      title: "MRI Registration",
//    },
//     {
//      start: moment("2024-10-27T14:00:00").toDate(),
//      end: moment("2024-10-27T15:30:00").toDate(),
//      title: "ENT Appointment",
//     },
//   ];


// funcion para eliminar duplicados.
const unique = (array: string[]): string[] => {
  return [...new Set(array)];
};

export default function BasicCalendar() {
    const [events, setEvents] = useState<CalendarEntry[]>([]);
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState<string>("");
    const [monthEntries, setMonthEntries] = useState<string[]>([]);
    const [loadingSelect, setLoadingSelect] = useState<boolean>(false); // agregando un estado de carga
    const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false); // agregando un estado de carga
    // 
    useEffect(() => {
      const fetchAccommodations = async () => {
        //flag de carga, lo ubicamos en True para dar la sensacion de carga
        setLoadingSelect(true);
        try {
        const accommodationsList = await getAllAccommodations();
        // llenamos el estado con la lista de alojamientos
        setAccommodations(accommodationsList);
        console.log("State accommodations:", accommodations);

        } catch (error) {
          console.error("Error fetchi Alojamientos:", error);
        } finally {
          // flag de carga, lo ubicamos en False cuando el Fecth termina
          setLoadingSelect(false);
        }
      };
  
      fetchAccommodations();
    }, []);


    // Fetch de para obtener las entradas de calendario cuando se selecciona un alojamiento.
     useEffect(() => {
       const fetchEvents = async () => {
        setLoadingCalendar(true);
        try { 
         const calendarEntries = await getCalendarEntries(selectedAccommodation);
         setEvents(calendarEntries);
         
         setMonthEntries([]); // Reiniciamos el estado de los meses
         calendarEntries.map((entry) => {
          // formatemos la fecha de inicio para obtener el mes
          const monthEntry = moment(entry.start).format('MMM');
          setMonthEntries((prev) => [...prev, monthEntry]);

         });
        } catch (error) { 
          console.error("Error fetching entradas calenario:", error);
        } finally {
          // flag de carga, lo ubicamos en False cuando el Fecth termina
          setLoadingCalendar(false);
        }

       };
  
       fetchEvents();
     }, [selectedAccommodation]); // cada vez que se cambie el alojamiento se ejecutara el useEffect

     // Funcion para manejar el cambio de alojamiento
     const handleChange = (
      event: React.SyntheticEvent | null,
      newValue: string | null,
      ) => {
        setSelectedAccommodation(newValue as string);
        //console.log(`Alojamiento Seleccionado "${newValue}"`);
      };

    return (
      <Box sx={{ paddingBottom: {xs:10}  }}>
        <Typography level="h2" mb={3}>
          Calendario Alojamientos
        </Typography>

        {/* Mostramos un spinner de carga mientras se obtienen los alojamientos */}
        {loadingSelect ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          </Box>
        ) : (
          <Select
          defaultValue={selectedAccommodation} onChange={handleChange} 
          >
            <Option value="0" disabled>Seleccionar Alojamiento</Option>
            {accommodations.map(accommodation => (
            <Option value={accommodation.id}>
              {accommodation.name}
            </Option>
          ))}
            {/* <Option value="1">Alojamiento 1</Option>
            <Option value="2">Alojamiento 2</Option> */}
          </Select>
        )}
        <br />
        <Typography mb={6}>
          se han encontrado {events.length} eventos <br />
          Entres los meses de {unique(monthEntries).join(", ")} <br />
          Eventos Confirmados: {events.filter((event) => event.status === "CONFIRMED").length} <span className="confirm-square"></span> <br />
          Eventos Cancelados: {events.filter((event) => event.status === "CANCELLED").length} <span className="red-square"></span>
          
          {/* <p style?={color:#EE4B2B}>(en rojo)</p> */}

        </Typography>
        {/* Mostramos un spinner de carga mientras se obtienen las entradas de calendario */}
        {loadingCalendar ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
          ) : (
        <Calendar events={events} />
        )}
      </Box>
    );
  }