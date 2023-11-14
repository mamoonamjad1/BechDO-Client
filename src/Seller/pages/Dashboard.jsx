import * as React from "react";
import { useEffect, useState, useRef} from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import jwtDecode from "jwt-decode";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  MenuItem,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DashBoard() {
  const token = localStorage.getItem("sellerToken");
  const decode = jwtDecode(token);
  const [productId, setProductId] = useState(null);
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
  const [make, setMake] = useState("");
  const [variant, setVariant] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [firstName, setFirstName] = useState(decode.firstName);
  const [lastName, setLastName] = useState(decode.lastName);
  const [email, setEmail] = useState(decode.email);
  const [phoneNumber, setPhoneNumber] = useState(decode.phoneNumber);
  const [address, setAddress] = useState(decode.address);
  const [password, setPassword] = useState(decode.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();
  const [profileError, setProfileError] = useState(false);
  const [picture, setPicture] = useState(null);
  const fileInputRef = useRef(null);


  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/product/get/${decode._id}`)
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
      axios
        .post(`http://localhost:4000/auction/start/${productId}`)
        .then((res) => {
          toast.success("Auction Started");
          setDisabledItems([...disabledItems, index]);
        })
        .catch(() => {
          toast.error("Error Starting Auction");
        });
    }
  };
  const handleAuctionDelete = (productId, index) => {
    axios
      .delete(`http://localhost:4000/product/delete/${productId}`)
      .then((res) => {
        toast.success("Product Deleted");
      })
      .catch(() => {
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
            setAmount(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdData();
  }, []);

  const handleAuctionEdit = (productId) => {
    const selectedProduct = data.find((product) => product._id === productId);

    // Set the initial values for the state variables based on the selected product
    setProductId(productId);
    setMake(selectedProduct.make);
    setVariant(selectedProduct.variant);
    setProductName(selectedProduct.name);
    setProductDescription(selectedProduct.description);
    setBasePrice(selectedProduct.basePrice.$numberDecimal.toString());
    setQuantity(selectedProduct.quantity);

    setDuration(selectedProduct.duration);
    formatDuration(selectedProduct.duration);
    setCategory(selectedProduct.category.name);

    setOpen(true);
  };
  const formatDuration = (durationInSeconds) => {
    if (durationInSeconds % 86400 === 0) {
      setDuration(durationInSeconds / 86400);
      setDurationUnit("days");
    } else if (durationInSeconds % 3600 === 0) {
      setDuration(durationInSeconds / 3600);
      setDurationUnit("hours");
    } else if (durationInSeconds % 60 === 0) {
      setDuration(durationInSeconds / 60);
      setDurationUnit("minutes");
    }
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
    console.log("Unit", durationUnit);
    console.log("Duration", duration);
    let durationInSeconds = 0;
    switch (durationUnit) {
      case "days":
        durationInSeconds = parseInt(duration, 10) * 24 * 60 * 60;
        break;
      case "hours":
        durationInSeconds = parseInt(duration, 10) * 60 * 60;
        break;
      case "minutes":
        durationInSeconds = parseInt(duration, 10) * 60;
        break;
      default:
        break;
    }

    console.log("name:", name);
    console.log("productDescription:", productDescription);
    console.log("basePrice:", basePrice);
    console.log("quantity:", quantity);
    console.log("duration:", duration);
    console.log("categoryId:", categoryId);
    const formData = new FormData();
    console.log("Update Form", formData);
    formData.append("name", name);
    formData.append("description", productDescription);
    formData.append("basePrice", basePrice);
    formData.append("quantity", quantity);
    formData.append("duration", durationInSeconds);
    formData.append("category", categoryId); // Append the category ID

    axios
      .put(`http://localhost:4000/product/update-single/${productId}`, {
        name,
        description: productDescription,
        basePrice,
        quantity,
        duration: durationInSeconds,
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
    axios
      .post(`http://localhost:4000/payment/seller-payment/${decode._id}`, {
        amount: amount.totalEarnings,
      })
      .then((res) => {
        console.log("Balance:", res);
        if (res.data === "Success") {
          axios
            .post(`http://localhost:4000/order/update-checkout/${decode._id}`)
            .then((res) => {
              toast.success("Payment Successful");
              window.location.reload();
            });
        } else {
          window.open(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [basePriceisValid, setBasePriceIsValid] = useState(true);
  const [quantityisValid, setQuantityIsValid] = useState(true);
  const [durationisValid, setDurationIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageQuantity, setErrorMessageQuantity] = useState("");
  const [durationUnit, setDurationUnit] = useState("");

  const handleBasePriceChange = (event) => {
    if (event.target.value < 0 || isNaN(event.target.value)) {
      setBasePriceIsValid(false);
      setErrorMessage("Base Price cannot be negative");
    } else {
      setBasePriceIsValid(true);
      setBasePrice(event.target.value);
    }
  };

  const handleQuantityChange = (event) => {
    if (event.target.value < 0 || isNaN(event.target.value)) {
      setQuantityIsValid(false);
      setErrorMessageQuantity("Please Enter a valid Quantity");
    } else {
      setQuantityIsValid(true);
      setQuantity(event.target.value);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };
  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleEditProfile = () => {
    // if(password !== confirmPassword){
    //   setProfileError(true);
    //   return;
    // }
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNumber === "" ||
      address === ""
    ) {
      setProfileError(true);
      return;
    }
    // if(password && confirmPassword === ""){
    //   setProfileError(true);
    //   return;
    // }
    axios
      .put(`http://localhost:4000/seller/edit/profile/${decode._id}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password,
        confirmPassword,
        image: picture,
      })
      .then((response) => {
        console.log(response.data);
        // Update the state values after a successful profile update
        if (response.data === "Password Updated Successfully") {
          toast.success("Password Updated Successfully");
          localStorage.removeItem("sellerToken");
          navigate("/seller/sign-in");
        }
        if (response.data.verified === "false") {
          toast.success(
            "Profile Updated Successfully, Please Verify Your Email"
          );
          localStorage.removeItem("sellerToken");
          navigate("/seller/sign-in");
        }
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setAddress(response.data.address);
        toast.success("Profile Updated Successfully");
        handleCloseProfile();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={8}>
          <Paper
            sx={{
              p: 1,
              margin: "auto",
              mt: 5,
              margin: "auto",
              maxWidth: 800,
              flexGrow: 1,
              backgroundColor: "grey",
              color: "black",
              boxShadow: "10px 10px 10px rgba(0.5, 0.5, 0, 0.5)",
            }}
          >
            <Tooltip title="Change Password" arrow>
              <IconButton
                sx={{ float: "right" }}
                onClick={() => {
                  setOpenProfile(true);
                }}
              >
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ paddingRight: { xs: 0, sm: 2 } }}
              >
                <ButtonBase sx={{ width: 250, height: 180 }}>
                  <Img
                    alt="complex"
                    src={decode.image}
                    sx={{ borderRadius: "50%" }}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Grid
                  container
                  direction="column"
                  spacing={1}
                  sx={{ mt: { xs: 2, sm: 0 }, marginLeft: { xs: 0, sm: 2 } }}
                >
                  <Grid item xs>
                    <Typography variant="h6">
                      Name: {firstName} {lastName}
                    </Typography>
                    <Typography variant="subtitle1">Email: {email}</Typography>
                    <Typography variant="subtitle1">
                      Address: {address}
                    </Typography>
                    <Typography variant="subtitle1">
                      Phone: {phoneNumber}
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
              margin: "auto",
              mt: 5,
              mr: 5,
              flexGrow: 1,
              backgroundColor: "orange",
              color: "white",
              boxShadow: "10px 10px 10px rgba(0.5, 0.5, 0, 0.5)",
            }}
          >
            <Typography variant="h6">Total Earning</Typography>
            <Typography variant="h4">
              ${amount.totalEarnings} {/* Display the total currentPrice */}
            </Typography>
            <Tooltip title="You will be charged 5% of the amount" arrow>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#0C134F",
                  "&:hover": { backgroundColor: "lightblue", color: "black" },
                }}
                onClick={handlePayment}
                disabled={amount.totalEarnings === 0}
              >
                Cash Out
              </Button>
            </Tooltip>
            {/* Add any additional information here */}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ m: 4, mb: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#0C134F",
            color: "white",
          }}
        >
          <Typography variant="h5">
            Products Up For Auction
            <br />
          </Typography>
          <Typography variant="body-1">
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
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body-1">{item.description}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="flex-start" width="100%">
                    <Button
                      variant="contained"
                      onClick={() => handleAuctionStart(item._id, index)}
                      disabled={disabledItems.includes(index)}
                      startIcon={<PlayArrowIcon />}
                    >
                      Auction
                    </Button>
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton
                      onClick={() => handleAuctionDelete(item._id, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAuctionEdit(item._id, index)}
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              onClick={() => handlePageChange(index + 1)}
              sx={{ mx: 1 }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
      </Box>

      {/* EDIT FORM */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Edit The Product Info</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Make"
                fullWidth
                value={make}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Variant"
                fullWidth
                value={variant}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
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
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!basePriceisValid}
                label="Base Price"
                fullWidth
                placeholder="Auction will start from this price point."
                value={basePrice}
                onChange={handleBasePriceChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonetizationOnIcon />
                    </InputAdornment>
                  ),
                }}
                helperText={errorMessage}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                error={!quantityisValid}
                fullWidth
                placeholder="Auction will last this amount of time"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ProductionQuantityLimitsIcon />
                    </InputAdornment>
                  ),
                }}
                helperText={errorMessageQuantity}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration Unit"
                fullWidth
                select
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="minutes">Minutes</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="days">Days</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration"
                fullWidth
                placeholder="Duration value"
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openProfile} onClose={handleCloseProfile}>
        <DialogTitle sx={{textAlign:'center'}}>Change Password</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                error={profileError}
                sx={{ mt: 2 }}
                label="First Name"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="outlined"
                helperText={profileError ? "Name Can not be empty" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={profileError}
                sx={{ mt: 2 }}
                label="Last Name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                helperText={profileError ? "Name Can not be empty" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={profileError}
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                helperText={profileError ? "Email Can not be empty" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={profileError}
                label="Phone Number"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                helperText={profileError ? "Phone Number Can not be empty" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                error={profileError}
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                helperText={profileError ? "Address Can not be empty" : ""}
              />
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={() => {
                setPassVisible(true);
              }}
              sx={{ m: 2 }}
            >
              CHANGE PASSWORD
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              style={{ display: "none" }} // Hide the input element
              ref={fileInputRef} // Create a ref to the input element
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInputRef.current.click()} // Trigger the click on the input element
              sx={{ mt: 2 }}
            >
              Change Profile Picture
            </Button> */}
            {/* {passVisible && (
              <> */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={profileError}
                    type="password"
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={profileError}
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              {/* </>
            )} */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} variant="contained" color="error">
            Close
          </Button>
          <Button variant="contained" sx={{backgroundColor:'green'}} onClick={handleEditProfile} >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
