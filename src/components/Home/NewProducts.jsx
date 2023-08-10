import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const NewProducts = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '10px',
  };

  const iconStyle = {
    marginLeft: '8px',
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div>
        <Link href="#" style={{ textDecoration: 'none', color: 'inherit', paddingTop: '2px' }}>
          <Box style={containerStyle}>
            <Typography variant='h5'>
              Latest Products
            </Typography>
            <ArrowRightAltIcon style={iconStyle} />
          </Box>
        </Link>

        <Box
          display='flex'
          flexDirection={{ xs: 'column', md: 'row' }} // Set flex direction to column for xs screen and row for md screen
          alignItems={{ xs: 'center', md: 'flex-start' }} // Align items in the center for xs screen and flex-start for md screen
          justifyContent='space-around'
          sx={{ p: 4 }}
        >
          <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                style={{
                  width: '150px', // Adjust the width as needed
                  height: '150px', // Adjust the height as needed
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
                  src="../../images/phone.png"
                  alt="phone"
                  style={{
                    maxWidth: '60%', // Adjust the max width as needed
                    maxHeight: '60%', // Adjust the max height as needed
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
                  Telephone
                </Typography>
              </Box>
            </Box>
          </Link>

          <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                style={{
                  width: '150px', // Adjust the width as needed
                  height: '150px', // Adjust the height as needed
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
                  src="../../images/shirt.png"
                  alt="fashion"
                  style={{
                    maxWidth: '70%', // Adjust the max width as needed
                    maxHeight: '70%', // Adjust the max height as needed
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
                  Men T-Shirt
                </Typography>
              </Box>
            </Box>
          </Link>

          <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                style={{
                  width: '150px', // Adjust the width as needed
                  height: '150px', // Adjust the height as needed
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
                  src="../../images/spoon.png"
                  alt="utensils"
                  style={{
                    maxWidth: '70%', // Adjust the max width as needed
                    maxHeight: '70%', // Adjust the max height as needed
                  }}
                />
                <Typography
                  variant='h6'
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
                  Kitchen Spoon Set
                </Typography>
              </Box>
            </Box>
          </Link>

          <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                style={{
                  width: '150px', // Adjust the width as needed
                  height: '150px', // Adjust the height as needed
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
                  src="../../images/masala.png"
                  alt="spices"
                  style={{
                    maxWidth: '70%', // Adjust the max width as needed
                    maxHeight: '70%', // Adjust the max height as needed
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
                  Organic Masala
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>
      </div>
    </>
  );
};

export default NewProducts;
