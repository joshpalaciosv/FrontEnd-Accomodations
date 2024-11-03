import {
   Booking,
   AddBookingForm } from "../interfaces/booking.interface";
import { apiBookings } from "./apiBookings";

//getAllBookings
export const getAllBookings = async (): Promise<Booking[] | []> => {
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')!) : null;
    
  if (!token) {
    console.error(token);
    return [];
  }

  try {
    const { data } = await apiBookings.get<Booking[]>("/api/V1/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return data ?? [];
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    return [];
  }
};
export type CreateBookMessageResponse = {
  message: "Successfully registered" | "correctly updated";
  errors: object;
};

export const createBooking = async(
  booking:AddBookingForm,
 /* check_in_date: AddBookingForm,
  check_out_date: AddBookingForm,
  total_amount: AddBookingForm,
  accomodation_id:AddBookingForm,
  user_id: AddBookingForm,*/
):Promise<boolean> => {
  const token =sessionStorage.getItem("token")
  ? JSON.parse(sessionStorage.getItem("token")!)
  :null;
  if (!token) {
    console.error(token);
    return false;
  }

  // Si devuelve true, la reservacion se ha creado correctamente.
  const { data } = await apiBookings.post<CreateBookMessageResponse>(
    "/api/V1/booking",
    booking,
   /* check_in_date,
    check_out_date,
    total_amount,
    accomodation_id,
    user_id,*/
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.message === "Successfully registered";
};

export const updateBooking = async (
  booking: AddBookingForm,
  id: number,
): Promise<boolean> => {
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token")!)
    : null;

  if (!token) {
    console.error(token);
    return false;
  }

  if (id <= 0) {
    return false;
  }

  // Si devuelve true, la reservacion se ha modificado correctamente.
  const { data } = await apiBookings.put<CreateBookMessageResponse>(
    `/api/V1/status_booking/${id}`,
    booking,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.message === "correctly updated";
};
