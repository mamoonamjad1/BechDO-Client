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
import { Badge, Hidden } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import NotificationDrawer from "../Home/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/actions/userAuth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
import { CART, NOTIFICATIONS } from "../../redux/Constants";
import { toast } from "react-toastify";
import { SetOrderCount } from "../../redux/actions/order";
import { SetNotificationCount } from "../../redux/actions/notification";
import axios from "axios";
import Button from "@mui/material/Button";

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
  left: 0, // Adjusted left position
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const decodedUser = useSelector((state) => state.authReducer);
  const dispatchRedux = useDispatch();
  const [showOrders, setShowOrders] = useState(false);
  const token = localStorage.getItem("buyerToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    axios
      .get("http://localhost:4000/product/search", {
        params: { searchQuery },
      })
      .then((res) => {
        setSearchResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const renderSearchResults = () => {
    if (loading) {
      return <MenuItem disabled>Loading...</MenuItem>;
    } else if (searchResults === null) {
      return null;
    } else if (searchResults.length === 0) {
      return <MenuItem disabled>No results found</MenuItem>;
    } else {
      return searchResults.map((result) => (
        <MenuItem
          key={result.id}
          onClick={handleSearchResultClick(result)}
          sx={{borderBottom:'1px solid black'}}
        >
          {result.name}
        </MenuItem>
      ));
    }
  };

  const handleSearchResultClick = (result) => () => {
    console.log("Clicked on result: ", result);
    navigate(`/product/${result._id}`);
    setSearchResults(null);
  };

  const notificationCount = useSelector(
    (state) => state.notificationReducer.notificationCount
  );
  const orderCount = useSelector((state) => state.orderReducer.orderCount);
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

  const handleSearchEventClose = () => {
    setOpenSearch(false);
  };

  const handleSearchIconClick = () => {
    setOpenSearch(true);
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
      console.log("RECEIVE MESSAGE", data);
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
              alignItems:"center",
            }}
            display='flex'
            flexDirection="column"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0C134F",
                color: "white",
                minWidth: "50vh",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#071952",
                  color: "white",
                },
                [theme.breakpoints.up("md")]: {
                  width: "auto",
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
                <SearchIcon onClick={handleSearchIconClick} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setAnchorElSearch(e.currentTarget);
                    setOpenSearch(true);
                  }
                }}
              />
              {openSearch && (
                <Menu
                  anchorEl={anchorElSearch}
                  open={openSearch}
                  onClose={handleSearchEventClose}
                  PaperProps={{
                    sx: {
                      width: {
                        xs: '100%', // Full width for extra-small screens
                        md: '48%',   // 50% width for medium screens
                        lg: '57.5%', // 57.5% width for large screens
                      },
                      mt: 0.5,
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {renderSearchResults()}
                </Menu>
              )}
            </Search>
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
                <NotificationsActiveIcon fontSize="md" />
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
