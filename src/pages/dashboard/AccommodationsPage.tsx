import { Box, Button, IconButton } from "@mui/joy";
import EnhancedTable from "../../components/tables/EnhancedTable";
import { useEffect, useState } from "react";
import { Accommodation } from "../../interfaces/accommodations.interface";
import { getAllAccommodations } from "../../services/accommodationService";
import { ColDef } from "@ag-grid-community/core";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { MotionDiv } from "../../components/content/MotionDiv";
import MainModal from "../../components/modals/MainModal";
import { Edit, Eye } from "lucide-react";
import { MoAccommodation } from "../../components/modals/content/MoAccommodation";
import { BreadCrumb } from "../../components/BreadCrumb";
import { MoAddAccommodation } from "../../components/modals/content/MoAddAccommodation";
import { useLocation } from "react-router-dom";

function AccommodationsPage() {
  // MODALES IMPLEMENTADOS
  type ModalType = "viewAccommodation" | "addEditAccommodation";

  const [accommodationsData, setAccommodationsData] = useState<Accommodation[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  // Contenido del modal
  const [isOpen, setIsOpen] = useState({
    viewAccommodation: false,
    addEditAccommodation: false,
  });

  // Selecciona el alojamiento seleccionado cuando se hace clic en el botón de acciones
  const [accommodationSelected, setAccommodationSelected] =
    useState<Accommodation | null>(null);

  const handleModal = (type: ModalType) => {
    setIsOpen((prev) => ({
      ...prev,
      // Cambia el estado del modal a su inverso, false a true y viceversa
      [type]: !prev[type],
    }));
  };

  // Cerrar todos los modals
  const onClose = () => {
    setIsOpen((prev) => ({
      ...prev,
      viewAccommodation: false,
      addEditAccommodation: false,
    }));
  };

  // Botón que aparece en la tabla para ver los detalles del alojamiento
  const CustomViewButton = (params: { data: Accommodation }) => {
    // Función para abrir el modal de vista
    const handleViewClick = () => {
      // Asignar el alojamiento seleccionado al estado
      setAccommodationSelected(params.data);
      handleModal("viewAccommodation");
    };
    // Función para abrir el modal de edición
    const handleEditClick = () => {
      // Asignar el alojamiento seleccionado al estado
      setAccommodationSelected(params.data);
      handleModal("addEditAccommodation");
    };

    return (
      <Box
        gap={1}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton
          variant="soft"
          color="primary"
          onClick={handleViewClick}
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

  // Obtiene los alojamientos de la API
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

    if (location.search.includes("modal=close")) {
      onClose();
      // Eliminar el parámetro de la URL
      window.history.replaceState({}, "", location.pathname);
    }
    // Se hará la petición de los alojamientos con el trigger que le envía el parámetro de la URL
    // Esto se puede hacer también con SWR, actualiza el estado de la tabla cuanto se vuelve a llamar.
  }, [location]);

  // Definiciones de columnas para la tabla
  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", filter: "agNumberColumnFilter" },
    { field: "name", headerName: "Nombre del Alojamiento" },
    { field: "address", headerName: "Dirección" },
    {
      field: "actions",
      headerName: "Acciones",
      cellRenderer: CustomViewButton,
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
        {/* Modales para ver alojamiento */}
        <MainModal
          isOpen={isOpen.viewAccommodation}
          handleModal={() => handleModal("viewAccommodation")}
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
          ariaLabelledBy="View accommodation"
          ariaDescribedBy="View quick information of accommodation"
        />

        {/* Modal para agregar y editar alojamiento */}
        <MainModal
          isOpen={isOpen.addEditAccommodation}
          handleModal={() => handleModal("addEditAccommodation")}
          content={
            <MoAddAccommodation
              id={accommodationSelected?.id ?? 0}
              address={accommodationSelected?.address ?? ""}
              name={accommodationSelected?.name ?? ""}
              description={accommodationSelected?.description ?? ""}
            />
          }
          ariaLabelledBy="Add and edit accommodation"
          ariaDescribedBy="Create a new or edit an existing accommodation"
        />

        <BreadCrumb
          title="Lista de Alojamientos"
          subtitle="Todas las habitaciones y lugares disponibles"
          imgSrc="/assets/backgrounds/mazatlan.webp"
          rightContent={
            <Button
              variant="soft"
              color="primary"
              onClick={() => {
                // Limpiar el estado del modal
                setAccommodationSelected(null);
                handleModal("addEditAccommodation");
              }}
            >
              Agregar nuevo alojamiento
            </Button>
          }
        />

        {isLoading ? (
          <TableSkeleton rowCount={8} columnCount={1} />
        ) : (
          <MotionDiv className="flex max-w-full flex-col items-center justify-center">
            <EnhancedTable<Accommodation>
              rowData={accommodationsData}
              columnDefs={columnDefs}
              paginationPageSize={10}
            />
          </MotionDiv>
        )}
      </Box>
    </MotionDiv>
  );
}

export default AccommodationsPage;
