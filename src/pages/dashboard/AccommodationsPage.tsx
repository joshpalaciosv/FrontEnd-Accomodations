import { Box, IconButton } from "@mui/joy";
import EnhancedTable from "../../components/tables/EnhancedTable";
import { useEffect, useState } from "react";
import { Accommodation } from "../../interfaces/accommodations.interface";
import { getAllAccommodations } from "../../services/accommodationService";
import { ColDef } from "@ag-grid-community/core";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { MotionDiv } from "../../components/content/MotionDiv";
import MainModal from "../../components/modals/MainModal";
import { Eye } from "lucide-react";
import { MoAccommodation } from "../../components/modals/content/MoAccommodation";
import { BreadCrumb } from "../../components/BreadCrumb";

function AccommodationsPage() {
  const [accommodationsData, setAccommodationsData] = useState<Accommodation[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  // Modal content
  const [isOpen, setIsOpen] = useState(false);
  const [accommodationSelected, setAccommodationSelected] =
    useState<Accommodation | null>(null);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const CustomButtonComponent = (params: { data: Accommodation }) => {
    const handleClick = () => {
      setAccommodationSelected(params.data);
      handleModal();
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
      </Box>
    );
  };

  // Get all accommodations from API
  useEffect(() => {
    getAllAccommodations()
      .then((data) => {
        setAccommodationsData(data);
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
    { field: "name", headerName: "Nombre del Alojamiento" },
    { field: "address", headerName: "Dirección" },
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
          isOpen={isOpen}
          handleModal={handleModal}
          content={
            <MoAccommodation
              accommodation={
                accommodationSelected ?? {
                  id: 0,
                  name: "No seleccionado",
                  address: "No seleccionado",
                  description: "njvn",
                  image: "ninguna",
                  created_at: fecha,
                  updated_at: fecha,
                }
              }
            />
          }
          ariaLabelledBy="Profile on booking accommodations"
          ariaDescribedBy="View profile information and bookings"
        />

        <BreadCrumb
          title="Lista de Alojamientos"
          subtitle="Todas las habitaciones disponibles"
          imgSrc="/assets/backgrounds/mazatlan.webp"
        />

        {isLoading ? (
          <TableSkeleton rowCount={8} columnCount={1} />
        ) : (
          <MotionDiv className="flex max-w-full flex-col items-center justify-center">
            <EnhancedTable<Accommodation>
              rowData={accommodationsData}
              columnDefs={columnDefs}
              paginationPageSize={5}
            />
          </MotionDiv>
        )}
      </Box>
    </MotionDiv>
  );
}

export default AccommodationsPage;
