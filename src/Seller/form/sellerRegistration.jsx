import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { toast } from "react-toastify";

function SellerRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const address = data.get("address");
    const phoneNumber = data.get("phoneNumber"); // Make sure the name attribute matches the field name
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (password === confirmPassword) {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("address", address);
        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        if (uploadedFile) {
          formData.append("image", uploadedFile);
        }

        const response = await axios.post(
          "http://localhost:4000/seller/register",
          formData
        );

        console.log("Successful");
        setIsLoading(false);
        toast.success("Welcome Onboard");
        // navigate("/seller/sign-in");
      } catch (error) {
        console.log("Unsuccessful");
        setIsLoading(false);
      }
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Seller Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  {isLoading ? (
                    <CircularProgress color="secondary" size={24} />
                  ) : (
                    <>
                      <input
                        accept="image/*"
                        id="image-uploader"
                        type="file"
                        style={{ display: "none" }}
                        name="image"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="image-uploader">
                        <Button
                          variant="outlined"
                          fullWidth
                          color="warning"
                          component="span"
                        >
                          Upload Image
                        </Button>
                      </label>
                      {uploadedFile && (
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                          Uploaded Image: {uploadedFile.name}
                          <DoneAllIcon
                            sx={{
                              verticalAlign: "middle",
                              color: "green",
                              fontSize: "16px",
                              marginLeft: "4px",
                            }}
                          />
                        </Typography>
                      )}
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register as Seller
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/seller/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SellerRegister;
