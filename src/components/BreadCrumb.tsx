import { Box, Typography } from "@mui/joy";

interface BreadCrumbProps {
  title: string;
  subtitle: string;
  imgSrc: string;
  rightContent?: React.ReactNode;
}

export const BreadCrumb = ({
  title,
  subtitle,
  imgSrc,
  rightContent,
}: BreadCrumbProps) => {
  return (
    <>
      <Box
        sx={{
          // Background linear gradient with image
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${imgSrc}")`,
          width: "100%",
          minHeight: "150px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "0.5rem",
          justifyContent: "space-between",
          p: 3,
          gap: 1,
          alignItems: {
            md: "center",
            xs: "flex-start",
          },
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
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
        {/* Right content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {rightContent}
        </Box>
      </Box>
    </>
  );
};
