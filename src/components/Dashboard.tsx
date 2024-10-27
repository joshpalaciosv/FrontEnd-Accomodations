import { Grid, Card, AspectRatio, Typography, Box, Avatar } from "@mui/joy";
import { BarChart3, Users, DollarSign, TrendingUp } from "lucide-react";
import { MotionDiv } from "./content/MotionDiv";

// esta data solo es de prueba para mostrar algo en la pantalla
const stats = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "+14.5%",
    icon: <DollarSign />,
    color: "success",
  },
  {
    title: "Active Users",
    value: "2,435",
    change: "+5.25%",
    icon: <Users />,
    color: "primary",
  },
  {
    title: "Sales",
    value: "1,235",
    change: "+2.5%",
    icon: <TrendingUp />,
    color: "warning",
  },
  {
    title: "Conversion Rate",
    value: "3.15%",
    change: "+1.2%",
    icon: <BarChart3 />,
    color: "info",
  },
];

// esta es la funcion que se exporta para mostrar en la pantalla
// se utilizando componentes de @Mui/Joy para mostrar la data

export default function Dashboard() {
  return (
    <MotionDiv>
      <Box>
        <Typography level="h2" mb={3}>
          Principal
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat) => (
            <Grid key={stat.title} xs={12} sm={6} md={3}>
              <Card>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AspectRatio
                    ratio="1"
                    sx={{
                      width: 36,
                      borderRadius: "sm",
                      bgcolor: `${stat.color}.100`,
                      color: `${stat.color}.700`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </AspectRatio>
                  <Box sx={{ ml: "auto" }}>
                    <Typography level="body-xs" color="success">
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
                <Typography level="h4">{stat.value}</Typography>
                <Typography level="body-sm" color="neutral">
                  {stat.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Card>
              <Typography level="h4" mb={2}>
                Revenue Overview
              </Typography>
              <AspectRatio ratio="2">
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)",
                    borderRadius: "sm",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography level="body-lg">Chart placeholder</Typography>
                </Box>
              </AspectRatio>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card>
              <Typography level="h4" mb={2}>
                Recent Activity
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar size="sm" />
                    <Box>
                      <Typography level="body-sm">
                        User {i} completed action
                      </Typography>
                      <Typography level="body-xs" color="neutral">
                        2 hours ago
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MotionDiv>
  );
}
