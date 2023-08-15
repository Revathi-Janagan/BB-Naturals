import React, { useRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BillingForm = ({ selectedRows }) => {
  const totalPrice = selectedRows.reduce((total, row) => total + row.price, 0);
  const pdfRef = useRef();

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

    pdf.text(
      `Total Price: $${totalPrice.toFixed(2)}`,
      15,
      pdf.autoTable.previous.finalY + 10
    );

    const blobUrl = URL.createObjectURL(pdf.output("blob"));
    pdfRef.current.src = blobUrl;
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
            onClick={generatePDF}
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
