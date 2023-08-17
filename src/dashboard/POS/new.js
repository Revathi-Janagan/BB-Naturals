import React, { useRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "../../config/axios"; // Import axios for making API requests

const BillingForm = ({ selectedRows }) => {
  const totalPrice = selectedRows.reduce((total, row) => total + row.price, 0);
  const pdfRef = useRef();

  const generatePDFAndSendEmail = async () => {
    try {
      const response = await axios.post(
        "/api/pos/generate-pdf-and-send-email",
        {
        //   selectedRows: selectedRows,
          recipientEmail: "srevathisona@example.com", 
        }
      );

      // Once the email is sent, display the PDF in the iframe
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      pdfRef.current.src = blobUrl;
    } catch (error) {
      console.error("Error generating PDF and sending email:", error);
    }
  };

  return (
    <div className="billing-form-container">
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "24px" }}>
        <Typography variant="h4" gutterBottom>
          Your Order
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {selectedRows.map((row) => (
            <li
              key={row.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "8px",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                {row.product_name}
              </Typography>
              <Typography>${row.price.toFixed(2)}</Typography>
            </li>
          ))}
        </ul>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={generatePDFAndSendEmail}
          >
            Proceed to Payment (${totalPrice.toFixed(2)})
          </Button>
        </Grid>
      </Paper>
      <iframe
        ref={pdfRef}
        title="Billing PDF"
        style={{ width: "100%", height: "500px", marginTop: "20px" }}
      ></iframe>
    </div>
  );
};

export default BillingForm;
