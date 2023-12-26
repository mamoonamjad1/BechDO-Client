import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  styled,
  Box,
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BidDialog from "../components/dialogs/BidDialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const MainImageWrapper = styled(CardMedia)({
  width: "100%",
  height: "100%",
  position: "relative",
  "&:hover .arrow-btn": {
    opacity: 1,
  },
});

const MainImage = styled("img")({
  width: "100%",
  height: "100%",
});

const ArrowButton = styled(Button)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0,
  transition: "opacity 0.3s",
});

const ThumbnailImage = styled(CardMedia)(({ thumbnailSize }) => ({
  width: "100%",
  height: "auto",
  cursor: "pointer",
}));

const ProductInfoContainer = styled(Grid)({
  margin: "2rem auto",
  padding: "1rem",
  maxWidth: "800px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "white",
});

const MainContainer = styled(Grid)({
  backgroundColor: "#f2f2f2",
  padding: "2rem",
  borderRadius: "8px",
});

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [thumbnailSize, setThumbnailSize] = useState("60px");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [remainingTime, setRemainingTime] = useState(0);
  const update = useSelector((state) => state.currentPriceReducer);
  const [openSeller, setOpenSeller] = useState(false);
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/product/get-single/${id}`)
      .then((response) => {
        console.log("Hello", response.data);
        const productData = response.data;
        setProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setMainImage(
            `http://localhost:4000/pictures/${productData.images[0]}`
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      })
      .finally(() => {
        //toast.success(`Welcome to the Auction of ${product.name}`);
      });
  }, [update]);

  useEffect(() => {
    if (mainImage) {
      const imageElement = new Image();
      imageElement.src = mainImage;
      imageElement.onload = () => {
        setThumbnailSize(isSmallScreen ? "40px" : `${imageElement.width}px`);
      };
    }
  }, [mainImage, isSmallScreen]);

  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const auctionEndTime = new Date(product.auctionEndTime).getTime();
    return Math.max(0, Math.floor((auctionEndTime - currentTime) / 1000));
  };

  useEffect(() => {
    setRemainingTime(calculateRemainingTime());

    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) =>
        Math.max(0, prevRemainingTime - 1)
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [product.auctionEndTime]);

  const handleThumbnailClick = (image, index) => {
    setMainImageIndex(index);
    setMainImage(`http://localhost:4000/pictures/${image}`);
  };

  const handleNextImage = () => {
    if (mainImageIndex < product.images.length - 1) {
      setMainImageIndex(mainImageIndex + 1);
      setMainImage(
        `http://localhost:4000/pictures/${product.images[mainImageIndex + 1]}`
      );
    }
  };

  const handlePrevImage = () => {
    if (mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
      setMainImage(
        `http://localhost:4000/pictures/${product.images[mainImageIndex - 1]}`
      );
    }
  };

  const handleClose = () => {
    setOpenSeller(false);
  };
  const openSellerContent = () => {
    setOpenSeller(true);
  };

  const splitDescription = (description) => {
    const words = description.split(" ");
    const chunks = [];
    for (let i = 0; i < words.length; i += 8) {
      chunks.push(words.slice(i, i + 8).join(" "));
    }
    return chunks;
  };

  const handleCloseBid = () => {
    setOpen(false);
  };
  const timerColor = remainingTime <= 60 ? "red" : "orange";
  const isAuctionEnded = remainingTime <= 0;
  return (
    <MainContainer container justifyContent="center" alignItems="center">
      <ProductInfoContainer
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <BidDialog
          open={open}
          handleCloseBid={handleCloseBid}
          productID={id}
          price={product.currentPrice}
        />
        <Grid item xs={12} md={6}>
          <Card>
            <MainImageWrapper>
              <MainImage src={mainImage} alt={product.name} />
              {(isSmallScreen || !isSmallScreen) && (
                <>
                  <ArrowButton
                    variant="contained"
                    color="primary"
                    className="arrow-btn"
                    onClick={handlePrevImage}
                    style={{
                      left: "10px",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "black" },
                    }}
                  >
                    <ArrowBackIosIcon />
                  </ArrowButton>
                  <ArrowButton
                    variant="contained"
                    color="primary"
                    className="arrow-btn"
                    onClick={handleNextImage}
                    style={{
                      right: "10px",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "black" },
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </ArrowButton>
                </>
              )}
            </MainImageWrapper>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.name}</Typography>
          {product.description && (
            <>
              {splitDescription(product.description).map((chunk, index) => (
                <Typography key={index} variant="caption" sx={{ mb: 2 }}>
                  Description: {chunk}
                </Typography>
              ))}
            </>
          )}
          <br/>
          <Typography variant="caption" gutterBottom >
            Category: {product.category?.name || "N/A"}
          </Typography>
          <br/>
          <Typography variant="caption"> Quantity: {product.quantity}</Typography>

          <br />
          <Button
            variant="outlined"
            onClick={openSellerContent}
          >
            <Typography variant="caption" sx={{ color: "red" }}>
            Seller: {product.owner?.firstName || "N/A"}{" "}
              {product.owner?.lastName || ""}
            </Typography>
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiberManualRecordIcon sx={{ color: "green" }} />
              <Typography variant="body2" sx={{ mr: 1 }}>
                Make: {product.make}
              </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiberManualRecordIcon sx={{ color: "purple" }} />
              <Typography variant="body1" sx={{ mr: 1 }}>
                Variant: {product.variant}
              </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiberManualRecordIcon sx={{ color: "yellow" }} />
              <Typography variant="body1">Model: {product.model}</Typography>
            </div>
          </Box>

          {product.basePrice && (
            <Typography variant="h6">
              Base Price: $
              {parseFloat(product.basePrice.$numberDecimal).toFixed(2)}
            </Typography>
          )}
          {product.currentPrice && (
            <Typography variant="h6">
              Current Price: $
              {parseFloat(product.currentPrice.$numberDecimal).toFixed(2)}
            </Typography>
          )}

         
          <Typography variant="body1" sx={{ color: timerColor }}>
            {isAuctionEnded
              ? "Auction Ended"
              : `Timer: ${Math.floor(remainingTime / 3600)}:${Math.floor(
                  (remainingTime % 3600) / 60
                )}:${remainingTime % 60}`}
          </Typography>
          <Button
            disabled={isAuctionEnded}
            variant="contained"
            sx={{ backgroundColor: "#0C134F", mt: 2 }}
            onClick={() => {
              const token = localStorage.getItem("buyerToken");
              if (token) {
                setOpen(true);
              } else {
                navigate("/login", { state: { from: location.pathname } });
              }
            }}
          >
            Bid Now
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {product.images &&
              product.images.map((image, index) => (
                <Grid item xs={4} sm={2} key={index}>
                  <Card>
                    <ThumbnailImage
                      component="img"
                      image={`http://localhost:4000/pictures/${image}`}
                      alt={`Image ${index + 1}`}
                      thumbnailSize={thumbnailSize}
                      onClick={() => handleThumbnailClick(image, index)}
                    />
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </ProductInfoContainer>
      <Dialog
        open={openSeller}
        onClose={handleClose}
        sx={{ textAlign: "center" }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#0C134F",
            color: "white",
          }}
        >
          Seller Details
          <IconButton
            onClick={handleClose}
            sx={{ marginLeft: "auto", color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <img
            src={`${product.owner?.image}`}
            alt="Seller"
            width="30%"
            sx={{ borderRadius: "50%" }}
          />
          <Typography variant="h6">
            Seller: {product.owner?.firstName || "N/A"}{" "}
            {product.owner?.lastName || ""}
          </Typography>
          <Typography variant="body1">
            Email: {product.owner?.email || "N/A"}
          </Typography>
          <Typography variant="body1">
            Phone: {product.owner?.phoneNumber || "N/A"}
          </Typography>
          <Button
            onClick={() => {
              console.log("Hello");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "orange",
              "&:hover": { color: "white", backgroundColor: "orange" },
            }}
          >
            <Typography variant="button" sx={{ mr: 1 }} onClick={()=>{navigate(`/seller/store/${product.owner._id}`)}}>
              View Storefront
            </Typography>
            <ArrowRightAltIcon />
          </Button>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
};

export default SingleProduct;
