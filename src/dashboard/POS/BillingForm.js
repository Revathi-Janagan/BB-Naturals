import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
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

const BillingForm = ({ selectedRows }) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showReview, setShowReview] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false); // New state for email sending success

  useEffect(() => {
    if (emailSentSuccess) {
      const timeoutId = setTimeout(() => {
        setEmailSentSuccess(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [emailSentSuccess]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCheckoutClick = () => {
    setShowReview(true); // Set the state to show the review when "Checkout" is clicked
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text("Your Order", 15, 15);

    const tableData = selectedRows.map((row) => [
      row.product_name,
      `$${row.price.toFixed(2)}`,
    ]);

    pdf.autoTable({
      head: [["Product Name", "Price"]],
      body: tableData,
      startY: 30,
      styles: { fontSize: 12, valign: "middle", halign: "center" },
      columnStyles: { 0: { halign: "left" }, 1: { halign: "right" } },
    });

    const totalPrice = selectedRows.reduce(
      (total, row) => total + row.price,
      0
    );
    pdf.text(
      `Total Price: $${totalPrice.toFixed(2)}`,
      15,
      pdf.autoTable.previous.finalY + 10
    );

    return pdf.output("datauristring");
  };

  const sendEmail = async () => {
    const pdfBase64 = generatePDF();

    const emailData = {
      name: "Revathi",
      email: recipientEmail,
      pdfBase64: pdfBase64,
    };

    try {
      const response = await axios.post("/api/pos/send-email", emailData);
      console.log(response.data.message);
      setEmailSentSuccess(true);
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
        <input
          type="email"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <Button onClick={sendEmail} variant="contained" color="primary">
          Send Email
        </Button>
        <Button
          onClick={handleCheckoutClick}
          variant="contained"
          color="primary"
        >
          Make View
        </Button>
      </Paper>
      {emailSentSuccess && (
        <h4 style={{ color: "green" }}>Email sent successfully!</h4>
      )}

      <a href={generatePDF()} download="invoice.pdf">
        Download Invoice PDF
      </a>
    </div>
  );
};

export default BillingForm;
