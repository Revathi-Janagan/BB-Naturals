// EmailSender.js
import React, { useState } from "react";
import axios from "../../../config/axios";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";


const EmailSender = ({ recipientEmail, selectedRows, setRecipientEmail  }) => {
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

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

  return (
    <div>
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <Button onClick={sendEmail} variant="contained" color="primary">
        Send Email
      </Button>
      {emailSentSuccess && (
        <h4 style={{ color: "green" }}>Email sent successfully!</h4>
      )}
    </div>
  );
};

export default EmailSender;
