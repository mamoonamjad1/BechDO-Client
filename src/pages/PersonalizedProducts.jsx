import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Button, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';

const PersonalizedProduct = () => {
  const [items, setItems] = useState([]);
  const [owner, setOwner] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`http://localhost:4000/product/get/store/${id}`)
      .then((response) => {
        console.log('RESSS', response.data);
        setItems(response.data);
        // Set owner details for the first item
        if (response.data.length > 0) {
          setOwner(response.data[0].owner || {});
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const totalPageCount = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={8}>
        <Paper
          sx={{
            p: 2,
            textAlign: 'center',
            backgroundColor: 'grey',
            color: 'black',
            boxShadow: '10px 10px 10px rgba(0.5, 0.5, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography variant="h4" sx={{ m:1 }}>
                Store Owner
            </Typography>
          <ButtonBase sx={{ width: 250, height: 180 }}>
            <img
              alt="owner"
              src={owner.image}
              style={{
                borderRadius: '50%',
                width: '100%',
                height: '100%',
              }}
            />
          </ButtonBase>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Name: {owner.firstName} {owner.lastName}
          </Typography>
          <Typography variant="subtitle1">Email: {owner.email}</Typography>
          <Typography variant="subtitle1">Address: {owner.address}</Typography>
          <Typography variant="subtitle1">Phone: {owner.phoneNumber}</Typography>
        </Paper>
      </Grid>
    </Grid>
    <Typography variant="h4" sx={{ m:2}}>
        Products <ArrowRightAlt /> 
        </Typography>
      <Grid container spacing={1} sx={{ mt: 2, mb: 2 }}>
        {visibleItems.map((item, index) => (
          <Grid item xs={6} sm={6} md={2} key={index} sx={{m:2}}>
            <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: '#EEEDED',
                  height: '100%', // Set fixed height
                  display: 'flex',
                  flexDirection: 'column',
                  
                }}
              >
                <CardHeader
                  title={item.name}
                  subheader={`${item.description}`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://localhost:4000/pictures/${item.images[0]}`}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {`Base Price: $${item.basePrice.$numberDecimal}`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {`Current Bid Of: $${item.currentPrice.$numberDecimal}`}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" align="center">
        Page {currentPage} of {totalPageCount}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          style={{ marginRight: '8px' }}
        >
          <SkipPreviousIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={currentPage === totalPageCount}
          onClick={handleNextPage}
        >
          <SkipNextIcon />
        </Button>
      </div>
    </>
  );
};

export default PersonalizedProduct;
