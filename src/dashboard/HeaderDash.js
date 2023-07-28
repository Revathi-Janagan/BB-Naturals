import React from "react";
import Navbar from "./Navbar";
import "./HeaderDash.css";
import Sidenav from "./Sidenav";
import IconsNav from "./IconsNavbar";


const HeaderDash = ({pageName}) => {
  return (
    <header>
      {/* Header Top */}
      <div className="header-top text-center d-flex align-items-center">
        <div className="container">
          <div className="row">
            <h3 className="title-pos m-auto">{pageName} - BB Naturals</h3>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
      <IconsNav />
      
     

      
      

      {/* Sidenav */}
      <Sidenav />
    </header>
  );
};

export default HeaderDash;
