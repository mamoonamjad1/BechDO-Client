import * as React from "react";
import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    // const fileInput = form.elements["image"].files[0];

    // if (fileInput) {
    //   const file = fileInput;
    //   const fileUrl = URL.createObjectURL(file);
    //   setSelectedImage(fileUrl);
      const data = new FormData(form);
      // data.append("image", file);

      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");

      if (password === confirmPassword) {
        const request = {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          password: password,
          confirmPassword: confirmPassword,
          // image: file,
        };

        axios
          .post("http://localhost:4000/users/register", request)
          .then(() => {
              toast.success("Successfully Registered", {
                position: toast.POSITION.TOP_CENTER,
              });
              setTimeout(() => {
                navigate("/login");
              }, 1500);
            }
          )
          .catch(() => {
            console.log("Unsuccessful");
          }).finally(()=>{
            setLoading(false)
          })
      } else {
        // Handle case when passwords don't match
        console.log("Passwords do not match");
      }
    // } else {
    //   // Handle case when no file is selected
    //   console.log("No file selected");
    // }
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
                {/* <div>
                  <input
                    accept="image/*"
                    id="image-uploader"
                    type="file"
                    style={{ display: "none" }}
                    name="image" // Add the name attribute
                  />
                  <label htmlFor="image-uploader"> */}
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      component="span"
                      onClick={()=>{
                        navigate('/seller/register')
                      }}
                    >
                      Sign UP AS SELLER
                    </Button>
                  {/* </label>
                </div> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign UP"}
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
        <ToastContainer/>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
