import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { AddBookingForm } from "../../../interfaces/booking.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../../schemas/bookingSchema";
import {
  createBooking,
  updateBooking,
} from "../../../services/bookingService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { MotionDiv } from "../../content/MotionDiv";
import { FileWarningIcon } from "lucide-react";

export const ModAddBooking = (booking?: AddBookingForm) => {
  const isEditing = booking?.id && booking?.id > 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookingForm>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      ...booking,
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AddBookingForm> = async ({
    booking,
    check_in_date,
    check_out_date,
    total_amount,
    status,
    accomodation_id,
    user_id,
  }) => {
    setError(null);
    setLoading(true);
    try {
      const response = isEditing
        ? await updateBooking(
            { booking, check_in_date, check_out_date, total_amount, status, accomodation_id, user_id },
            booking?.id ?? 0,
          )
        : await createBooking({
            booking,
            check_in_date,
            check_out_date,
            total_amount,
            status,
            accomodation_id,
            user_id,
          });
      
      if (!response) {
        setError(
          `La reserva no se ha podido ${isEditing ? "actualizar" : "crear"}. Intente nuevamente.`,
        );
        return;
      }

      navigate("?modal=close");
      toast.success(
        `${isEditing ? "Reserva actualizada" : "Reserva creada"}`,
      );
      reset();
    } catch (error) {
      console.log(error);
      setError("Error al procesar la reserva");
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
        {isEditing ? "Actualizar" : "Agregar nueva"} reserva
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

            <FormControl>
              <FormLabel>Booking</FormLabel>
              <Input
                type="text"
                {...register("booking")}
                error={!!errors.booking}
              />
              {errors.booking && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.booking.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Fecha de Check-in</FormLabel>
              <Input
                type="date"
                {...register("check_in_date")}
                error={!!errors.check_in_date}
              />
              {errors.check_in_date && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.check_in_date.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Fecha de Check-out</FormLabel>
              <Input
                type="date"
                {...register("check_out_date")}
                error={!!errors.check_out_date}
              />
              {errors.check_out_date && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.check_out_date.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Monto Total</FormLabel>
              <Input
                type="number"
                {...register("total_amount")}
                error={!!errors.total_amount}
              />
              {errors.total_amount && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.total_amount.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Input
                type="text"
                {...register("status")}
                error={!!errors.status}
              />
              {errors.status && (
                <MotionDiv>
                  <FormHelperText sx={{ color: "danger.500" }}>
                    {errors.status.message}
                  </FormHelperText>
                </MotionDiv>
              )}
            </FormControl>

            {/* Botón de envío */}
            <Button
              type="submit"
              color="primary"
              loading={loading}
            >
              {isEditing ? "Actualizar reserva" : "Agregar reserva"}
            </Button>
          </Stack>
        </form>
      </MotionDiv>
    </Box>
  );
};
