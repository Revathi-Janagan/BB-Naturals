import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BillingForm = ({ selectedRows }) => {
  const totalPrice = selectedRows.reduce((total, row) => total + row.price, 0);

  const generatePDF = () => {
    const pdf = new jsPDF();
    const tableColumnWidths = [100, 50]; // Adjust the column widths as needed
    const tableHeaders = ["Product", "Price"];
    let yPosition = 30;
  
    pdf.setFontSize(20);
    pdf.text("Your Order", 105, 15);
  
    const tableData = selectedRows.map((row) => [
      row.product_name,
      `$${row.price.toFixed(2)}`,
    ]);
  
    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: yPosition,
      margin: { top: 20 },
      columnStyles: { 0: { cellWidth: tableColumnWidths[0] } },
    });
  
    yPosition = pdf.previousAutoTable.finalY + 10;
  
    pdf.text(`Total Price: $${totalPrice.toFixed(2)}`, 30, yPosition);
  
    const fileName = "billing_form.pdf";
    const options = {
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    };
  
    pdf.save(fileName, options);
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
    </div>
  );
};

export default BillingForm;
