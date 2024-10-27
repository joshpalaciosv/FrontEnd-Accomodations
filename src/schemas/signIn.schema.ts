import * as yup from "yup";

export const signInSchema = yup
  .object({
    email: yup
      .string()
      .required("El email es requerido")
      .email("Email inválido")
      .matches(
        /^[a-zA-ZñÑ0-9._%+-]+@[a-zA-ZñÑ0-9-]+(\.[a-zA-ZñÑ]{2,})(\.[a-zA-ZñÑ]{2,})?$/,
        "No es válido el formato del email",
      ),
    password: yup
      .string()
      .min(6, "Ingresa al menos 6 caracteres")
      .required("La contraseña requerida"), // Solo requiere que el campo esté rellenado
  })
  .required();
