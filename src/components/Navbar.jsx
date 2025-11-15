import React from "react";
import { FaStarOfLife } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <FaStarOfLife className="navbar-icon" />
          <h1 className="navbar-title">My Notes</h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;