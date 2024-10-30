import React from "react";
import Chart from "react-apexcharts";
import {
  Grid,
  Card,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/joy";
import { FaUsers, FaDollarSign, FaChartBar, FaHome } from "react-icons/fa";
import { MotionDiv } from "../components/content/MotionDiv";
import { useDashboard } from "../hooks/useDashboard";
import { BreadCrumb } from "../components/BreadCrumb";

type StatsId = "users" | "totalRevenue" | "bookings" | "accommodations";
interface StatsProps {
  id: StatsId;
  title: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatsProps[] = [
  {
    id: "users",
    title: "Usuarios registrados",
    icon: <FaUsers className="text-blue-700" />,
    color: "bg-blue-100",
  },
  {
    id: "totalRevenue",
    title: "Ingresos Totales",
    icon: <FaDollarSign className="text-green-700" />,
    color: "bg-green-100",
  },
  {
    id: "bookings",
    title: "Reservaciones realizadas",
    icon: <FaChartBar className="text-indigo-700" />,
    color: "bg-indigo-100",
  },
  {
    id: "accommodations",
    title: "Acomodaciones publicadas",
    icon: <FaHome className="text-yellow-700" />,
    color: "bg-yellow-100",
  },
];

export default function Dashboard() {
  const { dashboardInfo, isLoading } = useDashboard();

  const showData = (id: StatsId) => {
    switch (id) {
      case "users":
        return dashboardInfo?.users.length;
      case "totalRevenue":
        return dashboardInfo?.totalRevenue;
      case "bookings":
        return dashboardInfo?.bookings.length;
      case "accommodations":
        return dashboardInfo?.accommodations.length;
      default:
        return 0;
    }
  };

  // Preparación de datos para el gráfico
  const revenueData = dashboardInfo?.bookings.map((booking) => ({
    date: new Date(booking.check_in_date).toLocaleDateString("es-ES"),
    amount: booking.total_amount,
  }));

  const chartSeries = [
    {
      name: "Ingresos",
      data: revenueData?.map((data) => data.amount) || [],
    },
  ];

  return (
    <MotionDiv>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <BreadCrumb
          title="Panel de Control"
          subtitle="Vista general de reservas e ingresos"
          imgSrc="/assets/backgrounds/decameron.webp"
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat) => (
            <Grid key={stat.title} xs={12} sm={6} md={3}>
              <Card>
                <Box className={`mb-1 flex items-center gap-2 rounded-lg`}>
                  <Box
                    className={`${stat.color} flex h-[46px] w-[46px] items-center justify-center rounded-xl`}
                  >
                    {stat.icon}
                  </Box>
                  <Typography level="h4">
                    {isLoading ? (
                      <CircularProgress size="md" color="primary" />
                    ) : (
                      <MotionDiv>
                        <>{showData(stat.id)}</>
                      </MotionDiv>
                    )}
                  </Typography>
                </Box>
                <Typography level="body-sm" fontWeight={500} color="neutral">
                  {stat.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Card
              sx={{
                overflow: "hidden",
                height: {
                  xs: "100%", // Altura 100% en móvil
                  md: "480px", // Altura 400px en desktop
                },
              }}
            >
              <Typography level="h4" mb={2}>
                Ganancias por fechas
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: "100%", // Altura 100% en móvil
                    md: "400px", // Altura 400px en desktop
                  },
                  paddingBottom: "75%", // Establece el aspecto de 4:3 (3 dividido entre 4 = 0.75)
                  position: "relative",
                  overflow: "hidden", // Oculta cualquier contenido que exceda la altura máxima
                }}
              >
                {isLoading ? (
                  <CircularProgress size="md" color="primary" />
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: {
                        xs: "100%", // Altura 100% en móvil
                        md: "450px", // Altura 100% en desktop
                      },
                    }}
                  >
                    <MotionDiv>
                      <Chart
                        options={{
                          colors: ["#26c6da"],
                          chart: {
                            type: "line",
                            height: "100%", // Utiliza la altura del contenedor
                          },
                          xaxis: {
                            categories: revenueData?.map((data) => data.date),
                            title: {
                              text: "Fecha",
                            },
                          },
                          yaxis: {
                            title: {
                              text: "Ingresos",
                            },
                          },
                          stroke: {
                            curve: "smooth",
                          },
                          dataLabels: {
                            enabled: false,
                          },
                        }}
                        series={chartSeries}
                        type="area"
                        width="100%"
                        height="100%"
                      />
                    </MotionDiv>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card>
              <Typography level="h4" mb={2}>
                Ultimas Reservaciones
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {isLoading ? (
                  <CircularProgress size="md" color="primary" />
                ) : (
                  dashboardInfo?.bookings
                    ?.slice(0, 6)
                    .reverse()
                    .map((booking) => (
                      <Box
                        key={booking.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Avatar size="sm" />
                        <Box>
                          <Typography level="body-sm">
                            <span className="text-sm font-bold">Lugar: </span>
                            {booking.accomodation}
                          </Typography>
                          <Typography level="body-sm">
                            <span className="text-sm font-bold">Nombre: </span>

                            {booking.user}
                          </Typography>
                          <Typography level="body-xs" color="neutral">
                            <span className="text-sm font-bold">
                              Realizado el:{" "}
                            </span>
                            {new Date(booking.created_at).toLocaleString(
                              "es-MX",
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MotionDiv>
  );
}
