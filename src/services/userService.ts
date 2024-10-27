import { User } from "../interfaces/user.interface";
import { apiBookings } from "./apiBookings";

export const getAllUsers = async (): Promise<User[] | []> => {
  // Recibe la respuesta de la API y devuelve el array de usuarios tipado
  // Si la respuesta es nula, devuelve un array vacío (?? Nullish coalescing operator)
  const { data } = (await apiBookings.get<User[]>("/api/V1/users")) ?? [];
  return data;
};
