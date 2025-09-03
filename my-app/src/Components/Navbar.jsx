import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="brand">Postnatal Support</div>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/resources">Resources</Link>
      </nav>
    </header>
  );
}
