import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import EmailSender from "./EmailSender"; // Import the EmailSender component
import PDFGenerator from "./PDFGenerator"; // Import the PDFGenerator component

const BillingForm = ({ selectedRows }) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showReview, setShowReview] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckoutClick = () => {
    setShowReview(true);
  };

  const totalAmount = selectedRows.reduce((total, row) => total + row.price, 0);

  return (
    <div>
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Review Your Order
        </Typography>
        {showReview && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.product_name}</TableCell>
                      <TableCell align="right">
                        ${row.price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    Total: ${totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={selectedRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
        <EmailSender
          recipientEmail={recipientEmail}
          selectedRows={selectedRows}
          setRecipientEmail={setRecipientEmail}
        />{" "}
       
        <Button
          onClick={handleCheckoutClick}
          variant="contained"
          color="primary"
        >
          Make View
        </Button>
      </Paper>
      <PDFGenerator selectedRows={selectedRows} />{" "}
      {/* Render the PDFGenerator component */}
    </div>
  );
};

export default BillingForm;
