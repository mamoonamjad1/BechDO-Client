import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  styled,
  Dialog,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import jwtDecode from 'jwt-decode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { toast } from 'react-toastify';
import axios from 'axios';

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

const PAGE_SIZE = 12;

const Delivery = () => {
  const token = localStorage.getItem('sellerToken');
  const decode = jwtDecode(token);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    console.log("SELLER", decode._id);
    axios
      .get(`http://localhost:4000/order/delivery/${decode._id}`)
      .then((res) => {
        console.log('ORDERS', res);
        setDeliveries(res.data);
      });
  }, [decode._id]);

  const handleClick = (event, delivery) => {
    setAnchorEl(event.currentTarget);
    setSelectedDelivery(delivery);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    if (selectedDelivery) {
      axios
        .post(`http://localhost:4000/order/update-status/${selectedDelivery._id}`, {
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
    }
  };

  const renderCards = () => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return deliveries.slice(startIndex, endIndex).map((delivery) => (
      <Grid item key={delivery._id} xs={12} md={6}>
        <StyledCard>
          <StyledCardContent>
            <Typography variant="h6" sx={{ backgroundColor: 'black', color: 'white' }}>
              Order ID: {delivery._id.substring(18,22)}
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
                  backgroundColor:
                    delivery.deliveryStatus === 'InTransit'
                      ? 'orange'
                      : delivery.deliveryStatus === 'Delivered'
                      ? 'green'
                      : delivery.deliveryStatus === 'Recieved'
                      ? 'red'
                      : 'inherit',
                }}
              >
                {delivery.deliveryStatus} <KeyboardArrowDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleStatusChange('InTransit')} sx={{ color: 'orange' }}>
                  In Transit
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('Delivered')} sx={{ color: 'green' }}>
                  Delivered
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('Recieved')} sx={{ color: 'red' }}>
                  Received
                </MenuItem>
              </Menu>
            </Typography>
            <Typography>
              Products: {delivery.products.name}
              <br />
              Quantity: {delivery.products.quantity}
              <br />
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    ));
  };

  const pageCount = Math.ceil(deliveries.length / PAGE_SIZE);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 3 }}>
        Seller Deliveries
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center', color: 'red' }}>
        Deliveries To Make <ArrowRightAltIcon />
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
    </Container>
  );
};

export default Delivery;
