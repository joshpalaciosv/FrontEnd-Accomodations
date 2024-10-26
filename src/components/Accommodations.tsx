import { Box, Typography, Card, Grid, AspectRatio } from '@mui/joy';
import { BarChart3, TrendingUp, Eye, Clock } from 'lucide-react';

// esta data solo es de prueba para mostrar algo en la pantalla
const stats = [
  {
    title: 'Monthly Views',
    value: '45,678',
    icon: <Eye />,
    color: 'primary'
  },
  {
    title: 'Growth Rate',
    value: '+12.3%',
    icon: <TrendingUp />,
    color: 'success'
  },
  {
    title: 'Avg. Session',
    value: '4m 32s',
    icon: <Clock />,
    color: 'warning'
  },
  {
    title: 'Bounce Rate',
    value: '24.8%',
    icon: <BarChart3 />,
    color: 'info'
  }
];

// esta es la funcion que se exporta para mostrar en la pantalla
// se utilizando componentes de @Mui/Joy para mostrar la data

export default function Accommodations() {
  return (
    <Box>
      <Typography level="h2" mb={3}>
        Alojamientos
      </Typography>
      
      <Grid container spacing={2}>
        {stats.map((stat) => (
          <Grid key={stat.title} xs={12} sm={6} md={3}>
            <Card>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AspectRatio
                  ratio="1"
                  sx={{
                    width: 36,
                    borderRadius: 'sm',
                    bgcolor: `${stat.color}.100`,
                    color: `${stat.color}.700`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </AspectRatio>
              </Box>
              <Typography level="h4">{stat.value}</Typography>
              <Typography level="body-sm" color="neutral">
                {stat.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}