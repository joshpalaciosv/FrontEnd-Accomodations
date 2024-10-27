import { Sheet, Typography, Stack, Box } from "@mui/joy";
import { LogIn } from "lucide-react";
import { SignInForm } from "../../components/SignInForm";
import { MotionDiv } from "../../components/content/MotionDiv";

// función exportada para mostrar en la pantalla
export default function SignInPage() {
  return (
    <MotionDiv>
      <Box
        sx={{
          px: {
            xs: 2,
            md: 10,
          },
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "paper",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: {
              md: "75vw",
              xs: "90%",
            },
            py: 4,
            px: {
              xs: 3,
              md: 5,
            },
            borderRadius: "lg",
            boxShadow: "lg",
            display: "flex",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "900px",
            height: "auto",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: {
                md: "50%",
                xs: "100%",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <LogIn size={32} />
            </Box>
            <Typography level="h4" component="h1" textAlign="center">
              Bienvenido
            </Typography>

            <SignInForm />
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              mt={4}
              width="100%"
            >
              <Typography level="body-sm" textAlign="center">
                kade40@example.com
              </Typography>
              <Typography
                level="body-sm"
                textAlign="center"
                width="100%"
                sx={{
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                $2y$12$uYSt7J5Zwqho9cUpTkWCW.I4OVojaUjwxHMBZs4DBc48xvH.6Rnxa
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/assets/backgrounds/lasVeraneras.webp")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "lg",
              width: "50%",
              height: "100%",
              minHeight: "60vh",
              display: {
                lg: "flex",
                md: "flex",
                xs: "none",
              },
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
        </Sheet>
      </Box>
    </MotionDiv>
  );
}
