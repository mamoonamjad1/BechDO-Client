import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Grid, Button, Typography } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { toast } from "react-toastify";

const Products = () => {
  const { id } = useParams();
  console.log("PARAMS: ", id);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/product/category/${id}`)
      .then((res) => {
        console.log("Hello", res);
        setProducts(res.data);
        toast.success("View Products Of Selected Category");
      })
      .catch(() => {
        console.error("Error fetching products");
      });
  }, [id]);

  const totalPageCount = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        {visibleProducts.map((product, index) => (
          <Grid item xs={6} sm={6} md={2} key={index}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#EEEDED" }}>
              <CardHeader
                title={product.name}
                subheader={`Price: $${product.basePrice.$numberDecimal}`}
              />

              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:4000/pictures/${product.images[0]}`}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {`Description: ${product.description}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body2" align="center">
        Page {currentPage} of {totalPageCount}
      </Typography>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "16px" }}
      >
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          style={{ marginRight: "8px" }}
        >
          <SkipPreviousIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={currentPage === totalPageCount}
          onClick={handleNextPage}
        >
          <SkipNextIcon />
        </Button>
      </div>
    </>
  );
};

export default Products;
