import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function ListItemLink(props) {
  return (
    <li>
      <Link
        color="inherit"
        underline="none"
        sx={{ opacity: 0.6, marginLeft: "-16px", marginTop: "4px" }}
        {...props}
      />
    </li>
  );
}

function Footer() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
          backgroundColor: "#0C134F",
          color: "white"
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 6, mb: 4 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <FacebookIcon fontSize="large" />
            </Grid>
            <Grid item>
              <InstagramIcon fontSize="large" />
            </Grid>
            <Grid item>
              <TwitterIcon fontSize="large" />
            </Grid>
            <Grid item>
              <LinkedInIcon fontSize="large" />
            </Grid>
            <Grid item>
              <GitHubIcon fontSize="large" />
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="space-between"
            sx={{ marginRight: "20px", mt: 8 }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "14px",
                  fontWeight: "bold",
                }}
              >
                Services
              </Typography>
              <Box >
                <Typography gutterBottom>
                  <Link sx={{textDecoration:'none' , color:'white'}}>
                    Buy Amazing Products
                  </Link>
                </Typography>
                <Typography gutterBottom>
                <Link sx={{textDecoration:'none' , color:'white'}}>
                    Be A Merchant
                  </Link>
                </Typography>
                <Typography gutterBottom>
                <Link sx={{textDecoration:'none' , color:'white'}}>
                    Set UP Auction
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "12px",
                  fontWeight: "bold",
                }}
              >
                About
              </Typography>
              <Box >
                <Typography gutterBottom>
                  <Link sx={{textDecoration:'none' , color:'white'}}>
                    Company
                  </Link>
                </Typography>
                <Typography gutterBottom>
                <Link sx={{textDecoration:'none' , color:'white'}}>
                    Careers
                  </Link>
                </Typography>
                <Typography gutterBottom>
                <Link sx={{textDecoration:'none' , color:'white'}}>
                    Vision
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                sx={{ marginBottom: "12px", fontWeight: "bold" }}
              >
                BechDO
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                BechDO, an FYP project, is a cutting-edge MERN-based auction
                application that connects sellers and buyers in a seamless
                online marketplace. Our platform empowers sellers to
                effortlessly list their products with comprehensive details
                and appealing visuals, while buyers can explore a diverse range
                of offerings and make informed purchasing decisions. With a
                user-friendly interface, BechDO ensures a smooth and efficient
                auction experience. Sellers benefit from complete control over
                their listings, managing bids, and engaging with potential
                buyers. Buyers, on the other hand, enjoy a transparent bidding
                system, real-time notifications, and secure payment options.
                BechDO prioritizes security, privacy, and reliability to
                safeguard user data and transactions. By revolutionizing the
                online auction industry, BechDO offers a dynamic space for
                sellers and buyers to engage, discover exciting deals, and
                fulfill their auction needs.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            textAlign: "center",
            borderTop: "2px dashed white",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2" sx={{ color: "white" }}>
              {"© "}
              {new Date().getFullYear()}
              {" BECHDO. All rights reserved."}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
