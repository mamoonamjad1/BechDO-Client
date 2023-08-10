import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
  DialogActions,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [name, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImageTitles, setUploadedImageTitles] = useState([]);

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

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const fileTitles = Array.from(fileList).map((file) => file.name);
    setImages([...images, ...fileList]);
    setUploadedImageTitles([...uploadedImageTitles, ...fileTitles]);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("sellerToken");
    const decode = jwtDecode(token);
    const id = decode._id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", productDescription);
    formData.append("basePrice", basePrice);
    formData.append("quantity", quantity); // Fixed typo Quantity -> quantity
    formData.append("duration", duration);
    formData.append("categoryID", categoryId);
    formData.append("ownerID", id);
    images.forEach((image) => {
      formData.append("images", image);
    });
    console.log("Image", images);
    axios
      .post("http://localhost:4000/product/add", formData)
      .then((response) => {
        console.log(response.data);
        setProductName("");
        setProductDescription("");
        setBasePrice("");
        setQuantity("");
        setDuration("");
        setCategory("");
        setCategoryId("");
        setImages([]);
        setUploadedImageTitles([]);
        toast.success("Product Added Successfully");
        handleClose();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#0C134F" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">
              BECHDO
              <Typography color="orange" component="span">
                Seller
              </Typography>
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ADD A PRODUCT
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-image-input"
              />
              <label htmlFor="upload-image-input">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "orange",
                    "&:hover": { backgroundColor: "#F4D160" },
                  }}
                  component="span"
                >
                  Upload Image
                </Button>
              </label>
              {uploadedImageTitles.length > 0 && (
                <div>
                  {uploadedImageTitles.map((title, index) => (
                    <Typography key={index} variant="caption" sx={{ mt: 1 }}>
                      {title}
                    </Typography>
                  ))}
                </div>
              )}
            </Grid>
          </Grid>

          <DialogActions>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0C134F" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDialog;
