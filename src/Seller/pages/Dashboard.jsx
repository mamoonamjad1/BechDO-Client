import * as React from 'react';
import { useEffect,useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import jwtDecode from 'jwt-decode';
import { Box, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function DashBoard() {
  const token = localStorage.getItem("sellerToken");
  const decode = jwtDecode(token);
  const [data, setData] = React.useState([]);
  const productsPerPage = 6;
  const totalPages = Math.ceil(data.length / productsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [amount, setAmount] = useState(0);
  const [disabledItems, setDisabledItems] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:4000/product/get/${decode._id}`)
      .then((res) => {
        console.log("Dashy RES:", res);
        setData(res.data);
        console.log("RESSS", data);
      })
      .catch(() => {
        toast.error("Couldn't Fetch Products");
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = data.slice(startIndex, endIndex);

  const handleAuctionStart = (productId, index) => {
    if (!disabledItems.includes(index)) {
      axios.post(`http://localhost:4000/auction/start/${productId}`)
      .then((res)=>{
        toast.success("Auction Started");
        setDisabledItems([...disabledItems, index]);
      })
      .catch(()=>{
        toast.error("Error Starting Auction");
      });
    }
  };
  useEffect(() => {
    // Fetch ad data for the logged-in user
    const fetchAdData = async () => {
      try {
        const token = localStorage.getItem("sellerToken");
        const decode = jwtDecode(token);
        console.log("ID", decode._id);
        axios
          .get(`http://localhost:4000/product/total/earning/${decode._id}`)
          .then((res) => {
            console.log("Dash Response", res.data);
            setAmount(res.data)
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdData();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={8}>
          <Paper
            sx={{
              p:1,
              margin:'auto',
              mt: 5,
              margin:'auto',
              maxWidth: 800,
              flexGrow: 1,
              backgroundColor: 'grey',
              color: 'black',
              boxShadow: '10px 10px 10px rgba(0.5, 0.5, 0, 0.5)',
            }}
          >
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6} md={4} sx={{ paddingRight: { xs: 0, sm: 2 } }}>
                <ButtonBase sx={{ width: 250, height: 180 }}>
                  <Img alt="complex" src={decode.image} sx={{ borderRadius: '50%' }} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Grid container direction="column" spacing={1} sx={{ mt: { xs: 2, sm: 0 }, marginLeft: { xs: 0, sm: 2 } }}>
                  <Grid item xs>
                    <Typography variant="h6">
                      Name: {decode.firstName} {decode.lastName}
                    </Typography>
                    <Typography variant="subtitle1">
                      Email: {decode.email}
                    </Typography>
                    <Typography variant="subtitle1">
                      Address: {decode.address}
                    </Typography>
                    <Typography variant="subtitle1">
                      Phone: {decode.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
             margin: 'auto',
              mt: 5,
              mr:5,
              flexGrow: 1,
              backgroundColor: 'orange',
              color: 'white',
              boxShadow: '10px 10px 10px rgba(0.5, 0.5, 0, 0.5)',
            }}
          >
            <Typography variant="h6"  >
              Total Earning
            </Typography>
            <Typography variant="h4">
              ${amount.totalEarnings} {/* Display the total currentPrice */}
            </Typography>
            <Button fullWidth variant='contained' sx={{backgroundColor:'#0C134F', '&:hover':{backgroundColor:'lightblue' , color:'black'}}}>
                Cash Out
            </Button>
            {/* Add any additional information here */}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ m: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', backgroundColor: '#0C134F', color: 'white' }}>
          <Typography variant='h5'>
            Products Up For Auction
            <br />
          </Typography>
          <Typography variant='body-1'>
            (Press The Auction Button To Start The Auction)
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {productsToDisplay.map((item, index) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345, mt: 2 }}>
                <CardMedia
                  component="img"
                  alt={`product image ${item.name}`}
                  height="140"
                  image={`http://localhost:4000/pictures/${item.images[0]}`} // Construct the image URL
                />
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h6'>
                      {item.name}
                    </Typography>
                    <Typography variant='body-1'>
                      {item.description}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box display='flex' justifyContent='center' width="100%">
                    <Button
                      variant='contained'
                      onClick={() => handleAuctionStart(item._id, index)}
                      disabled={disabledItems.includes(index)}
                    >
                      Start Auction
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? 'contained' : 'outlined'}
              onClick={() => handlePageChange(index + 1)}
              sx={{ mx: 1 }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
}
