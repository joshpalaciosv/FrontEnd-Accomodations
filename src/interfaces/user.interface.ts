export interface User {
  id: number;
  name: string;
  email: string;
  // No lo devuelve la API.
  avatar?: string;
}

export interface UserAuth {
  // Email
  user: string;
  token: string;
  // No lo devuelve la API, en el estado manualmente se agregaría.
  data?: User;
}
