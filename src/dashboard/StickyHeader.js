import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const StickyHeader = ({
  visibleColumns,
  columns = [],
  products,
  handleOpenEditPopover,
  handleDeleteProductAction,
  onAddToCart,
  selectedImage,
  setSelectedImage,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEllipsisClick = (event, product) => {
    if (event.target.tagName === "BUTTON") {
      onAddToCart(product);
      return;
    }
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
    handleDeleteProductAction(product);
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
                          columns.find((c) => c.id === columnId)?.align || "left"
                        }
                      >
                        {columnId === "actions" ? (
                          <>
                            <FaEllipsisV
                              onClick={(event) =>
                                handleEllipsisClick(event, product)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <Popover
                              open={
                                Boolean(anchorEl) &&
                                selectedProduct === product
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
                            variant="outlined"
                            onClick={() => onAddToCart(product)}
                            size="small"
                          >
                            <AddShoppingCartIcon />
                          </IconButton>
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
