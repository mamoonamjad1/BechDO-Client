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
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CloseIcon from "@mui/icons-material/Close";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [name, setProductName] = useState("");
  const [make, setMake] = useState([]);
  const [selectedMake, setSelectedMake] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImageTitles, setUploadedImageTitles] = useState([]);

  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [isBasePriceValid, setIsBasePriceValid] = useState(true);
  const [isDurationValid, setIsDurationValid] = useState(true);
  const [quantityErrorMsg, setQuantityErrorMsg] = useState("");
  const [basePriceErrorMsg, setBasePriceErrorMsg] = useState("");
  const [durationErrorMsg, setDurationErrorMsg] = useState("");
  const [isRequiredFieldsValid, setIsRequiredFieldsValid] = useState(true);

  const [durationUnit, setDurationUnit] = useState("days");
  const [durationValue, setDurationValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories/get")
      .then((res) => {
        console.log("CAT", res.data);
        setCategories(res.data);
        setCategoryName(res.data.map((category) => category.name));
      })
      .catch(() => {
        console.log("Error Fetching");
      });
  }, []);

  //get Car Make
  useEffect(() => {
    axios
      .get("http://localhost:4000/cars/carMakes")
      .then((res) => {
        console.log("Make", res.data);
        setMake(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (category) => category.name === event.target.value
    );
    setCategory(event.target.value);
    setCategoryId(selectedCategory ? selectedCategory._id : "");
  };

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    // Find the ID of the selected make based on your data
    const selectedMakeId = make.find((item) => item.name === selectedMake)._id;
    setSelectedMake(selectedMake);
    setSelectedMakeId(selectedMakeId);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const fileTitles = Array.from(fileList).map((file) => file.name);
    setImages([...images, ...fileList]);
    setUploadedImageTitles([...uploadedImageTitles, ...fileTitles]);
  };
  // YEARS
  const [years, setYears] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Create an array of years from 1999 to the current year
    const yearArray = Array.from(
      { length: currentYear - 1998 },
      (_, index) => 1999 + index
    );
    setYears(yearArray);
  }, []);



  const handleSubmit = () => {
    if (!isQuantityValid || !isBasePriceValid) {
      // Validation failed, do not submit the form
      return;
    }
    if (
      !selectedMake ||
      !model ||
      !selectedVariant ||
      !category ||
      !name ||
      !basePrice ||
      !quantity ||
      !categoryId
    ) {
      setIsRequiredFieldsValid(false);
      return;
    }

    // Convert duration to seconds based on the selected unit
  let durationInSeconds = 0;
  switch (durationUnit) {
    case 'days':
      durationInSeconds = parseInt(durationValue, 10) * 24 * 60 * 60;
      break;
    case 'hours':
      durationInSeconds = parseInt(durationValue, 10) * 60 * 60;
      break;
    case 'minutes':
      durationInSeconds = parseInt(durationValue, 10) * 60;
      break;
    default:
      break;
  }
    const token = localStorage.getItem("sellerToken");
    const decode = jwtDecode(token);
    const id = decode._id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("make", selectedMake);
    formData.append("model", model);
    formData.append("variant", selectedVariant);
    formData.append("description", productDescription);
    formData.append("basePrice", basePrice);
    formData.append("quantity", quantity); // Fixed typo Quantity -> quantity
    formData.append("duration", durationInSeconds);
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
        setSelectedMake("");
        setModel("");
        setSelectedVariant("");
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
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:4000/parts/fetch/${categoryId}`)
        .then((res) => {
          console.log("Parts", res.data);
          setParts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoryId]);

  useEffect(() => {
    // Check if selectedMakeId is not empty and fetch variants based on the ID
    if (selectedMakeId) {
      axios
        .get(`http://localhost:4000/cars/variants/${selectedMakeId}`)
        .then((response) => {
          console.log("Variants", response);
          setVariant(response.data);
        })
        .catch((error) => {
          console.error("Error fetching variants:", error);
        });
    }
  }, [selectedMakeId]);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value < 0 || isNaN(value)) {
      setIsQuantityValid(false);
      setQuantityErrorMsg(
        "Quantity cannot be less than 0 and cannot be an alphabet or word"
      );
    } else {
      setIsQuantityValid(true);
      setQuantityErrorMsg("");
      setQuantity(value);
    }
  };

  const handleBasePriceChange = (event) => {
    const value = event.target.value;
    if (value < 0 || isNaN(value)) {
      setIsBasePriceValid(false);
      setBasePriceErrorMsg(
        "Base Price cannot be less than 0 and cannot be an alphabet or word"
      );
    } else {
      setIsBasePriceValid(true);
      setBasePriceErrorMsg("");
      setBasePrice(value);
    }
  };

  const handleDurationUnitChange = (event) => {
    setDurationUnit(event.target.value);
    setDurationValue(""); 
    
  };
  const handleDurationInput = (event) => {
    const value = event.target.value;
    if (value < 0 || isNaN(value)) {
      setIsDurationValid(false);
      setDurationErrorMsg(
        "Duration cannot be less than 0 and cannot be an alphabet or word"
      );
    } else {
      setIsDurationValid(true);
      setDurationErrorMsg("");
      setDurationValue(value);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
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
          {!isRequiredFieldsValid && (
            <Typography variant="caption" sx={{ color: "red" }}>
              Please fill all the required fields
            </Typography>
          )}

          <Grid container spacing={2}>
            {/* //Company Name */}
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!isRequiredFieldsValid}
              >
                <InputLabel>Make*</InputLabel>
                <Select
                  label="Make*"
                  value={selectedMake}
                  onChange={handleMakeChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  }
                >
                  {make.map((makeObject) => (
                    <MenuItem key={makeObject._id} value={makeObject.name}>
                      {makeObject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!isRequiredFieldsValid}
              >
                <InputLabel>Model*</InputLabel>
                <Select
                  label="Model*"
                  value={model}
                  onChange={handleModelChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  }
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!isRequiredFieldsValid}
              >
                <InputLabel>Variant*</InputLabel>
                <Select
                  label="Variant*"
                  value={selectedVariant} // Set the value to the selectedVariant state
                  onChange={handleVariantChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <TimeToLeaveIcon />
                    </InputAdornment>
                  }
                >
                  {variant.map((variantObject) => (
                    <MenuItem key={variantObject.id} value={variantObject.name}>
                      {variantObject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Category */}
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!isRequiredFieldsValid}
              >
                <InputLabel>Category*</InputLabel>
                <Select
                  label="Category*"
                  value={category}
                  onChange={handleCategoryChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SettingsIcon />
                    </InputAdornment>
                  }
                >
                  {categoryName.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!isRequiredFieldsValid}
              >
                <InputLabel>Product Name*</InputLabel>
                <Select
                  label="Product Name*"
                  value={name}
                  onChange={(e) => setProductName(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  }
                >
                  {parts.map((part) => (
                    <MenuItem key={part._id} value={part.name}>
                      {part.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                label="Base Price*"
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
                  sx: {
                    borderColor: isBasePriceValid ? "" : "red", // Change border color to red if not valid
                  },
                }}
                variant="outlined"
                error={!isBasePriceValid || !isRequiredFieldsValid}
                helperText={isBasePriceValid ? "" : basePriceErrorMsg}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity*"
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
                  sx: {
                    borderColor: isQuantityValid ? "" : "red", // Change border color to red if not valid
                  },
                }}
                variant="outlined"
                error={!isQuantityValid || !isRequiredFieldsValid}
                helperText={isQuantityValid ? "" : quantityErrorMsg}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                error={!isRequiredFieldsValid}
              >
                <InputLabel>Duration Unit*</InputLabel>
                <Select
                  label="Duration Unit*"
                  value={durationUnit}
                  onChange={handleDurationUnitChange}
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="hours">Hours</MenuItem>
                  <MenuItem value="minutes">Minutes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={`Duration (${durationUnit})`}
                error={!isRequiredFieldsValid || !isDurationValid}
                fullWidth
                placeholder={`Enter duration in ${durationUnit}`}
                value={durationValue}
                onChange={handleDurationInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeFilledIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderColor: isDurationValid ? "" : "red", // Change border color to red if not valid
                }}
                variant="outlined"
                helperText={isDurationValid ? "" : durationErrorMsg}
              />

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
