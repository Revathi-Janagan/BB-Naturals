import React, { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";

import "./RightHeader.css";

const RightHeader = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light right-navbar">
      <div className="container justify-content-center justify-content-md-between">
        <ul className="navbar-nav flex-row">
          <div className="d-flex align-items-center">
            <form className="form-inline">
              <div className="input-group">
                <h4>Customer</h4>
                <button
                  className="btn btn-outline custom-button-right-header"
                  type="submit"
                >
                  <FaStar className="star-fill-icon" /> {""}Featured
                </button>
              </div>
            </form>
          </div>
          <div
            className={`d-flex align-items-center plus-icon ${
              hovered ? "hovered" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`btn ${
                hovered ? "btn-primary" : "btn-secondary"
              } rounded-circle`}
            >
              <FaPlus className="mr-2" />
            </button>
            
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default RightHeader;
