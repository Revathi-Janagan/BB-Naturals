import React, { useState } from "react";
import { FaPlus ,FaStar} from "react-icons/fa";

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
            <button
              className={`btn ${
                hovered ? "btn-primary" : "btn-secondary"
              } rounded-circle`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sliders product-setting-icon"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
                />
              </svg>
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default RightHeader;
