import {
  Accommodation,
  AddAccommodationForm,
} from "../interfaces/accommodations.interface";
import { apiBookings } from "./apiBookings";
//getAllAccommodations

export const getAllAccommodations = async (): Promise<Accommodation[] | []> => {
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token")!)
    : null;

  if (!token) {
    console.error(token);
    return [];
  }

  try {
    const { data } = await apiBookings.get<Accommodation[]>(
      "/api/V1/accomodations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data ?? [];
  } catch (error) {
    console.error("Error al obtener los alojamientos:", error);
    return [];
  }
};

export type CreateAccMessageResponse = {
  message: "Successfully registered" | "correctly updated";
  errors: object;
};

// No recibe todos los parámetros, solo el nombre del alojamiento, la dirección y la descripción.
export const createAccommodation = async (
  accommodation: AddAccommodationForm,
): Promise<boolean> => {
  const token = sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token")!)
    : null;

  if (!token) {
    console.error(token);
    return false;
  }

  // Si devuelve true, el alojamiento se ha creado correctamente.
  const { data } = await apiBookings.post<CreateAccMessageResponse>(
    "/api/V1/accomodation",
    accommodation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.message === "Successfully registered";
};

// En la interfaz también está el ID, pero solamente para corroborar que is lo envíe.
// Ya que está en tipo opcional el id en la interfaz.
export const updateAccommodation = async (
  accommodation: AddAccommodationForm,
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

  // Si devuelve true, el alojamiento se ha creado correctamente.
  const { data } = await apiBookings.put<CreateAccMessageResponse>(
    `/api/V1/accomodation/${id}`,
    accommodation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.message === "correctly updated";
};
