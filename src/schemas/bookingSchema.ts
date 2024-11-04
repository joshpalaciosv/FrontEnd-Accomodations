import * as yup from "yup";

/*export const bookingSchema = yup.object({
    booking: yup
      .string()
      .required("El codigo de Reserva es requerido, ejemplo: BK123456")
      .min(1, "Ingresa al menos 10 caracteres")
      .max(10, "Ingresa como máximo 10 caracteres"),
    check_in_date: yup
      .date()
      .required("La fecha de llegada es requerida"),
      /*.matches(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "La fecha debe estar en formato AAAA/MM/DD"),
    check_out_date: yup
        .date()
        .required("La fecha de llegada es requerida"),
      /*.matches(
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
  import * as yup from 'yup';*/

export const bookingSchema = yup.object().shape({
  booking: yup.string().required('El campo es obligatorio'),
  check_in_date: yup.date().required('La fecha de check-in es obligatoria'),
  check_out_date: yup.date().required('La fecha de check-out es obligatoria'),
  total_amount: yup.number().required('El monto total es obligatorio').positive(),
  status: yup.string().required('El estado es obligatorio'),
  accomodation_id: yup.number().required('El ID de alojamiento es obligatorio'),
  user_id: yup.number().required('El ID de usuario es obligatorio'),
});

  