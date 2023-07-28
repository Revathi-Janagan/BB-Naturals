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
  { id: 'image', label: 'Status', minWidth: 100 },
  { id: 'firstName', label: 'First NAme', minWidth: 100 },
  { id: 'lastName', label: 'Last NAme', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },  
  { id: 'BillingAddress', label: 'Payment Method', minWidth: 150 },
  { id: 'dateCreated', label: 'Date Created', minWidth: 150 }, 
  { id: 'customizeControlIcon', label: 'Customize Control Icon', minWidth: 100, align: 'right' },
];

function createData(image, firstName, lastName,email, billingAddress, dateCreated, customizeControlIcon) {
  return { image, firstName, lastName,email, billingAddress, dateCreated, customizeControlIcon };
}

const rows = [
  createData('', 'Raj', 'John ', 'raj@gmail.com','123 Main St, City', '2023-07-27',),
  createData('', 'Varun', ' Smith','varun@gmail', '456 Oak Ave, Town', '2023-07-26',),
  // Add more data rows here...
];

const CustomerContent = () => {
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
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomerContent;
