import React, { useState,useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import axios from "axios";
import "./LeftDiv.css";

const columns = [
  // { id: "image", label: "Image", minWidth: 100 },
  { id: "product", label: "Product", minWidth: 150 },
  { id: "price", label: "Price", minWidth: 100, align: "right" },
  { id: "add", label: "Add", minWidth: 100, align: "center" },
];

function createData( pos_product, pos_price) {
  return {  pos_product, pos_price };
}

const LeftDiv = ({ onAddToCart }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/pos/getPOS"); 
      setRows(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(); 
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addNewRow = (row) => {
    onAddToCart(row); 
  };

  return (
    <div className="left-div-container custom-left-table">
      <Paper sx={{ width: "100%", overflow: "hidden" ,height:'70vh',marginTop:'15px'}} className="custom-left-paper" >
        <TableContainer sx={{ height: '60vh' }} className="custom-left-table-container">
          <Table
            stickyHeader
            aria-label="sticky table"
            className="custom-left-table"
          >
            <TableHead >
              <TableRow >
                {columns.map((column) => (
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.orderNumber}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "add" ? (
                              <Button
                                variant="outlined"
                                onClick={() => addNewRow(row)}
                              >
                                +
                              </Button>
                            ) : (
                              <>{column.format && typeof value === "number"
                              ? column.format(value)
                              : value}</>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default LeftDiv;
