import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser, removeUser } from './LoginPage';
import {
  Sheet, Box, List, ListItem, ListItemButton, Typography,
  IconButton, Avatar, Dropdown, Menu, MenuButton, MenuItem
} from '@mui/joy';
import {
  Home, LayoutDashboard, Calendar, LogOut,
  Menu as MenuIcon
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    removeUser();
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Principal', path: '/dashboard' },
    { icon: <Home size={20} />, label: 'Alojamientos', path: '/dashboard/accommodations' },
    { icon: <Calendar size={20} />, label: 'Reservaciones', path: '/dashboard/reservations' },
  ];

  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sheet
        sx={{
          display: {xs:'flex',md:'flex'},
          flexDirection: {xs:'row', md:'column'},
          width: { xs: 80, sm: 80, md: sidebarOpen ? 280 : 80 },
          // position: { xs: 'sticky', md: 'sticky' },
          // top: { xs: 'auto', md: 'auto' },
          // bottom: { xs: 'auto', md: 0 },
          // height: { xs: '50vh', md: '100vh' },
          transition: 'width 0.2s',
          zIndex: 1000,
          borderRight: '1px solid',
          borderColor: 'divider'
          
        }}
      >
        <Box sx={{ p: 2, display: {xs: 'none', md:'flex'}, alignItems: 'center', gap: 2 }}>
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
            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Dashboard</Typography>
          )}
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  gap: {xs:0, md: sidebarOpen ? 2 : 0},
                  justifyContent: { xs:'center', md: sidebarOpen ? 'flex-start' : 'center'},
                }}
              >
                {item.icon}
                {/* cuando el screen sea para mobile se oculta el texto */}
                <Typography
                  sx={{ display: { xs: 'none', md: 'block' } }}
                > 
                {/* si es sidebarOpen es verdadero se muestra el texto del menu */}
                {sidebarOpen && item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sheet>

      {/* Contenido Principal */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Sheet
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 999,
          }}
        >
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
            >
              <Avatar
                size="sm"
                src={user?.avatar}
                alt={user?.name}
              />
            </MenuButton>
            <Menu placement="bottom-end">
              <MenuItem>{user?.name}</MenuItem>
              <MenuItem>{user?.email}</MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogOut size={16} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Dropdown>
        </Sheet>

        {/* aca se ubica el contenido de la pagina a la derecha del menu */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}