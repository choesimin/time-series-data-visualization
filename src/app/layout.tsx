"use client";

import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PaymentIcon from "@mui/icons-material/Payment";
import PaidIcon from "@mui/icons-material/Paid";
import SendIcon from "@mui/icons-material/Send";
import StoreIcon from "@mui/icons-material/Store";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import Copyright from "@/components/Copyright";
import MenuItem from "@/components/MenuItem";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function RootLayout(props: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("light");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  const list = [
    [
      {
        name: "Home",
        icon: HomeIcon,
        path: "/",
      },
    ],
    [
      {
        name: "Merchant",
        icon: StoreIcon,
        path: "/merchant",
      },
      {
        name: "Bill",
        icon: SendIcon,
        path: "/bill",
      },
      {
        name: "Payment",
        icon: PaymentIcon,
        path: "/payment",
      },
      {
        name: "Point",
        icon: PaidIcon,
        path: "/point",
      },
    ],
  ];

  const DrawerList = (
    <Box onClick={toggleDrawer(false)} role="presentation">
      {list.map((subList, listIndex) => (
        <React.Fragment key={listIndex}>
          <List>
            {subList.map((item, itemIndex) => (
              <MenuItem key={itemIndex} path={item.path} icon={item.icon} />
            ))}
          </List>
          <Divider />
        </React.Fragment>
      ))}
      <List>
        <MenuItem
          key="toggle-theme"
          icon={themeMode === "light" ? DarkModeIcon : LightModeIcon}
          onClick={toggleThemeMode}
        />
      </List>
    </Box>
  );

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <IconButton
              aria-label="menu"
              size="large"
              onClick={toggleDrawer(true)}
              sx={{ position: "fixed", top: 0, left: 0, m: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <Container
              maxWidth="xl"
              sx={{
                my: 4,
              }}
            >
              {props.children}
            </Container>
            <Copyright />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
