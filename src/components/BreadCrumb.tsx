import { Box, Typography } from "@mui/joy";

interface BreadCrumbProps {
  title: string;
  subtitle: string;
  imgSrc: string;
}

export const BreadCrumb = ({ title, subtitle, imgSrc }: BreadCrumbProps) => {
  return (
    <>
      <Box
        sx={{
          // Background linear gradient with image
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${imgSrc}")`,
          width: "100%",
          height: "150px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "0.5rem",
          justifyContent: "start",
          p: 3,
          gap: 1,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography level="h2" sx={{ color: "white" }}>
            {title}
          </Typography>
          <Typography level="body-lg" fontWeight={500} sx={{ color: "white" }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
