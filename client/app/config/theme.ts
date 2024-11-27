"use client";
import { Montserrat, Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    poster: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    poster: {
      fontFamily: inter.style.fontFamily,
    },
  },
  palette: {
    primary: {
      main: "#397F98",
    },
    secondary: {
      main: "#FFA013",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          poster: "h2",
        },
      },
    },
  },
});

export default theme;
