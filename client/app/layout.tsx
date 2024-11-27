import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "./config/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import ClientProvider from "./components/shared/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "User dashboard",
  description: "The user dashboard",
};

export const viewport: Viewport = {
  themeColor: "#397F98",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box
        component="body"
        sx={{
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ClientProvider>{children}</ClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </Box>
    </html>
  );
}
