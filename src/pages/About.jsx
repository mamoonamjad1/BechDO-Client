import React from 'react';
import { Container, Typography, Grid, Paper, Avatar } from '@mui/material';

const teamMembers = [
  {
    name: 'Dr. Abid Sohail Bhutta',
    email: 'abidbhutta@cuilahore.edu.pk',
    image: '../../images/A-1.jpg', // Provide the actual image path
  },
  {
    name: 'Mamoon',
    email: 'mamoon.amjad17@gmail.com',
    image: '../../images/M-1.jpg', // Provide the actual image path
  },
  {
    name: 'Esha Ilyas',
    email: 'eshailyas2001@gmail.com',
    image: '../../images/E-1.jpg', // Provide the actual image path
  },
];



const AboutPage = () => {
    
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: '2rem', backgroundColor: '#0C134F', borderRadius: '8px'  }}>
        <Typography variant="h5" sx={{ color: 'orange', lineHeight: 1.7, textAlign:'center',animation: 'bounce 1s infinite',
       "@keyframes bounce" :{
        "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-3px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
      }
       }}>
          Welcome to BechDO Auction Website. 
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.7 }}>
        We pride ourselves on being a premier platform that brings together buyers and sellers in a dynamic and engaging auction environment.
         Whether you're a seasoned collector or a first-time bidder, BechDO offers a curated selection of unique items for your consideration.
            </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
          Our mission is to provide a secure and enjoyable auction experience for everyone. With
          our user-friendly interface, you can easily browse through a wide range of items up for
          auction and place bids on your favorites.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
          Sellers can take advantage of our platform to showcase their items to a broad audience,
          attract competitive bids, and get the best value for their products.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'red', textAlign:'center' }}>
          Feel free to explore our website, discover amazing items, and start bidding today!
        </Typography>
      </Paper>
      <Grid container spacing={4} sx={{ mt: 4, mb:2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '2rem', height: '100%', backgroundColor: '#FFA500', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#0C134F', fontWeight: 700 }}>
              Our Team
            </Typography>
            {teamMembers.map((member, index) => (
              <Grid container spacing={2} key={index} alignItems="center" sx={{mt:1}}>
                <Grid item>
                  <Avatar alt={member.name} src={member.image} sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.5 }}>
                    Email: {member.email}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{mb:2}}>
          <Paper elevation={3} sx={{ padding: '2rem', height: '100%', backgroundColor: '#FFA500', borderRadius: '8px', mt:1 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#0C134F', fontWeight: 700 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.7 }}>
              If you have any inquiries or require assistance, our dedicated customer support team is available to assist you. Feel free to reach out to us via the following channels:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'black', lineHeight: 1.7 }}>
              Email: support@bechdo.com
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.7 }}>Phone: +1 (123) 456-7890</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
