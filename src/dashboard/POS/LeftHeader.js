import React from "react";
import './LeftHeader.css';
import { FaStar, FaDollarSign, FaBox, FaTag } from "react-icons/fa";

const LeftHeader = () => {
  return (
    <div className="left-header-container">
      <div className="navbar custom-align-space-left">
        <button className="custom-button-nav-left" type="submit">
          <FaStar className="star-fill-icon" />Featured
        </button>
        <button className="custom-button-nav-left" type="submit">
          <FaDollarSign className="on-sale-icon" />On Sale
        </button>
        <button className="custom-button-nav-left" type="submit">
          <FaBox className="on-select-category-icon" />Select Category
        </button>
        <button className="custom-button-nav-left" type="submit">
          <FaTag className="on-tag-icon" />Select Tag
        </button>
      </div>
    </div>
  );
};

export default LeftHeader;
