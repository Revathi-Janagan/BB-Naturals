// LeftHeader.js
import React from "react";
import './LeftHeader.css';
import { FaStar, FaTag, FaDollarSign, FaBox } from "react-icons/fa";

const LeftHeader = () => {
  return (
    <div>
      <nav className="navbar bg-light custom-align-space-left">
        <div className="container-fluid">
          <form className="d-flex align-items-center">
            <button className="btn btn-outline custom-button-nav-left" type="submit">
              <FaStar className="star-fill-icon" />Featured
            </button>
            <button className="btn btn-outline custom-button-nav-left" type="submit">
              <FaDollarSign className="on-sale-icon" />On Sale
            </button>
            <button className="btn btn-outline custom-button-nav-left" type="submit">
              <FaBox className="on-select-category-icon" />Select Category
            </button>
            <button className="btn btn-outline custom-button-nav-left" type="submit">
              <FaTag className="on-tag-icon" />Select Tag
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default LeftHeader;
