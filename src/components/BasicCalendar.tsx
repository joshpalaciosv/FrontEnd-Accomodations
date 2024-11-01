import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { Box, Typography, Select, Option } from '@mui/joy';
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

//   console.log(eventsOLD);

// const events = getCalendarEntries();
// console.log(events);

// const events = getCalendarEntries();
// console.log(events);

// export default function BasicCalendar() {
//   return <Calendar events={events} />;
// }

// Unique function to filter array
const unique = (array: string[]): string[] => {
  return [...new Set(array)];
};

export default function BasicCalendar() {
    const [events, setEvents] = useState<CalendarEntry[]>([]);
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState<string>("");
    const [monthEntries, setMonthEntries] = useState<string[]>([]);

    useEffect(() => {
      const fetchAccommodations = async () => {
        try {
        const accommodationsList = await getAllAccommodations();
        //console.log("Fetched accommodations:", accommodationsList);
        setAccommodations(accommodationsList);
        console.log("State accommodations:", accommodations);

        } catch (error) {
          console.error("Error fetching accommodations:", error);
        }
      };
  
      fetchAccommodations();
    }, []);



     useEffect(() => {
       const fetchEvents = async () => {
         const calendarEntries = await getCalendarEntries(selectedAccommodation);
         setEvents(calendarEntries);
         
         console.log(calendarEntries); // Log the fetched events
         
         setMonthEntries([]); // Reset the monthEntries array
         calendarEntries.map((entry) => {
          //  console.log(entry.title);
          //  console.log(moment(entry.start).format('MMMM'));
          //  console.log(entry.end);
          const monthEntry = moment(entry.start).format('MMM');
          //monthEntries.push(monthEntry);
          setMonthEntries((prev) => [...prev, monthEntry]);
         });

          //console.log(monthEntries);
       };
  
       fetchEvents();
     }, [selectedAccommodation]);

    
     const handleChange = (
      event: React.SyntheticEvent | null,
      newValue: string | null,
      ) => {
        setSelectedAccommodation(newValue as string);
        console.log(`You chose "${newValue}"`);
      };

    return (
      <Box sx={{ paddingBottom: {xs:10}  }}>
        <Typography level="h2" mb={3}>
          Calendario Alojamientos
        </Typography>


        <Select
        defaultValue={selectedAccommodation} onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Accommodation' }}
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
        <br />
        <Typography mb={6}>
          se han encontrado {events.length} eventos <br />
          Entres los meses de {unique(monthEntries).join(", ")} <br />
          Eventos Confirmados: {events.filter((event) => event.status === "CONFIRMED").length} <span className="confirm-square"></span> <br />
          Eventos Cancelados: {events.filter((event) => event.status === "CANCELLED").length} <span className="red-square"></span>
          
          {/* <p style?={color:#EE4B2B}>(en rojo)</p> */}

        </Typography>
        
        
        
        
        <Calendar events={events} />

      </Box>
    );
  }