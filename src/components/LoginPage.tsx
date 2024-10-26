import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, Typography, FormControl, FormLabel, Input, Button, Stack, Box } from '@mui/joy';
import { LogIn } from 'lucide-react';

// funcion para guardar el usuario en localStorage
const setUser = (userData: any) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

// funcion para obtener el usuario de localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// funciona para remover el usuario de localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
};

// esta es la funcion que se exporta para mostrar en la pantalla
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    // Simulamos llamar a una API, aca se ubicara la llamada a tu backend de Acommodations.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // por el momento se ha ubicado un usuario demo en el localStorage.
    // aca se reemplazara por el Endpoint de Usuario de el Backend de Accommodations
    if (email === 'demo@example.com' && password === 'demo123') {

      // se guarda el usuario en el localStorage, con Id, Nombre, Email y Avatar
      const userData = {
        id: '1',
        name: 'Demo User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
      };
      setUser(userData);
      return userData;
    }
    throw new Error('Credenciales Invalidas');
  };

  // funcion para manejar el submit del formulario
  // si todo esta correcto se redirige al dashboard
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await handleLogin(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Fallo al iniciar sesión, por favor verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)'
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 300,
          py: 3,
          px: 4,
          borderRadius: 'lg',
          boxShadow: 'lg',
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <LogIn size={32} />
          </Box>
          <Typography level="h4" component="h1" textAlign="center">
            Bienvenido
          </Typography>
          {error && (
            <Typography color="danger" fontSize="sm" textAlign="center">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button type="submit" loading={loading}>
                Iniciar Sesión
              </Button>
            </Stack>
          </form>
          <Typography level="body-sm" textAlign="center">
            Demo: demo@example.com / demo123
          </Typography>
        </Stack>
      </Sheet>
    </Box>
  );
}