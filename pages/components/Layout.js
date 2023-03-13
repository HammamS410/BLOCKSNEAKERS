import { AppBar, Box, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import classes from "@/utils/classes";
import Link from "next/link";

export default function Layout({ title, children }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  return (
    <div>
      <Head>
        <title>{title ? `${title} - BLOCK!SHOES.CO` : "BLOCK!SHOES.CO"}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.navbar}>
          <Toolbar>
            <Link href="/">
              <Typography sx={classes.brand}>BLOCK!SNEAKERS.CO</Typography>
            </Link>
            <div className="grow"></div>
            <div>
              <Link href="/cart">Cart</Link>
              <Link href="/login">Login</Link>
            </div>
          </Toolbar>
        </AppBar>
        <Container sx={classes.main}>{children}</Container>
        <Box sx={classes.footer}>
          <Typography>BLOCK!SNEAKERS.CO @2023</Typography>
        </Box>
      </ThemeProvider>
    </div>
  );
}
