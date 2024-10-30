import useSWR from "swr";
import { Accommodation } from "../interfaces/accommodations.interface";
import { Booking } from "../interfaces/booking.interface";
import { User } from "../interfaces/user.interface";
import { getAllUsers } from "../services/userService";
import { getAllAccommodations } from "../services/accommodationService";
import { getAllBookings } from "../services/bookingService";

export interface DashboardState {
  bookings: Booking[];
  users: User[];
  accommodations: Accommodation[];
  totalRevenue: number;
}

export const useDashboard = () => {
  // Lo intenté con Promise.allSettled, perooooooooo...

  const { data: users, error: usersError } = useSWR<User[]>(
    "/users",
    getAllUsers,
  );

  const { data: accommodations, error: accommodationsError } = useSWR<
    Accommodation[]
  >("/accommodations", getAllAccommodations);

  const { data: bookings, error: bookingsError } = useSWR<Booking[]>(
    "/bookings",
    getAllBookings,
  );

  // Verifica si hubo algún error
  const isError = usersError || accommodationsError || bookingsError;
  // Verifica si los datos están cargando
  const isLoading = !users || !accommodations || !bookings;

  // Calcula los ingresos totales cuando los datos están disponibles
  const totalRevenue = bookings
    ? bookings.reduce(
        (acc: number, booking: Booking) => acc + booking.total_amount,
        0,
      )
    : 0;

  const dashboardInfo: DashboardState | undefined =
    users && accommodations && bookings
      ? {
          users,
          accommodations,
          bookings,
          totalRevenue,
        }
      : undefined;

  return { dashboardInfo, isLoading, isError };
};
