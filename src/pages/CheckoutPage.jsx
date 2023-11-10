import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import "../assets/style.css";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  createMuiTheme,
  ThemeProvider,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Import your action creators here
import {
  setFirstName,
  setLastName,
  setAddress,
  setPhone,
  setEmail,
  setCity,
  setPostal,
} from "../redux/actions/orderDetail";

const stripePromise = loadStripe('pk_test_51NsLBADMF5rirMzQKNxD8ba9MwIbTqLWiWSeeV3oXx9AqPfDYW0pks3drI8Rj4ASoraNd67H7AKcEJEmYcgo74Px00qYmADtbE');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFA500", // Orange color
    },
  },
});

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const user = useSelector((state) => state.authReducer);
  const [payOnline, setPayOnline] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });

  const dispatch = useDispatch(); // Initialize the dispatch function

  useEffect(() => {
    axios
      .get(`http://localhost:4000/order/get/${user.userId}`)
      .then((res) => {
        console.log("CART:", res);
        setCartItems(res.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Dispatch the corresponding action to update Redux
    switch (name) {
      case "firstName":
        dispatch(setFirstName(value));
        break;
      case "lastName":
        dispatch(setLastName(value));
        break;
      case "address":
        dispatch(setAddress(value));
        break;
      case "phone":
        dispatch(setPhone(value));
        break;
      case "email":
        dispatch(setEmail(value));
        break;
      case "city":
        dispatch(setCity(value));
        break;
      case "postalCode":
        dispatch(setPostal(value));
        break;
      default:
        break;
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayOnlineChange = (e) => {
    setPayOnline(e.target.checked);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here, e.g., sending order details to the server
    console.log("Order details:", formData);

    if (payOnline) {
      console.log("Card details:", cardDetails);
    }
  };

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => {
    const currentPrice = item.products.currentPrice.$numberDecimal.toString();
    return total + parseFloat(currentPrice); // Parse and add the value
  }, 0);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Grid container spacing={4}>
          {/* Checkout Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} style={{ padding: "2rem" }}>
              <Typography variant="h5" gutterBottom>
                Checkout
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="postalCode"
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              style={{ padding: "2rem", backgroundColor: "#FFEECC", color: "black" }}
            >
              <Typography variant="h5" gutterBottom sx={{ textAlign: "center", borderBottom: "1px solid black" }}>
                Order Summary
              </Typography>
              <Grid container spacing={1}>
                {cartItems.map((product) => (
                  <Grid item xs={12} key={product.id}>
                    <Typography>
                      <ArrowRightIcon
                        fontSize="small"
                        sx={{ verticalAlign: "middle", marginRight: "0.5rem" }}
                      />
                      {product.products.name} - ${product.products.currentPrice.$numberDecimal.toString()}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="h6"
                style={{ marginTop: "1rem", color: "red", textAlign: "center", borderTop: "1px solid black" }}
              >
                Total: ${totalAmount.toFixed(2)}
              </Typography>
            </Paper>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutPage;
