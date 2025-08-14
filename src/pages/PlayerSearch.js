import React from "react";
import Navbar from "../components/Navbar";

function PlayerSearch() {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4">Player Search</h2>
        {/* Filters */}
        <div className="row mb-3">
          <div className="col-md-4 mb-2">
            <select className="form-select">
              <option>Filter by Position</option>
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </select>
          </div>
          <div className="col-md-4 mb-2">
            <select className="form-select">
              <option>Filter by Country</option>
              <option>Brazil</option>
              <option>Spain</option>
              <option>Germany</option>
            </select>
          </div>
          <div className="col-md-4 mb-2">
            <select className="form-select">
              <option>Filter by League</option>
              <option>Premier League</option>
              <option>La Liga</option>
              <option>Serie A</option>
            </select>
          </div>
        </div>
        {/* TODO: Add player list/table */}
      </div>
    </div>
  );
}

export default PlayerSearch;
