import React from "react";
import { FaBox, FaCashRegister, FaClipboardList, FaUsers } from "react-icons/fa";
import "./Sidenav.css";

const Sidenav = () => {
  return (
    <div
      id="sidenav-1"
      className="sidenav"
      role="navigation"
      data-mdb-hidden="true"
      data-mdb-accordion="true"
    >
      <ul className="sidenav-menu">
        <li className="sidenav-item">
          <a className="sidenav-link" href="/" title="Products">
            <FaBox className="sidenav-icon" />
            <span className="tooltip-text">Products</span>
          </a>
        </li>
        <li className="sidenav-item">
          <a className="sidenav-link" href="/pos" title="POS">
            <FaCashRegister className="sidenav-icon" />
            <span className="tooltip-text">POS</span>
          </a>
        </li>
        <li className="sidenav-item">
          <a className="sidenav-link" href="/order" title="Order">
            <FaClipboardList className="sidenav-icon" />
            <span className="tooltip-text">Order</span>
          </a>
        </li>
        <li className="sidenav-item">
          <a className="sidenav-link" href="/customer" title="Customer">
            <FaUsers className="sidenav-icon" />
            <span className="tooltip-text">Customer</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
