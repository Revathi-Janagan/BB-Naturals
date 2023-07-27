import React from "react";
import './IconsNavbar.css';
import { FaStar,FaTag,FaDollarSign,FaBox   } from "react-icons/fa";

const IconsNavbar = () => {
  return (
    <div>
      <nav className="navbar bg-light custom-align-space">
        <div className="container-fluid ">
          <form className="d-flex align-buttons" role="search">
            <button className="btn btn-outline custom-button-nav" type="submit">
            <FaStar className="star-fill-icon" /> {""}Featured 
              </button>
            <button className="btn btn-outline custom-button-nav" type="submit">
            <FaDollarSign className="on-sale-icon" />{""}On Sale
            </button>
            <button className="btn btn-outline custom-button-nav" type="submit">
            <FaBox className="on-select-category-icon" />{""}Select Category
            </button>
            <button className="btn btn-outline custom-button-nav" type="submit">
            <FaTag className="on-tag-icon" />{""} Select Tag
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default IconsNavbar;
