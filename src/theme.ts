import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  // No custom tokens found, you can skip the theme augmentation.
}

const theme = extendTheme({
  fontFamily: {
    body: "Montserrat",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#e0f7fa",
          "100": "#b2ebf2",
          "200": "#80deea",
          "300": "#4dd0e1",
          "400": "#26c6da",
          "500": "#00bcd4",
          "600": "#00acc1",
          "700": "#0097a7",
          "800": "#00838f",
          "900": "#006064",
        },

        danger: {
          "50": "#ffebee",
          "100": "#ffcdd2",
          "200": "#ef9a9a",
          "300": "#e57373",
          "400": "#ef5350",
          "500": "#f44336",
          "600": "#e53935",
          "700": "#d32f2f",
          "800": "#c62828",
          "900": "#b71c1c",
        },
        success: {
          "50": "#e8f5e9",
          "100": "#c8e6c9",
          "200": "#a5d6a7",
          "300": "#81c784",
          "400": "#66bb6a",
          "500": "#4caf50",
          "600": "#43a047",
          "700": "#388e3c",
          "800": "#2e7d32",
          "900": "#1b5e20",
        },
        warning: {
          "50": "#fff3e0",
          "100": "#ffe0b2",
          "200": "#ffcc80",
          "300": "#ffb74d",
          "400": "#ffa726",
          "500": "#ff9800",
          "600": "#fb8c00",
          "700": "#f57c00",
          "800": "#ef6c00",
          "900": "#e65100",
        },
      },
    },
    dark: {
      palette: {},
    },
  },
});

export default theme;
