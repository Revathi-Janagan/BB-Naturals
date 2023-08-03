import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const StickyHeader = ({ visibleColumns, columns = [], products, handleAddToCart }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                    align={column.align || "left"} // Set the default align property to "left" if not defined
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={product.product_name}>
                    {visibleColumns.map((columnId) => (
                      <TableCell key={columnId} align={columns.find((c) => c.id === columnId).align || "left"}>
                        {columnId === "add" ? columns.find((c) => c.id === columnId).format("", product, handleAddToCart) : row[columnId]}
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
