import React, { useEffect, useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Button, Badge, Hidden } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NotificationDrawer from "../Home/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/actions/userAuth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import PaidIcon from "@mui/icons-material/Paid";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
import { CART, NOTIFICATIONS } from "../../redux/Constants";
import { toast } from "react-toastify";
import { SetOrderCount } from "../../redux/actions/order";
import { SetNotificationCount } from "../../redux/actions/notification"; // Update the path if needed

const socket = io("http://localhost:4000/win");

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openNotifications, setOpenNotifications] = React.useState(false);
  const decodedUser = useSelector((state) => state.authReducer);
  const dispatchRedux = useDispatch();
  const [showOrders, setShowOrders] = useState(false);
  const token = localStorage.getItem("buyerToken");

  const notificationCount = useSelector(
    (state) => state.notificationReducer.notificationCount
  );
  const orderCount = useSelector((state) => state.orderReducer.orderCount);
  console.log("NNNNNNN", notificationCount);
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleNotifications = (event) => {
    event.preventDefault();
    setOpenNotifications(true);
  };
  const handleNotificationsClose = (event) => {
    event.preventDefault();
    setOpenNotifications(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleSearchIconClick = () => {
    setOpen(true);
  };
  const handlePaidIconClick = () => {
    if (token) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    socket.emit("join", { userId: `${decodedUser.userId}` }, (error) => {
      if (error) console.log("ERROR: ", error);
      console.log("JOINED");
    });

    socket.on("message", (data) => {
      console.log("RECEIEVE MESSAGE", data);
      toast.success(`Congratulations on winning the bid for ${data.name} `);
      dispatchRedux(SetOrderCount(orderCount + 1));
    });
  }, [token]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      sx={{ borderRadius: "50%" }}
    >
      <MenuItem onClick={handleMenuClose}>
        {token ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            border="1px solid #ccc"
            borderRadius={8}
            boxShadow={1}
          >
            <Typography variant="h6" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" gutterBottom>
              Name: {decodedUser.firstName} {decodedUser.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {decodedUser.email}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "orange",
                color: "white",
                "&:hover": { backgroundColor: "#FFE17B" },
                marginTop: 2,
              }}
              onClick={() => {
                localStorage.removeItem("buyerToken");
                dispatchRedux(SetOrderCount(0));
                dispatchRedux(SetNotificationCount(0));
                dispatchRedux(
                  SetUser({
                    userId: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                  })
                );
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0C134F",
                color: "white",
                minWidth: "50vh", // Set a minimum width for the button
                width: "100%", // Occupy available width
                "&:hover": {
                  backgroundColor: "#071952",
                  color: "white",
                },
                [theme.breakpoints.up("md")]: {
                  width: "auto", // Reset to 'auto' width on larger screens
                },
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </Button>
            <Typography variant="subtitle2">
              <NavLink
                to={"/register"}
                style={{ textDecoration: "none", color: "orange" }}
              >
                Don't Have An Account? Register
              </NavLink>
            </Typography>
          </Box>
        )}
      </MenuItem>
      {!token && (
        <MenuItem
          onClick={() => {
            navigate("/seller/sign-in");
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "50vh",
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "#F4D160",
              },
            }}
          >
            SELLER LOGIN
          </Button>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NotificationDrawer
        open={openNotifications}
        handleNotificationsClose={handleNotificationsClose}
      />
      <AppBar position="sticky" sx={{ backgroundColor: "#0C134F" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <NavLink
              to={"/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6">BechDO</Typography>
            </NavLink>
          </div>
          <Hidden smDown>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Hidden>
          <Hidden mdUp>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
          </Hidden>
          <div>
            <IconButton
              edge="end"
              aria-haspopup="true"
              onClick={handleNotifications}
              color="inherit"
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={notificationCount} color="warning">
                <NotificationsActiveIcon
                  fontSize="md"
                  onClick={() => console.log("Clicked")}
                />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-haspopup="true"
              onClick={handlePaidIconClick}
              color="inherit"
              sx={{ mr: 0.5 }}
            >
              <Badge badgeContent={orderCount} color="error">
                <ShoppingCartIcon fontSize="md" />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <PersonIcon fontSize="large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default NavBar;
