import * as yup from "yup";

export const accommodationSchema = yup.object({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(5, "Ingresa al menos 5 caracteres")
    .max(50, "Ingresa como máximo 50 caracteres"),
  address: yup
    .string()
    .required("La dirección es requerida")
    .min(15, "Ingresa al menos 15 caracteres")
    .max(70, "Ingresa como máximo 70 caracteres"),
  description: yup
    .string()
    .required("La descripción es requerida")
    .min(10, "Ingresa al menos 10 caracteres")
    .max(300, "Ingresa como máximo 300 caracteres"),
});
