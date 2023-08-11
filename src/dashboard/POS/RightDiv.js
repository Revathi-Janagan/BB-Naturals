import React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

import "./RightDiv.css";

const columnsForRightDiv = [
  { id: "product_name", label: "Product", minWidth: 150 },
  { id: "price", label: "Price", minWidth: 100, align: "right" },
  {
    id: "remove",
    label: "Remove From Cart",
    minWidth: 100,
    align: "center",
    format: (value, row, onRemoveItem) => (
      <Button variant="outlined" onClick={() => onRemoveItem(row)}>
        -
      </Button>
    ),
  },
];

const RightDiv = ({ selectedRows, onRemoveItem }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const totalPrice = selectedRows.reduce((total, row) => total + row.price, 0);

  return (
    <div className="right-div-container">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsForRightDiv.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    {columnsForRightDiv.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {/* Check if the column is the "remove" column */}
                        {column.id === "remove"
                          ? column.format && typeof column.format === "function"
                            ? column.format(column.id, row, onRemoveItem)
                            : ""
                          : // Render the cell content for other columns
                            row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="footer-buttons">
        
          <Button variant="outlined" color="error" className="void-button" style={{marginRight:"10px" , width:"100px"}}>
            Void
          </Button>
          <Button variant="contained" color="primary" className="checkout-button" style={{ width:"400px"}}>
            Checkout ${totalPrice.toFixed(2)}
          </Button>
          
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={selectedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default RightDiv;
