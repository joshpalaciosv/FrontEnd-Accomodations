import { User, UserAuth } from "../interfaces/user.interface";
import { apiBookings } from "./apiBookings";

// Función para iniciar sesión y guardar el token en sessionStorage
export const signIn = async (
  email: string,
  password: string,
): Promise<UserAuth | null> => {
  const { data } = await apiBookings.post<UserAuth>("/api/V1/login", {
    email,
    password,
  });
  // Si no tenemos token...
  if (!data.token) return null;

  // Tenemos token, el email es válido.
  // data.user es el email del usuario.
  const user = await getUserData(data.user);
  if (user) {
    const userFormatted: UserAuth = {
      user: user.email,
      token: data.token,
      data: user,
    };
    setUser(userFormatted);
    return userFormatted;
  }
  // La cuenta ya no existe...
  return null;
};

export const getUserData = async (email: string): Promise<User | null> => {
  if (!email) return null;
  // No hay endpoint para obtener el usuario individual, así que obtener desde la ruta de todos usuarios.
  const { data } = await apiBookings.get<User[]>("/api/V1/users");
  return data.find((user) => user.email === email) ?? null;
};

const setUser = (userData: UserAuth) => {
  sessionStorage.setItem("token", JSON.stringify(userData.token));

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: userData.data?.id,
      email: userData.user,
      avatar: userData.data?.avatar,
      name: userData.data?.name,
    }),
  );

  apiBookings.defaults.headers.common["Authorization"] =
    `Bearer ${userData.token}`;
};

// Función para cerrar sesión, eliminando los datos de sessionStorage y localStorage
export const signOut = () => {
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  apiBookings.defaults.headers.common["Authorization"] = "";
};

// Función para obtener el usuario autenticado desde sessionStorage y localStorage
export const getAuthUser = (): UserAuth | null => {
  // El token es importante, así que lo guardamos en sessionStorage
  const token = sessionStorage.getItem("token");
  // Los datos del usuario se guardan en localStorage
  const user = localStorage.getItem("user");

  // Dando el nuevo formato para recibir los datos del usuario y el token.
  if (token && user) {
    try {
      const parsedUser: User = JSON.parse(user);
      return {
        user: parsedUser.email,
        token,
        data: parsedUser,
      };
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  return null;
};
