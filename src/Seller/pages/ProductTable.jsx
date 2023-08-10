import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { styled } from "@mui/material/styles"; // Import the styled function
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";


// Function to create a row data object
function createData(
  productName,
  description,
  Quantity,
  basePrice,
  duration
) {
  return {
    productName,
    description,
    Quantity,
    basePrice: basePrice.$numberDecimal.toString(),
    duration,
  };
}

const StyledTableCell = styled(TableCell)(({ theme, isSorted }) => ({
  backgroundColor: "#0C134F", // Change to orange if clicked, otherwise, blue
  color: isSorted ? "white" : theme.palette.common.white, // Set the text color to white if clicked, otherwise, blue
  fontWeight: "bold", // Make the headings bold
  "&.basePriceCell": {
    color: theme.palette.common.white, // Set the text color to white for "Base Price" cell
  },
  "&:hover": {
    backgroundColor: "orange", // Change the background color to orange on hover
  },
}));

export default function ProductTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [adData, setAdData] = useState([]);
  const [isSorted, setIsSorted] = useState(false); // State to track if the table is sorted
  const emptyRows = Math.max(
    0,
    rowsPerPage - Math.min(rowsPerPage, adData.length - page * rowsPerPage)
  );

  useEffect(() => {
    // Fetch ad data for the logged-in user
    const fetchAdData = async () => {
      try {
        const token = localStorage.getItem("sellerToken");
        const decode = jwtDecode(token);
        console.log("ID", decode._id);
        axios
          .get(`http://localhost:4000/product/table/${decode._id}`)
          .then((res) => {
            console.log("RES", res.data);
            setAdData(res.data);
          })
          .catch(() => {
            toast.error("Unable to Fetch Products");
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdData();
  }, []);

  // Function to handle table header sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setIsSorted(true); // Table is sorted, so set isSorted to true
  };

  // Function to handle clicking on a table heading
  const handleClickHeading = () => {
    setIsSorted(false); // Table is not sorted, so set isSorted to false
  };

  // Function to handle changing the page in the table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle changing the number of rows per page in the table pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle changing the dense padding switch
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Function to stabilize sort order
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Function to sort the table data
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => b[orderBy] - a[orderBy]
      : (a, b) => a[orderBy] - b[orderBy];
  };

  // Create the head cells for the table
  const headCells = [
    {
      id: "productName",
      numeric: false,
      disablePadding: false,
      label: "Product Name",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "quantity",
      numeric: true,
      disablePadding: false,
      label: "Quantity",
    },
    {
      id: "basePrice",
      numeric: true,
      disablePadding: false,
      label: "Base Price",
    },
    {
      id: "salePrice",
      numeric: true,
      disablePadding: false,
      label: "Sold At",
    },
    {
      id: "duration",
      numeric: true,
      disablePadding: false,
      label: "Duration",
    },
    {
      id: "actions", // New column for Actions
      numeric: false,
      disablePadding: false,
      label: "Actions",
    },
  ];

  // Display the table header
  const EnhancedTableHead = (props) => {
    const {
      order,
      orderBy,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <StyledTableCell
            padding="checkbox"
            isClicked={!isSorted}
            onClick={handleClickHeading}
          >
            {/* Use the custom styled TableCell */}
            <TableSortLabel
              active={orderBy === "productName"}
              direction={order}
              onClick={createSortHandler("productName")}
            >
              {headCells[0].label}
              {orderBy === "productName" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
          {headCells.slice(1).map((headCell) => (
            <StyledTableCell // Use the custom styled TableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ color: "white" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
  };

  // Check if data is still being fetched
  if (!adData || adData.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAuctionButtonClick = (productId) => {
    // Your auction button logic here
    // For example, you can trigger the auction process here
    if (productId) {
      let adId = productId;
      console.log(adId);
        axios
          .delete(`http://localhost:4000/product/delete/${adId}`)
          .then((res) => {
            toast.success(`Product Deleted`);
          })
          .catch(() => {
            toast.error("Error");
          });
      } else {
        toast.error("Product ID not available.");
    }
  };

  const visibleRows = stableSort(adData, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((ad) => {
      const labelId = `enhanced-table-checkbox-${ad.productName}`;

      return (
        <TableRow
          hover
          onClick={() => {}}
          tabIndex={-1}
          key={ad.productName}
          sx={{ cursor: "pointer", color: "white" }}
        >
          <TableCell component="th" id={labelId} scope="row" padding="1px">
            {ad.name}
          </TableCell>
          <TableCell align="center">{ad.description}</TableCell>
          <TableCell align="center">{ad.quantity}</TableCell>
          <TableCell align="center">
            {ad.basePrice.$numberDecimal.toString()}
          </TableCell>
          <TableCell align="center">
            {ad.currentPrice.$numberDecimal.toString()}
          </TableCell>
          <TableCell align="center">{ad.duration}</TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              onClick={() => handleAuctionButtonClick(ad._id)}
              sx={{
                color: "white",
                backgroundColor: "orange",
                "&:hover": {
                  backgroundColor: "#F4D160",
                },
              }}
            >
              <DeleteIcon/>
            </Button>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* Table Toolbar */}
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%", textAlign: "center" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Sold Items Table
          </Typography>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>

        {/* Table Container */}
        <TableContainer>
          {/* Table */}
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            {/* Table Header */}
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            {/* Table Body */}
            <TableBody>
              {visibleRows}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={adData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
