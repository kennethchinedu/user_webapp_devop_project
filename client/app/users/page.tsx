"use client";

import { Typography, Box, Container, Button, Skeleton } from "@mui/material";
import Image from "next/image";
import UserList from "../components/shared/UsersList";

export default function Users() {
  return (
    <Box
      sx={{
        backgroundColor: "#F6F6F6",
        width: "100%",
        maxWidth: "100%",
        paddingTop: "2rem",
      }}
    >
      <UserList />
    </Box>
  );
}
