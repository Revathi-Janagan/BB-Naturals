
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFGenerator = ({ selectedRows }) => {
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
      <a href={generatePDF()} download="invoice.pdf">
        Download Invoice PDF
      </a>
    </div>
  );
};

export default PDFGenerator;
