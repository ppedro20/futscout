import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">FutScout</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/players">Players</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/matches">Matches</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5">
        <h1 className="text-center">Welcome to FutScout</h1>
        <p className="text-center">
          Track players, compare stats, and scout talent efficiently.
        </p>

        {/* Example cards */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Player Stats</h5>
                <p className="card-text">View detailed statistics of players.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Match Analysis</h5>
                <p className="card-text">Analyze match performance and strategies.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Scouting</h5>
                <p className="card-text">Scout and track promising talent worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        &copy; 2025 FutScout. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
