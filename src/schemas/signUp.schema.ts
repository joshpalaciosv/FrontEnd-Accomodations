import * as yup from "yup";

export const signUpSchema = yup
  .object({
    firstName: yup
      .string()
      .required("Field required")
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ' ]*$/, "Invalid Characters")
      .min(3, "Min 3 length"),
    lastName: yup
      .string()
      .required("Field required")
      .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ' ]*$/, "Invalid Characters")
      .min(3, "Min 3 length"),
    email: yup
      .string()
      .required("Field required")
      .email("Invalid Email")
      .matches(
        /^[a-zA-ZñÑ0-9._%+-]+@[a-zA-ZñÑ0-9-]+(\.[a-zA-ZñÑ]{2,})(\.[a-zA-ZñÑ]{2,})?$/,
        "Invalid Email Format",
      ),
    password: yup.string().required("Field required"), // Solo requiere que el campo esté rellenado
    confirmPassword: yup
      .string()
      .required("Field required")
      .oneOf([yup.ref("password")], "Passwords must match"), // Solo comprueba que coincidan
  })
  .required();
