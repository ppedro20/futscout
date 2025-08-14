import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";

function Home() {
  const [stats, setStats] = useState({
    players: 0,
    teams: 0,
    leagues: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Count players
      const { count: playersCount } = await supabase
        .from("players")
        .select("*", { count: "exact" });

      // Count teams
      const { count: teamsCount } = await supabase
        .from("teams")
        .select("*", { count: "exact" });

      // Count leagues
      const { count: leaguesCount } = await supabase
        .from("leagues")
        .select("*", { count: "exact" });

      setStats({
        players: playersCount || 0,
        teams: teamsCount || 0,
        leagues: leaguesCount || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-light text-center py-5">
        <h1 className="display-5 fw-bold">Welcome to FutScout</h1>
        <p className="lead text-muted">Explore players, stats, and comparisons.</p>
      </div>

      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Players</h5>
                <p className="card-text display-6">{stats.players}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Teams</h5>
                <p className="card-text display-6">{stats.teams}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Leagues</h5>
                <p className="card-text display-6">{stats.leagues}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
