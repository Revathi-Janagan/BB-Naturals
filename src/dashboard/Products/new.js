import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

const ProductPopover = ({
  columns,
  productData,
  open,
  onClose,
  onSubmit,
  onChange,
  title,
}) => {
  return (
    <Popover open={open} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {columns.map((column) => (
          <div key={column.id} style={{ padding: "8px" }}>
            <Typography variant="subtitle1" gutterBottom>
              {column.label}
            </Typography>
            <input
              type="text"
              id={column.id}
              value={(productData && productData[column.id]) || ""}
              onChange={(e) => onChange(e, column)}
              style={{
                width: "400px",
                padding: "8px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ marginRight: "8px" }} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </Popover>
  );
};

export default ProductPopover;



import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { FaEllipsisV } from "react-icons/fa";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StickyHeader = ({
  visibleColumns,
  columns = [],
  products,
  handleAddToCart,
  handleOpenEditPopover,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null); // State for the Popover anchor element
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEllipsisClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    console.log("Editing product:", product);
    handleMenuClose();
    handleOpenEditPopover(product);
  };

  const handleDeleteProduct = (product) => {
    console.log("Deleting product:", product);
    handleMenuClose();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns
                .filter((column) => visibleColumns.includes(column.id))
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                const row = {};
                visibleColumns.forEach((columnId) => {
                  row[columnId] = product[columnId];
                });
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.product_name}
                  >
                    {visibleColumns.map((columnId) => (
                      <TableCell
                        key={columnId}
                        align={
                          columns.find((c) => c.id === columnId).align || "left"
                        }
                      >
                        {columnId === "actions" ? (
                          // Display the three-dot icon for "actions" column
                          <>
                            <FaEllipsisV
                              onClick={(event) =>
                                handleEllipsisClick(event, product)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            {/* Popover */}
                            <Popover
                              open={
                                Boolean(anchorEl) && selectedProduct === product
                              }
                              anchorEl={anchorEl}
                              onClose={handleMenuClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <Typography
                                sx={{
                                  p: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    marginBottom: "8px",
                                    color: "blue",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <EditIcon style={{ marginRight: "4px" }} />
                                  Edit
                                </div>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  onClick={() => handleDeleteProduct(product)}
                                >
                                  <DeleteIcon style={{ marginRight: "4px" }} />
                                  Delete
                                </div>
                              </Typography>
                            </Popover>
                          </>
                        ) : columnId === "add" ? (
                          <IconButton
                            onClick={() => handleAddToCart(product)}
                          ></IconButton>
                        ) : (
                          row[columnId]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeader;

