import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  createMuiTheme,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFA500', // Orange color
    },
  },
});

const CheckoutPage = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [open, setOpen] = React.useState(false);
  const [payOnline, setPayOnline] = React.useState(false);
  const [cardDetails, setCardDetails] = React.useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  const [cashOnDelivery, setCashOnDelivery] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setCashOnDelivery(false);
  };

  const handleCashOnDeliveryChange = (e) => {
    setCashOnDelivery(e.target.checked);
    setPayOnline(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here, e.g., sending order details to the server
    console.log('Order details:', formData);

    if (payOnline) {
      console.log('Card details:', cardDetails);
    }

    if (cashOnDelivery) {
      console.log('Cash on Delivery selected');
    }
  };

  // Dummy product data
  const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    // Add more products here
  ];

  // Calculate the total amount
  const totalAmount = products.reduce((total, product) => total + product.price, 0);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: '2rem' , marginBottom:'2rem'}}>
        <Grid container spacing={4}>
          {/* Checkout Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
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
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Payment Options
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={payOnline}
                        onChange={handlePayOnlineChange}
                        color="primary"
                      />
                    }
                    label="Pay Online"
                  />
                  {payOnline && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          name="cardNumber"
                          label="Card Number"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.cardNumber}
                          onChange={handleCardDetailsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="cardHolderName"
                          label="Card Holder Name"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.cardHolderName}
                          onChange={handleCardDetailsChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="expiryDate"
                          label="Expiry Date"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.expiryDate}
                          onChange={handleCardDetailsChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="cvv"
                          label="CVV"
                          variant="outlined"
                          fullWidth
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cashOnDelivery}
                        onChange={handleCashOnDeliveryChange}
                        color="primary"
                      />
                    }
                    label="Cash on Delivery"
                  />
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary" // Use the primary color for orange
                  style={{ marginTop: '1rem' }}
                  onClick={handleDialogOpen}
                >
                  Checkout
                </Button>
              </Grid>
            </Paper>
          </Grid>
          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              style={{ padding: '2rem', backgroundColor: '#FFEECC', color: 'black' }}
            >
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', borderBottom:'1px solid black' }}>
                Order Summary
              </Typography>
              <Grid container spacing={1}>
                {products.map((product) => (
                  <Grid item xs={12} key={product.id}>
                    <Typography>
                      <ArrowRightIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
                      />
                      {product.name} - ${product.price.toFixed(2)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="h6"
                style={{ marginTop: '1rem', color: 'red', textAlign: 'center', borderTop:'1px solid black' }}
              >
                Total: ${totalAmount.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleDialogClose} sx={{textAlign:'center'}} >
        <DialogTitle sx={{backgroundColor:'#0C134F' , color:'white'}}>Confirm Your Order</DialogTitle>
        <DialogContent sx={{mt:2}}>
          <DialogContentText>Please Confirm Your Order</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" 
          sx={{ backgroundColor: '#0C134F', color: 'white', ml:4 }}
          onClick={handleCheckout}>
            Confirm
          </Button>
          <Button variant="contained" sx={{ backgroundColor: 'orange',mr:4 }} onClick={handleDialogClose}>
            Ignore
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CheckoutPage;
