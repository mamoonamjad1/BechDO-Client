import React from "react";
import { styled, alpha , useTheme} from "@mui/material/styles";
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
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Button, Badge } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NotificationDrawer from "../Home/Notifications";
const SecondBar = () => {
    const navigate = useNavigate();
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "orange" }}>
        <Toolbar sx={{ justifyContent: "center", pr: 5, color: "black" }}>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/categories");
            }}
          >
            Categories
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            sx={{
              backgroundColor: "#D71313",
              animation: "jump 0.5s ease-in-out infinite",
              transition: "opacity 0.3s ease-in-out", // Add transition effect for opacity
              "&:hover": {
                opacity: 0.8,
                backgroundColor: "red",
              },
              "@keyframes jump": {
                "0%": {
                  transform: "translateY(0)",
                },
                "50%": {
                  transform: "translateY(-3px)",
                },
                "100%": {
                  transform: "translateY(0)",
                },
              },
            }}
            startIcon={<FiberManualRecordIcon />}
            onClick={()=>{navigate('/live-products')}}
          >
            Live
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SecondBar;
