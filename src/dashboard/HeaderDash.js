import { createContext, useContext, useState} from "react";
import Navbar from "./Navbar";
import "./HeaderDash.css";
import Sidenav from "./Sidenav";
import IconsNav from "./IconsNavbar";
import { UserContext } from "../App";

const HeaderDash = ({ pageName }) => {
  const user = useContext(UserContext);
  return (
    <header>
      <div className="header-top text-center d-flex align-items-center">
        <div className="container header-container">
          <h3 className="title-pos m-auto">{pageName} - BB Naturals</h3>
        </div>
        <div className="top-right">
          {user && user.username ? (
            <span>Welcome,   {user?.user?.name}</span>
          ) : (
            <span>User not found</span>
          )}
        </div>
      </div>
      <Navbar />
      <IconsNav />
      <Sidenav />
    </header>
  );
};


export default HeaderDash;
