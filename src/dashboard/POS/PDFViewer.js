import React from "react";

const PDFViewer = ({ content }) => {
  return (
    <div className="pdf-viewer">
      <embed
        src={`data:application/pdf;base64,${content}`}
        type="application/pdf"
        width="100%"
        height="500px"
      />
    </div>
  );
};

export default PDFViewer;
