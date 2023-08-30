import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { SetPrice } from "../../redux/actions/priceCondition";


const BidDialog = ({ open, handleCloseBid, productID, price }) => {

  const giphyGifUrl = "https://giphy.com/embed/cPZ6etcejePZ3pvctr/video";
  const [currentPrice, setCurrentPrice] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const dispatchRedux = useDispatch()
  const id = useSelector((state)=> state.authReducer.userId)
  const handleBid = () => {
  
    axios
      .post("http://localhost:4000/auction/bid", {
        productID,
        currentPrice,
        bidderID:id,
      })
      .then((res) => {
        console.log(res.data)
        dispatchRedux(SetPrice(res.data))
        handleCloseBid();
        // setSuccessDialogOpen(true);
      })
      .catch((err) => {
        toast.error("Cannot Place Bid At the Moment");
      });
  };

  const handleCloseSuccessDialog = () => {
    setTimeout(()=>{
      setSuccessDialogOpen(false);
    },2000)
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseBid}>
        <DialogTitle sx={{ backgroundColor: "#0C134F", mb: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
            Place A Bid
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Enter the Amount You Want To Place The Bid Of
          </DialogContentText>
          <TextField
            label="$"
            placeholder="Enter the Amount"
            id="$"
            fullWidth
            onChange={(event) => {
              event.preventDefault();
              setCurrentPrice(event.target.value);
            }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleBid}
            sx={{ backgroundColor: "#0C134F", color: "white" }}
            // onClick={() => {
            //   setSuccessDialogOpen(true);
            // }}
            disabled={
              !price || !price.$numberDecimal || parseFloat(currentPrice) <= parseFloat(price.$numberDecimal) || currentPrice == ''
            }
          >
            Place Bid
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseBid}
            sx={{ backgroundColor: "orange", color: "white", ml: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle sx={{ backgroundColor: "#0C134F", mb: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
            Bid Placed
          </Typography>
        </DialogTitle>
        <DialogContent>
          <img src={giphyGifUrl} alt="Congratulations GIF" width="100%" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BidDialog;
