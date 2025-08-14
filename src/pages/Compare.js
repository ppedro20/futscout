import React from "react";
import Navbar from "../components/Navbar";

function Compare() {
  return (
    <div>
      <Navbar />
      <main className="container my-5">
        <h2 className="mb-4 text-center">Compare Players</h2>
        <p className="text-center text-muted">Select two or more players to compare their stats side by side.</p>
      </main>
    </div>
  );
}

export default Compare;
