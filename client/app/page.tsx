"use client";

import { Typography, Box, Container, Button, Skeleton } from "@mui/material";
import Image from "next/image";
import SignIn from "./components/shared/SignIn";

export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#F6F6F6",
        width: "100%",
        maxWidth: "100%",
        paddingTop: "2rem",
      }}
    >
      <SignIn />
    </Box>
  );
}
