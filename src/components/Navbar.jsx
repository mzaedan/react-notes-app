import React from "react";
import { FaStarOfLife, FaCog } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <FaStarOfLife className="navbar-icon" />
          <h1 className="navbar-title">My Notes</h1>
        </div>
        <button className="navbar-settings">
          <FaCog />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
