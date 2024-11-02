import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, CalendarProps, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // css para el calendario
import {CustomEvent, CustomEventCanceled} from './CalendarCustom/CustomEvent'; 
import CustomAgendaEvent from './CalendarCustom/CustomAgendaEvent'; 
import CustomAgendaDate from './CalendarCustom/CustomAgendaDate'; 
import CustomAgendaTime from './CalendarCustom/CustomAgendaTime';

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  //console.log("Start date:",currentDate);
  const [nearestDate, setNearestDate] = useState<Date>(new Date());

  useEffect(() => {
    if (props.events) {
      let i = 0;
      while(currentDate != nearestDate && i < props.events.length) {
        const eventDate = new Date(props.events[i].start);
        //console.log("Event date:", eventDate);
        //console.log(props.events?[i].start: "No hay eventos");
        if (eventDate > currentDate) {
          setNearestDate(eventDate);
        //   //break;
         }
        i++;
      }
    }
  }, [props.events]);
  
  const eventCustomColor = (event: any) => {
    //console.log(event.event.status);
    if (event.event.status === "CANCELLED") {
      return <CustomEventCanceled event={event} />;
    }
    else {
      return <CustomEvent event={event} />;
    }
    
  };


  return (
    <div>
      <BigCalendar {...props} localizer={localizer}
      defaultView="month" // la vista por defecto es la de mensual
      style={{ height: 600 }} 
      //date={nearestDate} 
      components={{
        event: eventCustomColor, // se usa cun componente personalizado para mostrar los eventos
        agenda: {
            event: CustomAgendaEvent,
            date: CustomAgendaDate,
            time: CustomAgendaTime // se personaliza la vista de agenda
          }
      }}
      />
    </div>
  )
}

