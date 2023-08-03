import React from "react";
import RightHeader from "./RightHeader";
import RightDiv from "./RightDiv";
import "./RightContent.css";

const RightContent = ({ selectedItems, onRemoveItem }) => {
  return (
    <div className="right-content-container">
      <RightHeader />
      {/* Pass 'selectedItems' as 'selectedRows' to the RightDiv component */}
      <RightDiv selectedRows={selectedItems} onRemoveItem={onRemoveItem} />
    </div>
  );
};

export default RightContent;
