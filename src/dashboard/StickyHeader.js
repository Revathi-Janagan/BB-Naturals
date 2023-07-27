import React from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Products', colSpan: 2 },
  { id: 'stock', label: 'Stock', minWidth: 100 },
  { id: 'categories', label: 'Categories', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 150, align: 'right' },
  { id: 'regularPrice', label: 'Regular Price', minWidth: 170, align: 'right' },
  { id: 'salePrice', label: 'Sale Price', minWidth: 170, align: 'right' },
];

function createData(name, stock, categories, price, regularPrice, salePrice) {
    const productName = (
        <React.Fragment>
          <TableCell>images</TableCell>
          <TableCell>{name}</TableCell>
        </React.Fragment>
      );
  return { name: productName, stock, categories, price, regularPrice, salePrice };
}

const rows = [
  createData('Product 1', 10, 'Category A', 100, 80, 60),
  createData('Product 2', 5, 'Category B', 200, 180, 150),
  createData('Product 3', 10, 'Category A', 100, 80, 60),
  createData('Product 4', 5, 'Category B', 200, 180, 150),
   createData('Product 5', 10, 'Category A', 100, 80, 60),
  createData('Product 6', 5, 'Category B', 200, 180, 150),
   createData('Product 7', 10, 'Category A', 100, 80, 60),
  createData('Product 8', 5, 'Category B', 200, 180, 150),
  createData('Product 9', 10, 'Category A', 100, 80, 60),
  createData('Product 10', 5, 'Category B', 200, 180, 150),
  createData('Product 11', 10, 'Category A', 100, 80, 60),
  createData('Product 12', 5, 'Category B', 200, 180, 150),
 
 
];

const StickyHeader = () => {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeader;
