import { Box, IconButton, Typography } from "@mui/joy";
import EnhancedTable from "../../components/tables/EnhancedTable";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/user.interface";
import { getAllUsers } from "../../services/userService";
import { ColDef } from "@ag-grid-community/core";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { MotionDiv } from "../../components/content/MotionDiv";
import MainModal from "../../components/modals/MainModal";
import { Eye } from "lucide-react";
import { MoUserProfile } from "../../components/modals/content/MoUserProfile";

function UsersPage() {
  // Data tables
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal content
  const [isOpen, setIsOpen] = useState(false);
  const [userSelected, setUserSelected] = useState<User | null>(null);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const CustomButtonComponent = (params: { data: User }) => {
    const handleClick = () => {
      // Establece el usuario seleccionado al hacer clic
      setUserSelected(params.data);
      // `params.data` contiene toda la información de la fila
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

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", filter: "agNumberColumnFilter" },
    { field: "name", headerName: "Nombre" },
    {
      field: "email",
      headerName: "Correo Electrónico",
      filter: "agTextColumnFilter",
    },
    // Buttons para acciones
    {
      field: "actions",
      headerName: "Acciones",
      cellRenderer: CustomButtonComponent,
      flex: 1,
    },
  ];

  return (
    <MotionDiv>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: 3,
          width: {
            xs: "100%",
            md: "100%",
          },
        }}
      >
        <MainModal
          isOpen={isOpen}
          handleModal={handleModal}
          content={
            <MoUserProfile
              user={
                userSelected ?? {
                  email: "No seleccionado",
                  name: "Sin definir",
                  id: 0,
                }
              }
            />
          }
          ariaLabelledBy="Profile on booking accommodations"
          ariaDescribedBy="View profile information and bookings"
        />
        <Typography level="h2" mb={3}>
          Lista de Usuarios
        </Typography>

        {isLoading ? (
          <TableSkeleton rowCount={5} columnCount={1} />
        ) : (
          <MotionDiv className="flex max-w-full flex-col items-center justify-center">
            <EnhancedTable<User>
              rowData={userData}
              columnDefs={columnDefs}
              paginationPageSize={5}
            />
          </MotionDiv>
        )}
      </Box>
    </MotionDiv>
  );
}
export default UsersPage;
