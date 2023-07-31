import React from "react";
import RightHeader from "./RightHeader";
import RightDiv from "./RightDiv";
import "./RightContent.css";

const RightContent = ({ selectedItems, onRemoveItem }) => {
  return (
    <div className="right-content-container">
      <RightHeader />
      <RightDiv selectedItems={selectedItems} onRemoveItem={onRemoveItem} />
    </div>
  );
};

export default RightContent;
