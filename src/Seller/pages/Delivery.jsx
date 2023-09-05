import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  marginBottom: theme.spacing(2),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const StyledActions = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  alignSelf: 'flex-end',
}));

const Delivery = () => {
  const token = localStorage.getItem("sellerToken");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedDelivery, setSelectedDelivery] = React.useState(null);
  const decode = jwtDecode(token);
  const [deliveries, setDeliveries] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/order/delivery/${decode._id}`)
      .then((res) => {
        console.log("ORDERS", res);
        setDeliveries(res.data);
      });
  }, []);

  const handleClick = (event, delivery) => {
    setAnchorEl(event.currentTarget);
    setSelectedDelivery(delivery);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (delivery,status) => {
    console.log(status)
    axios.post(`http://localhost:4000/order/update-status/${delivery._id}`,{status})
    .then((res)=>{
      toast.success("Mail Sent to Buyer regarding Delivery")
    }).catch((err)=>{
      console.log(err)
    })
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 3 }}>
        Seller Deliveries
      </Typography>
      {deliveries.map((delivery) => (
        <StyledCard key={delivery.orderId}>
          <StyledCardContent>
            <Typography variant="h6" sx={{ backgroundColor: 'black', color: 'white' }}>
              Order ID: {delivery._id}
            </Typography>
            <Typography>
              Customer Name: {delivery.firstName} {delivery.lastName}
            </Typography>
            <Typography>
              Customer Phone: {delivery.phone}
            </Typography>
            <Typography>
              Delivery Address: {delivery.address},<br />{delivery.city}
            </Typography>
            <Typography>
              Delivery Status: {' '}
              <Button variant='contained' onClick={(e) => handleClick(e, delivery)}>
                {delivery.deliveryStatus} <KeyboardArrowDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleStatusChange(delivery,'InTransit')}>In Transit</MenuItem>
                <MenuItem onClick={() => handleStatusChange(delivery,'Delivered')}>Delivered</MenuItem>
                <MenuItem onClick={() => handleStatusChange(delivery,'Recieved')}>Received</MenuItem>
              </Menu>
            </Typography>
            <Typography>
              Products:
            </Typography>
            <li >
              {delivery.products.name} (Quantity: {delivery.products.quantity}, Price: {delivery.products.currentPrice.$numberDecimal.toString()})
            </li>
            <StyledActions>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                //onClick={() => handleGenerateInvoice(delivery)}
              >
                Generate Invoice
              </Button>
              {/* Add other buttons or actions as needed */}
            </StyledActions>
          </StyledCardContent>
        </StyledCard>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Order Invoice</DialogTitle>
        <DialogContent>
          {selectedDelivery && (
            <div>
              <Typography variant="h6">
                Order ID: {selectedDelivery.orderId}
              </Typography>
              {/* Add other invoice details here */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          {/* Add other invoice actions here */}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Delivery;
