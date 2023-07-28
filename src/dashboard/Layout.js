import React from "react";
import HeaderDash from "./HeaderDash";


const Layout = ({ pageName, children }) => {
  return (
    <div className="layout">
      <HeaderDash pageName={pageName} />

      <div className="page-content">{children}</div>
    </div>
  );
};

export default Layout;
