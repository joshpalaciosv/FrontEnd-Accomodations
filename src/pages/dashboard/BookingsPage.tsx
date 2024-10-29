import { Box, Typography, IconButton } from "@mui/joy";
import EnhancedTable from "../../components/tables/EnhancedTable";
import { useEffect, useState } from "react";
import { Booking } from "../../interfaces/booking.interface";
import { getAllBookings } from "../../services/bookingService";
import { ColDef } from "@ag-grid-community/core";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { MotionDiv } from "../../components/content/MotionDiv";
import MainModal from "../../components/modals/MainModal";
import { Eye } from "lucide-react";
import { MoBooking } from "../../components/modals/content/MoBooking";


function BookingsPage() {
    const [bookingsData, setBookingsData] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal content
    const [isOpen, setIsOpen] = useState(false);
    const [bookingSelected, setBookingSelected] = useState<Booking | null>(null);


    const handleModal = () => {
        setIsOpen((prev) => !prev);
    };
    
    const CustomButtonComponent = (params: { data: Booking }) => {
        const handleClick = () => {
            setBookingSelected(params.data);
        handleModal();
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconButton variant="soft" color="primary" onClick={handleClick} size="sm">
          <Eye />
        </IconButton>
      </Box>
    );
  };

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
  }, []);

  // Column definitions for the table
  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", filter: "agNumberColumnFilter" },
    { field: "booking", headerName: "Código" },
    { field: "accomodation", headerName: "Reservación" },
    { 
        field: "total_amount", 
        headerName: "Total", 
        valueFormatter: (params) => `$${params.value.toFixed(2)}` // Agregando el signo $
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: { xs: "100%", md: "100%" } }}>
        
        <MainModal
          isOpen={isOpen}
          handleModal={handleModal}
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

        <Typography level="h2" mb={3}>
          Lista de Reservaciones
        </Typography>

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