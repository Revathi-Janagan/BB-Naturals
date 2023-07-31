import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { FaDollarSign   } from "react-icons/fa";
import "./RightDiv.css"


const columns = [
  { id: 'image', label: 'Image', minWidth: 150 },
  { id: 'product', label: 'Product', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
  { id: 'remove', label: 'Remove', minWidth: 100, align: 'center' }, 
];

const RightDiv = ({ selectedItems, onRemoveItem }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemoveItem = (index) => {
    onRemoveItem(index);
  };
  const calculateTotal = () =>{
    let total = 0;
    selectedItems.forEach(item => {
      total += parseFloat (item.price.replace("$", ""));
      
    });
    return total.toFixed(2);

  }

  return (
    <div className="right-div-container custom-right-table">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
             
              {selectedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <h3>Card is Empty</h3>
                  </TableCell>
                </TableRow>
              ) : (
                selectedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{row.image}</TableCell>
                    <TableCell align="left">{row.product}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" onClick={() => handleRemoveItem(index)}>
                        -
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={selectedItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className="right-div-footer foot-right">
        <p>Sub Total: ${calculateTotal()}</p>
        
        <button className="btn btn-outline custom-button-addcart" type="submit">
            <FaDollarSign className="star-fill-icon" /> {""}Check Out: ${calculateTotal()}
              </button>
      </div>
    </div>
  );
};

export default RightDiv;
