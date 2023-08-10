import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import animation from "../../assets/seller-1.gif";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SellerBanner = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
        paddingBottom: "100px",
      }}
    >
      <Grid
        container
        sx={{
          backgroundColor: "orange",
          minHeight: "300px",
          width: "80%",
          borderRadius: "50px",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1px",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            BE A SELLER
            <br />
            AND ENJOY
          </Typography>
          <ul sx={{ listStyle: "none", paddingInlineStart: "0", marginTop: "10px" }}>
            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <CheckCircleIcon sx={{ marginRight: "5px" }} />
              <Typography sx={{ textDecoration: "none" }}>Safe Transactions</Typography>
            </li>
            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <CheckCircleIcon sx={{ marginRight: "5px" }} />
              <Typography sx={{ textDecoration: "none" }}>Scale Business</Typography>
            </li>
            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <CheckCircleIcon sx={{ marginRight: "5px" }} />
              <Typography sx={{ textDecoration: "none" }}>Efficient Deals</Typography>
            </li>
          </ul>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "150px",
              borderRadius: "50px",
              backgroundColor: "#0C134F",
              marginBottom: "20px",
            }}
            onClick={() => {
              navigate("/seller/register");
            }}
          >
            Sign Up
          </Button>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "4px",
              background:
                "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)",
            }}
          ></div>
        </Grid>

        <Grid item xs={12} md={6} sx={{ borderRadius: "0 50px 50px 0" }}>
          <img
            src={animation}
            alt="GIFY"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0 50px 50px 0",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellerBanner;
