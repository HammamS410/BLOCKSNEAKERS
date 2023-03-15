import { AppBar, Box, Container, createTheme, CssBaseline, Switch, ThemeProvider, Toolbar, Typography, Badge } from "@mui/material";
import Head from "next/head";
import React, { useContext } from "react";
import classes from "@/utils/classes";
import Link from "next/link";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
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
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
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

            <div className={classes.grow}>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
              <Link href="/cart">
                {cart.cartItems.length > 0 ? (
                  <Badge color="secondary" badgeContent={cart.cartItems.length}>
                    Cart
                  </Badge>
                ) : (
                  "Cart"
                )}
              </Link>
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
