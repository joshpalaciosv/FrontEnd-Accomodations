import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { AddAccommodationForm } from "../../../interfaces/accommodations.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { accommodationSchema } from "../../../schemas/accommodationSchema";
import {
  createAccommodation,
  updateAccommodation,
} from "../../../services/accommodationService";
import { BiHome } from "react-icons/bi";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { MotionDiv } from "../../content/MotionDiv";
import { FileWarningIcon } from "lucide-react";

export const MoAddAccommodation = (accommodation?: AddAccommodationForm) => {
  // Si le paso el ID, es porque estoy editando un alojamiento, si no, es porque estoy creando uno nuevo.
  const isEditing = accommodation?.id && accommodation?.id > 0;

  // Configuración del formulario con react-hook-form y yup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddAccommodationForm>({
    resolver: yupResolver(accommodationSchema),
    defaultValues: {
      ...accommodation,
    },
    mode: "onChange",
  });

  // Estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navegación
  const navigate = useNavigate();

  // Función para manejar el envío de datos del formulario
  const onSubmit: SubmitHandler<AddAccommodationForm> = async ({
    address,
    name,
    description,
  }) => {
    setError(null);
    setLoading(true);
    try {
      const response = isEditing
        ? await updateAccommodation(
            { name, description, address },
            accommodation?.id ?? 0,
          )
        : await createAccommodation({
            name,
            description,
            address,
          });
      // La petición devuelve un booleano, si es falso, es porque no se ha podido crear el hospedaje.
      if (!response) {
        setError(
          `El hospedaje no se ha podido ${isEditing ? "actualizar" : "crear"}. Intente nuevamente.`,
        );
        return;
      }
      // Salir del modal enviando un parámetro que lo estará escuchando en la página de hospedajes.
      navigate("?modal=close");
      toast.success(
        `${isEditing ? "Alojamiento actualizado" : "Alojamiento agregado"}`,
      );
      confetti({
        scalar: 1.5,
        spread: 70,
      });
      // Borrar los datos del formulario
      reset();
    } catch (error) {
      console.log(error);
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        minWidth: "500px",
      }}
    >
      <Typography level="h3">
        {isEditing ? "Actualizar" : "Agregar nuevo"} alojamiento
      </Typography>
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

            {/* Nombre del hospedaje */}
            <FormControl>
              <FormLabel>Nombre del hospedaje</FormLabel>
              <Input
                type="text"
                {...register("name")}
                error={!!errors.name} // Marca el input como error si hay errores
              />
              {errors.name && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.name.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                minRows={4}
                {...register("description")}
                error={!!errors.description} // Marca el input como error si hay errores
              />
              {errors.description && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.description.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Dirección del hospedaje</FormLabel>
              <Input
                type="text"
                {...register("address")}
                error={!!errors.address} // Marca el input como error si hay errores
              />
              {errors.address && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.address.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            {/* Botón de envío */}
            <Button
              type="submit"
              color="primary"
              loading={loading}
              startDecorator={<BiHome size={15} fontWeight={700} />}
            >
              {isEditing ? "Actualizar alojamiento" : "Agregar alojamiento"}
            </Button>
          </Stack>
        </form>
      </MotionDiv>
    </Box>
  );
};
