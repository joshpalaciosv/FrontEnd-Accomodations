import {
    Box,
    List,
    ListItem,
    Typography,
} from "@mui/joy";

import { Booking } from "../../../interfaces/booking.interface";

interface BookingProps {
    booking: Booking;
}

export const MoBooking = ({ booking }: BookingProps) => {
    const fechaCreacion = new Date(booking.created_at).toISOString().split("T")[0];
    const fechaActualizacion = new Date(booking.updated_at).toISOString().split("T")[0];
    const checkInDate = new Date(booking.check_in_date).toISOString().split("T")[0];
    const checkOutDate = new Date(booking.check_out_date).toISOString().split("T")[0];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
            <Typography level="h3" sx={{ textAlign: "left" }}>Información de la Reserva</Typography>
            <List aria-labelledby="booking-info" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                    <Typography level="title-sm">Código de Reserva: {booking.booking}</Typography>
                    <Typography level="body-sm">Usuario: {booking.user}</Typography>
                    <Typography level="body-sm">Alojamiento: {booking.accomodation}</Typography>
                    <Typography level="body-sm">Fecha Check-In: {checkInDate}</Typography>
                    <Typography level="body-sm">Fecha Check-Out: {checkOutDate}</Typography>
                    <Typography level="body-sm">Estado: {booking.status}</Typography>
                    <Typography level="body-sm">Total: ${booking.total_amount.toFixed(2)}</Typography>
                    <Typography level="body-sm">Fecha Creación: {fechaCreacion}</Typography>
                    <Typography level="body-sm">Última Actualización: {fechaActualizacion}</Typography>
                </ListItem>
            </List>
        </Box>
    );
};