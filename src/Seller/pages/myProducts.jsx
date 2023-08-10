import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import ProductTable from './ProductTable';
import ProductDialog from './ProductDialog';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: '0 16px', // Add horizontal padding here
});

const ResponsiveButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(20), // Adjust the height as needed
  margin: theme.spacing(2), // Add spacing between buttons
}));

// This will have all the listings for the products that the seller has added along with an option to add new

const MyProducts = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem('sellerToken');
  const decode = jwtDecode(token);

  return (
    <>
      <ProductDialog open={open} handleClose={handleClose} />
      <CenteredContainer>
        <ResponsiveButton
          startIcon={<AddCircleIcon />}
          variant="outlined"
          onClick={handleOpen}
        >
          ADD A PRODUCT
        </ResponsiveButton>
        <ResponsiveButton
          startIcon={<SystemUpdateAltIcon />}
          variant="outlined"
          color="success"
          onClick={() => {
            axios
              .get(`http://localhost:4000/product/generate-excel/${decode._id}`, {
                responseType: 'blob', // Specify response type as blob
              })
              .then((response) => {
                const blobUrl = URL.createObjectURL(response.data);
                const tempAnchor = document.createElement('a');
                tempAnchor.href = blobUrl;
                tempAnchor.download = 'products.xlsx';
                tempAnchor.click();
                URL.revokeObjectURL(blobUrl);
                toast.success('Excel File Downloaded');
              })
              .catch(() => {
                toast.error('Error Downloading Excel File');
              });
          }}
        >
          Generate Sale Statement
        </ResponsiveButton>
      </CenteredContainer>

      <ProductTable />
    </>
  );
};

export default MyProducts;
