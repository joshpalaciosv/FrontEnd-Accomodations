import { Calendar as BigCalendar, CalendarProps, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // css para el calendario
import CustomEvent from './CalendarCustom/CustomEvent'; 
import CustomAgendaEvent from './CalendarCustom/CustomAgendaEvent'; 
import CustomAgendaDate from './CalendarCustom/CustomAgendaDate'; 
import CustomAgendaTime from './CalendarCustom/CustomAgendaTime';

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return (
    <div>
      <BigCalendar {...props} localizer={localizer}
      defaultView="month" // la vista por defecto es la de mensual
      style={{ height: 600 }}
      components={{
        event: CustomEvent, // se usa cun componente personalizado para mostrar los eventos
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

