import React from "react";
import Navbar from "./Navbar";
import "./HeaderDash.css";
import Sidenav from "./Sidenav";
import IconsNav from "./IconsNavbar";
import GridForDisplay from "./GridForDisplay";

const HeaderDash = () => {
  return (
    <header>
      {/* Header Top */}
      <div className="header-top text-center d-flex align-items-center">
        <div className="container">
          <div className="row">
            <h3 className="title-pos m-auto">Products - BB Naturals</h3>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
      <IconsNav />
      
      <GridForDisplay />

      
      

      {/* Sidenav */}
      <Sidenav />
    </header>
  );
};

export default HeaderDash;
