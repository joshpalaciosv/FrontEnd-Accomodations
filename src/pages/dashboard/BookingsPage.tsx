import { Box,Button, IconButton } from "@mui/joy";
import EnhancedTable from "../../components/tables/EnhancedTable";
import { useEffect, useState } from "react";
import { Booking } from "../../interfaces/booking.interface";
import { getAllBookings } from "../../services/bookingService";
import { ColDef } from "@ag-grid-community/core";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { MotionDiv } from "../../components/content/MotionDiv";
import MainModal from "../../components/modals/MainModal";
import { Eye, Edit } from "lucide-react";
import { MoBooking } from "../../components/modals/content/MoBooking";
import { BreadCrumb } from "../../components/BreadCrumb";
import { ModAddBooking } from "../../components/modals/content/MoAddBooking";
import { useLocation } from "react-router-dom";


function BookingsPage() {
   // MODALES IMPLEMENTADOS
   type ModalType = "viewBooking" | "addEditBooking";

  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal content
  const [isOpen, setIsOpen] = useState({
    viewBooking: false,
    addEditBooking: false,
  });

   // Selecciona la reserva seleccionada cuando se hace clic en el botón de acciones
  const [bookingSelected, setBookingSelected] = useState<Booking | null>(null);

  const handleModal = (type: ModalType) => {
    setIsOpen((prev)  => ({
      ...prev,
      // Cambia el estado del modal a su inverso, false a true y viceversa
      [type]: !prev[type],
    }));
  };
    // Cerrar todos los modals
    const onClose = () => {
      setIsOpen((prev) => ({
        ...prev,
        viewBooking: false,
        addEditBooking: false,
      }));
    };
  

  const CustomButtonComponent = (params: { data: Booking }) => {
    const handleClick = () => {
      setBookingSelected(params.data);
       // Asignar la reservacion seleccionada al estado
      handleModal("viewBooking");
    };
    // Función para abrir el modal de edición
    const handleEditClick = () => {
      // Asignar el alojamiento seleccionado al estado
      setBookingSelected(params.data);
      handleModal("addEditBooking");
    };



    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton
          variant="soft"
          color="primary"
          onClick={handleClick}
          size="sm"
        >
          <Eye />
        </IconButton>
        <IconButton
          variant="soft"
          color="warning"
          onClick={handleEditClick}
          size="sm"
        >
          <Edit />
        </IconButton>
      </Box>
    );
  };
    // Use effect para detectar cambios en la URL
  const location = useLocation();

  useEffect(() => {
    getAllBookings()
      .then((data) => {
        setBookingsData(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
      if (location.search.includes("modal=close")) {
        onClose();
        // Eliminar el parámetro de la URL
        window.history.replaceState({}, "", location.pathname);
      }
      // Se hará la petición de los alojamientos con el trigger que le envía el parámetro de la URL
      // Esto se puede hacer también con SWR, actualiza el estado de la tabla cuanto se vuelve a llamar.
    }, [location]);
  

  // Column definitions for the table
  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", filter: "agNumberColumnFilter" },
    { field: "booking", headerName: "Código" },
    { field: "accomodation", headerName: "Reservación" },
    {
      field: "total_amount",
      headerName: "Total",
      valueFormatter: (params) => `$${params.value.toFixed(2)}`, // Agregando el signo $
    },
    { field: "status", headerName: "Estado" },
    {
      field: "actions",
      headerName: "Acciones",
      cellRenderer: CustomButtonComponent,
      flex: 1,
    },
  ];
  const fechaString = "2012/12/12"; // formato "YYYY/MM/DD"
  const fecha = new Date(fechaString);

  return (
    <MotionDiv>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: { xs: "100%", md: "100%" },
        }}
      >
        <MainModal
          isOpen={isOpen.viewBooking}
          handleModal={()=>handleModal("viewBooking")}
          content={
            <MoBooking
              booking={
                bookingSelected ?? {
                  id: 0,
                  booking: "No seleccionado",
                  check_in_date: fecha,
                  check_out_date: fecha,
                  total_amount: 0,
                  status: "No seleccionado",
                  accomodation_id: 0,
                  user_id: 0,
                  created_at: fecha,
                  updated_at: fecha,
                  user: "No seleccionado",
                  accomodation: "No seleccionado",
                }
              }
            />
          }
          ariaLabelledBy="Profile on booking accommodations"
          ariaDescribedBy="View profile information and bookings"
        />
           {/* Modal para agregar y editar alojamiento */}
           <MainModal
          isOpen={isOpen.addEditBooking}
          handleModal={() => handleModal("addEditBooking")}
          content={
            <ModAddBooking
              booking={bookingSelected?.booking ?? ""}
              check_in_date={bookingSelected?.check_in_date ?? ""}
              check_out_date={bookingSelected?.check_out_date ?? ""}
              total_amount={bookingSelected?.total_amount ?? 0}
              status={bookingSelected?.status ?? ""}
            />
          }
          ariaLabelledBy="Add and edit accommodation"
          ariaDescribedBy="Create a new or edit an existing accommodation"
        />




        <BreadCrumb
          title="Lista de Reservaciones"
          subtitle="Todas las reservaciones realizadas"
          imgSrc="/assets/backgrounds/decameron.webp"
          rightContent={
            <Button
              variant="soft"
              color="primary"
              onClick={() => {
                // Limpiar el estado del modal
                setBookingSelected(null);
                handleModal("addEditBooking");
              }}
            >
              Agregar nueva Reserva
            </Button>
          }
        />

        {isLoading ? (
          <TableSkeleton rowCount={8} columnCount={1} />
        ) : (
          <MotionDiv className="flex max-w-full flex-col items-center justify-center">
            <EnhancedTable<Booking>
              rowData={bookingsData}
              columnDefs={columnDefs}
              paginationPageSize={5}
            />
          </MotionDiv>
        )}
      </Box>
    </MotionDiv>
  );
}
export default BookingsPage;
