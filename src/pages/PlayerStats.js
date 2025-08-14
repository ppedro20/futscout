import React from "react";
import Navbar from "../components/Navbar";

function PlayerStats() {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4">Player Stats</h2>
        {/* TODO: Add stats table or cards */}
        <p className="text-muted">Statistics of players will appear here.</p>
      </div>
    </div>
  );
}

export default PlayerStats;
