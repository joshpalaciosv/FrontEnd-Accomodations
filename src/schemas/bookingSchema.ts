import * as yup from "yup";

export const bookingSchema = yup.object({
    booking: yup
      .string()
      .required("El codigo de Reserva es requerido, ejemplo: BK123456")
      .min(1, "Ingresa al menos 10 caracteres")
      .max(10, "Ingresa como máximo 10 caracteres"),
    check_in_date: yup
      .string()
      .required("La fecha de llegada es requerida")
      .matches(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha debe estar en formato AAAA/MM/DD"),
    check_out_date: yup
        .string()
        .required("La fecha de salida es requerida")
        .matches(
          /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          "La fecha debe estar en formato AAAA/MM/DD"),
    total_amount: yup
        .number()
        .required("Ingrese un valor; el campo no puede estar en blanco")
        .positive("Debe ser un numero positivo")
        .min(1,"El monto debe contener almenos un numero"),
    accomodation_id: yup
        .number()
        .required(),
    user_id :yup
        .number()
        .required()

  });
  