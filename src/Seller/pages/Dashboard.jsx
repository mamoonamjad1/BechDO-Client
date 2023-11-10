import * as React from 'react';
import { useEffect,useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import jwtDecode from 'jwt-decode';
import { Box, Card, CardActions, CardContent, CardMedia, Button, IconButton, Dialog, Slide,DialogTitle, DialogContent, DialogContentText, DialogActions,TextField,InputAdornment,MenuItem, Tooltip } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DashBoard() {
  const token = localStorage.getItem("sellerToken");
  const decode = jwtDecode(token);
  const [ productId,setProductId] = useState(null)
  const [data, setData] = React.useState([]);
  const productsPerPage = 6;
  const totalPages = Math.ceil(data.length / productsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [amount, setAmount] = useState(0);
  const [disabledItems, setDisabledItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [name, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

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
 
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  const handleAuctionDelete = (productId, index) => {
      axios.delete(`http://localhost:4000/product/delete/${productId}`)
      .then((res)=>{
        toast.success("Product Deleted");
      })
      .catch(()=>{
        toast.error("Error Deleting Product");
      });
    
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
            console.log("Earning: ", res.data);
            setAmount(res.data)
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdData();
  }, []);


  const handleAuctionEdit = (productId) => {
  setOpen(true);
  setProductId(productId)
};
useEffect(() => {
  axios
    .get("http://localhost:4000/categories/get")
    .then((res) => {
      setCategories(res.data);
      setCategoryName(res.data.map((category) => category.name));
    })
    .catch(() => {
      console.log("Error Fetching");
    });
}, []);
const handleCategoryChange = (event) => {
  const selectedCategory = categories.find(
    (category) => category.name === event.target.value
  );
  setCategory(event.target.value);
  setCategoryId(selectedCategory ? selectedCategory._id : "");
};

const handleEdit = () => {

  console.log("handleEdit called");

  console.log("name:", name);
  console.log("productDescription:", productDescription);
  console.log("basePrice:", basePrice);
  console.log("quantity:", quantity);
  console.log("duration:", duration);
  console.log("categoryId:", categoryId);
  const formData = new FormData();
  console.log("Update Form",formData)
  formData.append("name", name);
  formData.append("description", productDescription);
  formData.append("basePrice", basePrice);
  formData.append("quantity", quantity);
  formData.append("duration", duration);
  formData.append("category", categoryId); // Append the category ID

  axios
    .put(`http://localhost:4000/product/update-single/${productId}`,{
      name,description:productDescription,basePrice,quantity,duration
    })
    .then((response) => {
      console.log(response.data);
      setProductName("");
      setProductDescription("");
      setBasePrice("");
      setQuantity("");
      setDuration("");
      setCategory("");
      
      toast.success("Product Updated Successfully");
      handleClose();
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
};

const handlePayment = () => {
  axios.post(`http://localhost:4000/payment/seller-payment/${decode._id}`,{amount:amount.totalEarnings})
  .then((res)=>{
    console.log("Balance:",res)
      if(res.data === "Success"){
        axios.post(`http://localhost:4000/order/update-checkout/${decode._id}`)
        .then((res)=>{
          toast.success("Payment Successful")
          window.location.reload()
        })
      }else{
        window.open(res.data)
      }
  }).catch((err)=>{
    console.log(err)
  })
}


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
            <Tooltip title="You will be charged 5% of the amount" arrow>
            <Button fullWidth variant='contained' sx={{backgroundColor:'#0C134F', '&:hover':{backgroundColor:'lightblue' , color:'black'}}}
            onClick={handlePayment}
            disabled={amount.totalEarnings === 0}>
                Cash Out
            </Button>
            </Tooltip>
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
                  <Box display='flex' justifyContent='flex-start' width="100%">
                    <Button
                      variant='contained'
                      onClick={() => handleAuctionStart(item._id, index)}
                      disabled={disabledItems.includes(index)}
                      startIcon={<PlayArrowIcon />}
                    >
                      Auction
                    </Button>
                  </Box>
                  <Box display='flex' justifyContent='flex-end' >
                    <IconButton onClick={() => handleAuctionDelete(item._id, index)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton  onClick={() => handleAuctionEdit(item._id, index)}>
                      <ModeEditIcon />
                    </IconButton>
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



{/* EDIT FORM */}
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      
        <DialogTitle >
          Edit The Product Info
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Product Name"
                placeholder="Add Product Name"
                fullWidth
                value={name}
                onChange={(e) => setProductName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                placeholder="Add Product Description"
                fullWidth
                multiline
                rows={4}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Base Price"
                fullWidth
                placeholder="Auction will start from this price point."
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonetizationOnIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                fullWidth
                placeholder="Auction will last this amount of time"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ProductionQuantityLimitsIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                fullWidth
                placeholder="Duration in seconds (Max 1 hour)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeFilledIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select Category"
                fullWidth
                select
                value={category}
                onChange={handleCategoryChange}
                placeholder="Select Category"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              >
                {categoryName.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Close
          </Button>
          <Button variant='contained' onClick={handleEdit}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
