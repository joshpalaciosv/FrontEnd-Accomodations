import { Accommodation } from "../interfaces/accommodations.interface";
import { apiBookings } from "./apiBookings";

// NO ES MI PARTE, LO QUITARÍA DE MI RAMA, SOLAMENTE ES UNA PRUEBA.

// Se podría enviar el token por parámetro´o tomarlo de sessionStorage
export const getAllBookings = async (): Promise<Accommodation[]> => {
  // Se podría verificar desde el session storage si tiene el token, antes de hacer la petición
  if (!apiBookings.defaults.headers.common["Authorization"]) {
    throw new Error("No se ha encontrado un Token");
  }
  // Otra forma de verificar si existe el token
  // if(!sessionStorage.getItem("token")){
  //   throw new Error("No se ha encontrado un Token");
  // }

  // **Accommodations**
  const { data } = await apiBookings.get<Accommodation[]>("/api/V1/accomodations");
  return data;

  // Si es que no está asignada en la instancia de apiBookings
  // const { data } = await apiBookings.get<Bookings[]>("/api/V1/accomodations", {
  //   headers: {
  //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //   },
  // });
};
