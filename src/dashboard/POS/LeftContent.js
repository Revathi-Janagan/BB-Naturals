import React from "react";
import LeftDiv from "./LeftDiv";

const LeftContent = ({ onAddToCart }) => {
  return (
    <div className="left-content-container left-part">
      <LeftDiv onAddToCart={onAddToCart} />
    </div>
  );
};

export default LeftContent;
