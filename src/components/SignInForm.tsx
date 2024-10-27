import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@mui/joy";
import { signInSchema } from "../schemas";
import { MotionDiv } from "./content/MotionDiv";
import { signIn } from "../services/authService";
import { useState } from "react";
import { FileWarningIcon, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Definimos la interfaz de datos para el formulario
interface FormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  // Configuración del formulario con react-hook-form y yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });

  // Estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navegación
  const navigate = useNavigate();

  // Función para manejar el envío de datos del formulario
  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setError(null);
    setLoading(true);
    try {
      const response = await signIn(email, password);

      if (!response?.token) {
        return setError("Acceso no autorizado");
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {error && (
            <MotionDiv animation="slideFade">
              <Alert
                startDecorator={<FileWarningIcon />}
                variant="outlined"
                color="danger"
              >
                {error}
              </Alert>
            </MotionDiv>
          )}

          {/* Campo Email */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email")}
              error={!!errors.email} // Marca el input como error si hay errores
            />
            {errors.email && (
              <MotionDiv>
                <FormHelperText sx={{ color: "danger.500" }}>
                  {errors.email.message}
                </FormHelperText>
              </MotionDiv>
            )}
          </FormControl>

          {/* Campo Password */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password")}
              error={!!errors.password} // Marca el input como error si hay errores
            />
            {errors.password && (
              <MotionDiv>
                <FormHelperText sx={{ color: "danger.500" }}>
                  {errors.password.message}
                </FormHelperText>
              </MotionDiv>
            )}
          </FormControl>

          {/* Botón de envío */}
          <Button
            type="submit"
            color="primary"
            loading={loading}
            startDecorator={<Lock size={15} fontWeight={700} />}
          >
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </MotionDiv>
  );
};
