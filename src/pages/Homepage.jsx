import React, { useState } from "react";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import NewProducts from "../components/Home/NewProducts";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import SellerBanner from "../components/Home/SellerBanner";
import Images from "../components/Home/Images";

const HomePage = () => {
  const [name, setName] = useState("");
  return (
    <>
      <Box sx={{ backgroundColor: "#EEEDED" }}>
        {/* <Banner /> */}
        <Images/>
        <Categories />
        <NewProducts />
        <SellerBanner />
      </Box>

      {/* <Box>
                <TextField 
                
                />
                <Button onClick={()=>{
                            axios
                            .post("http://localhost:5000/api/categories/", name)
                            .then(() => {
                              console.log("Successful");
                            })
                            .catch(() => {
                              console.log("Unsuccessful");
                            })
                }}>

                </Button>
            </Box> */}
    </>
  );
};

export default HomePage;
