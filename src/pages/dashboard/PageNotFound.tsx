import { Box, Button } from "@mui/joy";
import { MotionDiv } from "../../components/content/MotionDiv";
import { BreadCrumb } from "../../components/BreadCrumb";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
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
          <BreadCrumb
            title="Página no encontrada"
            subtitle="El enlace que has seguido no existe o ha sido retirado."
            imgSrc="/assets/backgrounds/decameron.webp"
            rightContent={
              <Button variant="soft" color="primary">
                <Link to="/">Volver al inicio</Link>
              </Button>
            }
          />
        </Box>
      </MotionDiv>
    </>
  );
}
export default PageNotFound;
