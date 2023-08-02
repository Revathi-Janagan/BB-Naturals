import React from "react";
import HeaderDash from "./HeaderDash";
import "./Layout.css";

const Layout = ({ pageName, children }) => {
  return (
    <div className="layout"   >
      <HeaderDash pageName={pageName} />

      <div className="page-content">{children}</div>
    </div>
  );
};

export default Layout;
