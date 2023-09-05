import React, { useState } from "react";
import { styled, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const NavBar = () => {
  const navigate = useNavigate();
  const sellerToken = localStorage.getItem("sellerToken");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    navigate("/seller/sign-in");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileMenuItems = (
    <List sx={{ backgroundColor: 'orange', color: 'white', width: 240 }}>
      {sellerToken ? ( // If there's a sellerToken, render the Dashboard and My Products options
        <>
          <ListItem disableGutters>
            <Box display="flex" alignItems="center" justifyContent="center" p={2}>
              <img src={logo} alt="Logo" style={{ width: '100%' }} />
            </Box>
          </ListItem>
          <ListItem button component={NavLink} to="/seller/pages/dashboard" exact activeClassName="active" onClick={toggleMobileMenu}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={NavLink} to="/seller/pages/MyProducts" exact activeClassName="active" onClick={toggleMobileMenu}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="My Products" />
          </ListItem>
          <ListItem button component={NavLink} to="/seller/pages/dashboard" exact activeClassName="active" onClick={toggleMobileMenu}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Delivery" />
          </ListItem>

          <ListItem button onClick={() => handleLogout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : ( // If there's no sellerToken, render the Sign In option
      <>
      <ListItem disableGutters>
      <Box display="flex" alignItems="center" justifyContent="center" p={2}>
        <img src={logo} alt="Logo" style={{ width: '100%' }} />
      </Box>
    </ListItem>
        <ListItem button component={NavLink} to="/seller/sign-in" exact activeClassName="active" onClick={toggleMobileMenu}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
        </>
      )}
    </List>

  );

  const theme = createTheme(); // Create a default theme
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ backgroundColor: "#0C134F" }}>
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center" onClick={()=>{navigate('/')}}>
              <Typography variant="h6">
                BECHDO
                <Typography color="orange" component="span">
                  Seller
                </Typography>
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box display={{ xs: "none", sm: "flex" }} alignItems="center" flexGrow={1} justifyContent="center">
              {sellerToken && (
                <Box display="flex" alignItems="center">
                  <Button component={NavLink} to="/seller/pages/dashboard" exact activeClassName="active" color="inherit" startIcon={<DashboardIcon />} sx={{ mx: 2 }}>
                    Dashboard
                  </Button>
                  <Button component={NavLink} to="/seller/pages/MyProducts" exact activeClassName="active" color="inherit" startIcon={<StoreIcon />} sx={{ mx: 2 }}>
                    My Products
                  </Button>
                  <Button component={NavLink} to="/seller/pages/delivery" exact activeClassName="active" color="inherit" startIcon={<LocalShippingIcon/>} sx={{ mx: 2 }}>
                    Delivery
                  </Button>
                </Box>
              )}
            </Box>

            {/* Move the Logout button here and hide it on smaller screens */}
            {sellerToken && !isMobileScreen && (
              <Box display="flex" alignItems="center">
                <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            )}

            {/* Mobile Menu */}
            <Box display={{ xs: "flex", sm: "none" }}>
              <IconButton color="inherit" onClick={toggleMobileMenu}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
                {mobileMenuItems}
              </Drawer>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
