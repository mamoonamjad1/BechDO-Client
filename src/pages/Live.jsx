import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom or any other routing library you are using

const Live = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch data from the API
    axios.get("http://localhost:4000/product/get-live")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        {visibleItems.map((item, index) => (
          <Grid item xs={6} sm={6} md={2} key={index}>
            <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345, backgroundColor: '#EEEDED' }}>
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
                  <Typography variant="body2" sx={{color:'red'}}>
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
          <SkipPreviousIcon/>
        </Button>
        <Button
          variant="outlined"
          disabled={currentPage === totalPageCount}
          onClick={handleNextPage}
        >
          <SkipNextIcon/>
        </Button>
      </div>
    </>
  );
};

export default Live;
