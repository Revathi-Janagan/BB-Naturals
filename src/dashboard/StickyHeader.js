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
import { FaEllipsisV } from "react-icons/fa";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StickyHeader = ({
  visibleColumns,
  columns = [],
  products,
  handleOpenEditPopover,
  handleDeleteProductAction, 
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
    // event.persist();
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
