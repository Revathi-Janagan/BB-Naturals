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
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'orderNumber', label: 'Order Number', minWidth: 100 },
  { id: 'customer', label: 'Customer', minWidth: 150 },
  { id: 'billingAddress', label: 'Billing Address', minWidth: 200 },
  { id: 'dateCreated', label: 'Date Created', minWidth: 150 },
  { id: 'paymentMethod', label: 'Payment Method', minWidth: 150 },
  { id: 'total', label: 'Total', minWidth: 100, align: 'right' },
  { id: 'customizeControlIcon', label: 'Customize Control Icon', minWidth: 100, align: 'right' },
];

function createData(status, orderNumber, customer, billingAddress, dateCreated, paymentMethod, total) {
  return { status, orderNumber, customer, billingAddress, dateCreated, paymentMethod, total };
}

const rows = [
  createData('Pending', 'ORD-123', 'John Doe', '123 Main St, City', '2023-07-27', 'Credit Card', 150.50),
  createData('Shipped', 'ORD-124', 'Jane Smith', '456 Oak Ave, Town', '2023-07-26', 'PayPal', 75.00),
  // Add more data rows here...
];

const Order = () => {
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.orderNumber}>
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

export default Order;
