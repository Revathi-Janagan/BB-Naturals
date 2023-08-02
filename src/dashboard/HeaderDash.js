import React from "react";
import Navbar from "./Navbar";
import "./HeaderDash.css";
import Sidenav from "./Sidenav";
import IconsNav from "./IconsNavbar";

const HeaderDash = ({ pageName }) => {
  return (
    <header>
      <div className="header-top text-center d-flex align-items-center " >
        {/* //style={{marginLeft : "-100px", width:"114%"}} */}
        <div className="container header-container">
          <h3 className="title-pos m-auto">{pageName} - BB Naturals</h3>
        </div>
      </div>

      <Navbar />
      <IconsNav />

      <Sidenav />
    </header>
  );
};

export default HeaderDash;
