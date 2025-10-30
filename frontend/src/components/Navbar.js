import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Superbryn Analytics</div>
      <div className="navbar-links">
        <a href="#">Dashboard</a>
        <a href="#">Reports</a>
        <a href="#">Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
