import moment from "moment";
import Calendar from "./Calendar";
import { Box, Typography } from '@mui/joy';
// import { BarChart3, TrendingUp, Eye, Clock } from 'lucide-react';

const events = [
  {
    start: moment("2024-10-27T10:00:00").toDate(),
    end: moment("2024-10-27T11:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2024-10-27T14:00:00").toDate(),
    end: moment("2024-10-27T15:30:00").toDate(),
    title: "ENT Appointment",
  },
];

// export default function BasicCalendar() {
//   return <Calendar events={events} />;
// }

export default function BasicCalendar() {
    return (
      <Box sx={{ paddingBottom: {xs:10}  }}>
        <Typography level="h2" mb={3}>
          Calendario Alojamientos
        </Typography>
        
        <Calendar events={events} />

      </Box>
    );
  }