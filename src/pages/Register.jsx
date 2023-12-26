import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  
    const form = event.currentTarget;
    const data = new FormData(form);
  
    // Validate if all required fields are filled
    const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword"];
    const newFormErrors = {};
  
    requiredFields.forEach((field) => {
      const value = data.get(field);
      if (!value || value.trim() === "") {
        newFormErrors[field] = "This field is required.";
      }
    });
  
    // Display errors and prevent submission if any required field is empty
    if (Object.keys(newFormErrors).length > 0) {
      toast.error("Please fill out all the required fields.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setFormErrors(newFormErrors);
      setLoading(false);
      return;
    }
  
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
  
    if (password === confirmPassword) {
      const request = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: password,
        confirmPassword: confirmPassword,
      };
  
      axios
        .post("http://localhost:4000/users/register", request)
        .then(() => {
          toast.success("Successfully Registered. Please check your email for verification.", {
            position: toast.POSITION.TOP_CENTER,
          });
          // Redirect to the waiting page after successful registration
          navigate("/login");
        })
        .catch((err) => {
          console.log("Unsuccessful",err);
          toast.error(err.response.data)
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Handle case when passwords don't match
      console.log("Passwords do not match");
      toast.error("Passwords Do Not Match");
      setLoading(false);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
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
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
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
                  error={!!formErrors.email}
                  helperText={formErrors.email}
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
                  error={!!formErrors.password}
                  helperText={formErrors.password}
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
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default Register;
