import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Sheet,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  Avatar,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import {
  Home,
  LayoutDashboard,
  Calendar,
  LogOut,
  Menu as MenuIcon,
  User,
} from "lucide-react";
import { UserAuth } from "../interfaces/user.interface";
import { getAuthUser, signOut } from "../services/authService";
import { MotionDiv } from "./content/MotionDiv";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserAuth | null>(getAuthUser());
  const navigate = useNavigate();
  const location = useLocation();
  const isScreenWidthMoreThan600 = useMediaQuery(
    "(min-width:600px) and (max-height:500px)",
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    signOut();
    navigate("/");
  };

  //aca se definen los items del menu
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Principal",
      path: "/dashboard",
    },
    {
      icon: <Home size={20} />,
      label: "Alojamientos",
      path: "/dashboard/accommodations",
    },
    {
      icon: <Calendar size={20} />,
      label: "Reservaciones",
      path: "/dashboard/reservations",
    },
    { icon: <User size={20} />, label: "Usuarios", path: "/dashboard/users" },
    {
      icon: <Calendar size={20} />,
      label: "Calendario",
      path: "/dashboard/calendar",
    },
  ];

  if (!user) return null;

  return (
    // este box define el contenido principal de la App incluido el sidebar, la barra donde se despliega el avatar de usuario y luego el contenido
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sheet
        sx={{
          // display: {xs:'flex',md:'flex'},
          // flexDirection: {xs:'row', md:'column'},
          minWidth: { xs: 0, sm: 80, md: sidebarOpen ? 280 : 80 },
          position: { xs: "fixed", md: "sticky" },
          // top: { xs: 0, md: 0 },
          bottom: { xs: 0, md: "auto" },
          // utilizamos el isScreenWidthMoreThan600 para que el sidebar no se oculte en mobile cuando esta en horizontal
          height: {
            xs: isScreenWidthMoreThan600 ? "17vh" : "7.5vh",
            md: "100vh",
          },
          transition: "width 0.2s",
          zIndex: 1000,
          borderRight: "1px solid",
          borderColor: "divider",
          marginBottom: { xs: -2, sm: -2 },
          paddingBottom: { xs: 8, sm: 2 },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
          {sidebarOpen && (
            // <Typography level="h5">Dashboard</Typography>
            // cuando el screen sea para mobile se oculta el texto
            <Typography
              sx={{ display: { xs: "none", md: "block" } }}
              fontWeight={600}
              color="neutral"
            >
              Dashboard
            </Typography>
          )}
        </Box>
        <List
          sx={{
            display: { xs: "flex", md: "flex" },
            flexDirection: { xs: "row", md: "column" },
            width: { xs: "100vw", md: "100%" },
            // border: '1px solid',
            backgroundColor: "white",

            // alignItems: 'center',
            justifyContent: { xs: "space-around" },
          }}
        >
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem key={item.label}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => navigate(item.path)}
                  sx={{
                    gap: { xs: 0, md: sidebarOpen ? 2 : 0 },
                    justifyContent: {
                      xs: "center",
                      md: sidebarOpen ? "flex-start" : "center",
                    },
                  }}
                >
                  <Typography
                    level="body-md"
                    fontWeight={500}
                    sx={{
                      color: isSelected ? "primary.400" : "gray",
                    }}
                  >
                    {item.icon}
                  </Typography>
                  {/* cuando el screen sea para mobile se oculta el texto */}
                  <Typography
                    fontWeight={600}
                    level="body-sm"
                    sx={{
                      display: { xs: "none", md: "block" },
                      color: isSelected ? "primary.400" : "gray",
                    }}
                  >
                    {/* si es sidebarOpen es verdadero se muestra el texto del menu */}
                    {sidebarOpen && item.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Sheet>

      {/* Contenido Principal */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Sheet
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: "plain", color: "neutral" } }}
            >
              <Avatar
                size="sm"
                src={user?.data?.avatar}
                alt={user?.data?.name}
              />
            </MenuButton>
            <Menu placement="bottom-end">
              <MotionDiv animation="slideFade">
                <MenuItem>{user?.data?.name}</MenuItem>
                <MenuItem>{user?.data?.email}</MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogOut size={16} />
                  Cerrar Sesión
                </MenuItem>
              </MotionDiv>
            </Menu>
          </Dropdown>
        </Sheet>

        {/* aca se ubica el contenido de la pagina a la derecha del menu */}
        <Box sx={{ p: 3, flexGrow: 1, mb: 20 }}>{children}</Box>
      </Box>
    </Box>
  );
}
