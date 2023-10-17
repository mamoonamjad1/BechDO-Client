import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Carousel from 'react-material-ui-carousel';

const NewProducts = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    marginTop: '16px',
    padding: '10px',
  };

  const iconStyle = {
    marginLeft: '8px',
  };

  const [isHovered, setIsHovered] = useState(false);
  const [product,setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get("http://localhost:4000/product/upcoming")
      .then((res) => {
        console.log("RES", res);
        setProduct(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(() => {
        toast.error("Couldn't Fetch Products");
        setLoading(false); // Set loading to false on error
      });
  }, []);

  const productChunks = [];
  for (let i = 0; i < product.length; i += 4) {
    productChunks.push(product.slice(i, i + 4));
  }

  return (
    <div sx={{ backgroundColor: 'grey' }}>
      <Box style={containerStyle}>
        <Typography variant='h5'>Upcoming Auctions</Typography>
        <ArrowRightAltIcon style={iconStyle} />
      </Box>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          autoPlay={true}
          timer={5000}
          indicators={false}
          animation='slide'
          navButtonsAlwaysVisible
        >
          {productChunks.map((chunk, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent='space-around'
              sx={{
                p: 4,
                flexDirection: { xs: 'column', md: 'row', lg: 'row', xl: 'row' },
                alignItems: { xs: 'center', md: 'center', lg: 'center', xl: 'center' },
                textAlign: 'center',
              }}
            >
              {chunk.map(product => (
                <Link
                  key={product._id}
                  //to={`/categories/${category._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Box>
                    <Box
                      style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: 'orange',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                          backgroundColor: 'darkorange',
                        },
                      }}
                    >
                      <img
                        src={`http://localhost:4000/pictures/${product.images[0]}`}
                        alt={product.name}
                        style={{
                          maxWidth: '60%',
                          maxHeight: '60%',
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center',
                          color: 'inherit',
                          opacity: 0,
                          transition: 'opacity 0.3s, font-size 0.3s',
                          fontSize: '16px',
                          '&:hover': {
                            opacity: 1,
                            color: 'white',
                            fontSize: '14px',
                          },
                        }}
                      >
                        Explore->
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        {product.name}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default NewProducts;
