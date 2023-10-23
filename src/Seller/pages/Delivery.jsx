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
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import jwtDecode from 'jwt-decode';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
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

// const StyledActions = styled('div')(({ theme }) => ({
//   marginTop: theme.spacing(2),
//   alignSelf: 'flex-end',
// }));

const PAGE_SIZE = 12; // Number of cards per page

const Delivery = () => {
  const token = localStorage.getItem('sellerToken');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedDelivery, setSelectedDelivery] = React.useState(null);
  const decode = jwtDecode(token);
  const [deliveries, setDeliveries] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/order/delivery/${decode._id}`)
      .then((res) => {
        console.log('ORDERS', res);
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

  const handleStatusChange = (delivery, status) => {
    console.log(status);
    axios
      .post(`http://localhost:4000/order/update-status/${delivery._id}`, {
        status,
      })
      .then((res) => {
        toast.success('Mail Sent to Buyer regarding Delivery');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  
  const renderCards = () => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return deliveries.slice(startIndex, endIndex).map((delivery) => (
      <Grid item key={delivery.orderId} xs={12} md={6}>
        <StyledCard>
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
              <Button
                variant="contained"
                onClick={(e) => handleClick(e, delivery)}
                sx={{
                  backgroundColor: getStatusColor(delivery.deliveryStatus),
                }}
              >
                {delivery.deliveryStatus} <KeyboardArrowDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleStatusChange(delivery, 'InTransit')} sx={{color:'orange'}}>
                  In Transit
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange(delivery, 'Delivered')} sx={{color:'green'}}>
                  Delivered
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange(delivery, 'Recieved')} sx={{color:'red'}}>
                  Received
                </MenuItem>
              </Menu>
            </Typography>
            <Typography>
              Products:
            </Typography>
            <li >
              {delivery.products.name} (Quantity: {delivery.products.quantity}, Price: {delivery.products.currentPrice.$numberDecimal.toString()})
            </li>
            
          </StyledCardContent>
        </StyledCard>
      </Grid>
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'InTransit':
        return 'orange';
      case 'Delivered':
        return 'green';
      case 'Recieved':
        return 'red';
      default:
        return 'inherit';
    }
  };

  const pageCount = Math.ceil(deliveries.length / PAGE_SIZE);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 3 }}>
        Seller Deliveries
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center', color:'red' }}>
  Deliveries To Make <ArrowRightAltIcon />
  {/* <Button variant='contained' onClick={() => { setOpenDialog(true) }}>
    Download Excel for Deliveries
  </Button> */}
</Typography>

      <Grid container spacing={2}>
        {renderCards()}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i}
            variant="outlined"
            color="primary"
            onClick={() => setPage(i + 1)}
            sx={{
              margin: '0 5px',
              backgroundColor: i + 1 === page ? 'primary.main' : 'inherit',
              color: i + 1 === page ? 'white' : 'inherit',
            }}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Generate Statement</DialogTitle>
        <DialogContent>
        DO YOU WANT TO DOWNLOAD DELIVERIES IN EXCEL FILE?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="warning" variant='contained'>
            Close
          </Button>
          <Button color="success" variant='contained' onClick={downloadDeliveries}>
            Download
          </Button>
          {/* Add other invoice actions here */}
        {/* </DialogActions>
      </Dialog> */} 
    </Container>
  );
};

export default Delivery;
