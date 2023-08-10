import React from 'react';
import { Button, Typography, useMediaQuery } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Banner = ({ item }) => {
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <div
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: isMobileScreen ? '200px' : '400px', // Adjust height for mobile and desktop
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto', // Center horizontally
      }}
    >
      <Button
        color="secondary"
        variant="contained"
        style={{ marginTop: isMobileScreen ? '80px' : '120px' }} // Adjust marginTop for mobile and desktop
        sx={{
          backgroundColor: 'orange',
          width: isMobileScreen ? '150px' : '200px', // Adjust button width for mobile and desktop
          '&:hover': {
            backgroundColor: '#FBD85D',
          },
        }}
      >
        Explore
        <ArrowRightAltIcon />
      </Button>
    </div>
  );
};

export default Banner;
