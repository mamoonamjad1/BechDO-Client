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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function SellerRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    setFileError(null); // Reset file error when a new file is selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData.entries());

    // Check for empty fields
    const emptyFields = Object.entries(formFields).filter(
      ([name, value]) => typeof value === 'string' && value.trim() === ''
    );

    if (emptyFields.length > 0) {
      const errorFields = {};
      emptyFields.forEach(([name]) => {
        errorFields[name] = `Please enter ${name.charAt(0).toUpperCase() + name.slice(1)}`;
      });

      setFormErrors({
        ...errorFields,
        emptyFields: 'Please fill out all the fields.',
      });
      return;
    }

    // Clear previous form errors
    setFormErrors({});

    // Continue with form submission
    formData.set("phoneNumber", phoneNumber);

    if (!uploadedFile) {
      setFileError("Please upload a profile picture.");
      return;
    }

    formData.set("image", uploadedFile);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/seller/register", formData);
      console.log("Successful", response);
      setIsLoading(false);
      toast.success("Welcome Onboard");
      navigate("/seller/sign-in");
    } catch (error) {
      console.log("Unsuccessful", error);
      toast.error(`${error.response?.data || 'Unable to Register'}`, {
        position: toast.POSITION.TOP_CENTER,
      });

      if (error.response?.data === "User Already Registered") {
        navigate("/seller/sign-in");
        toast.error("Please Login", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      setIsLoading(false);
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
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName || 'Required'}
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
                  helperText={formErrors.lastName || 'Required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  error={!!formErrors.address}
                  helperText={formErrors.address || 'Required'}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  country="pk"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                  inputStyle={{
                    width: '100%',
                    height: '40px',
                  }}
                  buttonStyle={{
                    height: '40px',
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
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
                  helperText={formErrors.email || 'Required'}
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
                  helperText={formErrors.password || 'Required'}
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
                  helperText={formErrors.confirmPassword || 'Required'}
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  {isLoading ? (
                    <CircularProgress color="secondary" size={24} />
                  ) : (
                    <>
                      <input
                        required
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
                          color={fileError ? "error" : "warning"}
                          component="span"
                        >
                          Upload Image
                        </Button>
                      </label>
                      {fileError && (
                        <Typography
                          variant="body2"
                          sx={{ color: "red", marginTop: 1 }}
                        >
                          {fileError}
                        </Typography>
                      )}
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
