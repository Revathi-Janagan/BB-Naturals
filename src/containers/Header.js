import React from "react";
import HeaderLogo from "../components/Images/logo-altered-300x300.jpg";
import "./Header.css";

const Header = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="d-flex justify-content-start">
          <img
            className="custom-logo"
            src={HeaderLogo}
            alt="Logo"
            width="125"
            height="125"
          />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse custom-nav" id="navbarNav">
          
          <div className="d-flex ms-auto">
            <button type="button" className="btn btn-link custom-btn">
              Home
            </button>
            <button type="button" className="btn btn-link custom-btn">
              About
            </button>
            <button type="button" className="btn btn-link custom-btn">
              Services
            </button>
            <button type="button" className="btn btn-link custom-btn">
              Portfolio
            </button>
            <button type="button" className="btn btn-link custom-btn">
              Contact
            </button>
            <button type="button" className="btn btn-link custom-btn-call">
              +91 987 456 1230
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
