import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";

function Compare() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all players once
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("players").select("*");
        if (error) throw error;
        setPlayers(data || []);
        setPlayerOptions(data || []);
      } catch (error) {
        console.error("Error fetching players:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const getCountryName = (id) => {
    const country = supabase.from("countries").select("id, name").eq("id", id).single();
    return country?.data?.name || "";
  };

  const getTeamName = (id) => {
    const team = supabase.from("teams").select("id, name").eq("id", id).single();
    return team?.data?.name || "";
  };

  const handleAddPlayer = (playerId) => {
    if (selectedPlayers.length >= 3) return;
    const player = players.find(p => p.id === parseInt(playerId));
    if (player && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleRemovePlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
  };

  return (
    <div>
      <Navbar />
      <main className="container my-5">
        <h2 className="mb-4 text-center">Compare Players</h2>
        <p className="text-center text-muted">Select up to 3 players to compare their stats side by side.</p>

        {/* Player Selection */}
        {selectedPlayers.length < 3 && (
          <div className="mb-4 d-flex justify-content-center">
            <select
              className="form-select w-auto"
              onChange={(e) => {
                handleAddPlayer(e.target.value);
                e.target.value = ""; // reset select
              }}
              defaultValue=""
            >
              <option value="" disabled>Select player...</option>
              {playerOptions
                .filter(p => !selectedPlayers.find(sp => sp.id === p.id))
                .map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.position})
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Selected Player Widgets */}
        <div className="d-flex gap-3 flex-wrap justify-content-center mb-5">
          {selectedPlayers.map(player => (
            <div
              key={player.id}
              className="card p-3 shadow-sm"
              style={{ width: "200px" }}
            >
              <h5 className="card-title">{player.name}</h5>
              <p className="card-text mb-1"><strong>Position:</strong> {player.position}</p>
              <p className="card-text mb-1"><strong>Country:</strong> {player.country_id}</p>
              <p className="card-text mb-2"><strong>Team:</strong> {player.team_id}</p>
              <button
                className="btn btn-sm btn-danger w-100"
                onClick={() => handleRemovePlayer(player.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        {selectedPlayers.length > 1 && (
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Stat</th>
                  {selectedPlayers.map(p => (
                    <th key={p.id}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Position</td>
                  {selectedPlayers.map(p => (
                    <td key={p.id}>{p.position}</td>
                  ))}
                </tr>
                <tr>
                  <td>Country</td>
                  {selectedPlayers.map(p => (
                    <td key={p.id}>{p.country_id}</td>
                  ))}
                </tr>
                <tr>
                  <td>Team</td>
                  {selectedPlayers.map(p => (
                    <td key={p.id}>{p.team_id}</td>
                  ))}
                </tr>
                {/* Add more stats here */}
              </tbody>
            </table>
          </div>
        )}

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Compare;
