import { Grid, Typography, Button } from '@mui/material';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categoryData, setCategoryData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 18;

  React.useEffect(() => {
    axios.get('http://localhost:4000/categories/get') // Adjust the URL as needed
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch(() => {
        console.error('Error fetching categories');
      });
  }, []);

  const totalPageCount = Math.ceil(categoryData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCategories = categoryData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 2, mb: 2 }}>
        {visibleCategories.map((category) => (
          <Grid key={category._id} item xs={6} sm={4} md={3} lg={2}>
            <Link to={`/categories/${category._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ImageListItem>
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={category.name}
                  subtitle={category.description}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${category.name}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body2" align="center">
        Page {currentPage} of {totalPageCount}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          style={{ marginRight: '8px' }}
        >
          <SkipPreviousIcon/>
        </Button>
        <Button
          variant="outlined"
          disabled={currentPage === totalPageCount}
          onClick={handleNextPage}
        >
          <SkipNextIcon/>
        </Button>
      </div>
    </>
  );
};

export default Categories;
