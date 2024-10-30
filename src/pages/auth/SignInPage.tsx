import { Sheet, Typography, Stack, Box, Button } from "@mui/joy";
import { Link } from "react-router-dom";

// Icons
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMui } from "react-icons/si";
import { ImGithub } from "react-icons/im";
import { BookKey, Code, LogIn } from "lucide-react";

// Components
import { SignInForm } from "../../components/SignInForm";
import { MotionDiv } from "../../components/content/MotionDiv";

// función exportada para mostrar en la pantalla
export default function SignInPage() {
  return (
    <MotionDiv>
      {/* Header */}
      <Box
        component="nav"
        role="navigation"
        sx={{
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 999,
          gap: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "lg",
          padding: "1rem 1.5rem",
          width: "100%",
        }}
      >
        <Typography
          level="title-md"
          textAlign="center"
          fontWeight={600}
          sx={{
            fontSize: {
              xs: "14px",
              md: "16px",
            },
          }}
          startDecorator={<BookKey className="text-cyan-500" />}
        >
          Panel de Control
        </Typography>
        <Box>
          <Link
            target="_blank"
            to="https://github.com/joshpalaciosv/FrontEnd-Accomodations"
          >
            <Button
              variant="outlined"
              color="neutral"
              sx={{ borderRadius: "full" }}
            >
              <ImGithub size={20} className="text-slate-600" />
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="/">
            <Button
              variant="outlined"
              color="neutral"
              sx={{
                borderRadius: "full",
                fontSize: {
                  xs: "14px",
                  md: "14px",
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          px: {
            xs: 2,
            md: 10,
          },
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "paper",
          backgroundImage: "url(/assets/backgrounds/bg-wave.webp)",
          minHeight: "800px",
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
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "white",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "lg",
          padding: "1rem 1.5rem",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: {
              md: "row",
            },
            gap: 1,
          }}
        >
          <Typography
            level="title-md"
            textAlign="center"
            fontWeight={500}
            startDecorator={<Code className="text-slate-600" />}
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },
            }}
          >
            Desarrollado usando
          </Typography>
          <FaReact className="text-cyan-500" size={25} />
          <BiLogoTypescript className="text-blue-500" size={25} />
          <SiMui className="text-blue-500" size={25} />
        </Box>
        <Box></Box>
      </Box>
    </MotionDiv>
  );
}
