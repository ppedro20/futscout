import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">FutScout</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/search">Player Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/stats">Player Stats</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/compare">Compare</Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-light" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
