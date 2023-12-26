import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  createMuiTheme,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SetOrderCount } from '../redux/actions/order';
import { useNavigate } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFA500', // Orange color
    },
  },
});

const CartPage = () => {
  const [open, setOpen] = React.useState(false);
  const user= useSelector((state)=>state.authReducer)
  const [cartItems, setCartItems] = React.useState([]);
  const navigate = useNavigate()
const dispatchRedux = useDispatch()

useEffect(()=>{
axios.get(`http://localhost:4000/order/get/${user.userId}`)
.then((res)=>{
console.log("CART:",res)
setCartItems(res.data)
dispatchRedux(SetOrderCount(res.data.length))
})
},[])



  const handleDialogOpen = () => {
    //setOpen(true);
    // dispatchRedux(SetOrderCount(0))
    // dispatchRedux(SetOrderCount(0))
    navigate('/checkout')

  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => {
    const currentPrice = item.products.currentPrice.$numberDecimal.toString(); 
    return total + parseFloat(currentPrice); // Parse and add the value
  }, 0);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Grid container spacing={4}>
          {/* Cart Items (60% width) */}
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
              <Typography variant="h5" gutterBottom>
                Shopping Cart
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.products.name}</TableCell>
                        <TableCell align="center">{item.products.quantity}</TableCell>
                        <TableCell align="center">{item.products.currentPrice.$numberDecimal.toString()}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="secondary"
                            aria-label="Delete"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Cart Summary (20% width) */}
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={3}
              style={{
                padding: '2rem',
                backgroundColor: '#FFEECC',
                color: 'black',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                To Pay
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginTop: '2rem',
                  color: 'red',
                  textAlign: 'center',
                  borderTop: '1px solid black',
                }}
              >
                Total: ${totalAmount.toFixed(2)}
              </Typography>
            </Paper>
            <Button
              fullWidth
              variant="contained"
              color="primary" // Use the primary color for orange
              style={{ marginTop: '1rem' }}
              onClick={handleDialogOpen}
              disabled={cartItems.length === 0}
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleDialogClose} sx={{ textAlign: 'center' }}>
        <DialogTitle sx={{ backgroundColor: '#0C134F', color: 'white' }}>Confirm Your Order</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText>Please Confirm Your Order</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#0C134F', color: 'white', ml: 4 }}
            onClick={handleDialogClose}
          >
            Confirm
          </Button>
          <Button variant="contained" sx={{ backgroundColor: 'orange', mr: 4 }} onClick={handleDialogClose}>
            Ignore
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CartPage;
