import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";

function Player() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [positions, setPositions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);

  const [filters, setFilters] = useState({
    position: "",
    country: "",
    league: "",
    search: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 15;

  // Fetch filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data: positionsData } = await supabase.from("players").select("position");
        setPositions([...new Set(positionsData.map(p => p.position))].sort((a, b) => a.localeCompare(b)));

        const { data: countriesData } = await supabase.from("countries").select("name");
        setCountries(countriesData.map(c => c.name).sort((a, b) => a.localeCompare(b)));

        const { data: leaguesData } = await supabase.from("leagues").select("name");
        setLeagues(leaguesData.map(l => l.name).sort((a, b) => a.localeCompare(b)));
      } catch (error) {
        console.error("Error fetching filters:", error.message);
      }
    };
    fetchFilters();
  }, []);

  // Fetch players based on filters
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      let query = supabase.from("players").select("*");

      if (filters.position) query = query.eq("position", filters.position);
      if (filters.country) query = query.eq("country", filters.country);
      if (filters.league) query = query.eq("league", filters.league);
      if (filters.search) query = query.ilike("name", `%${filters.search}%`);

      const { data, error } = await query.order("name", { ascending: true });
      if (error) throw error;
      setPlayers(data || []);
      setCurrentPage(1); // Reset page on new search
    } catch (error) {
      console.error("Error fetching players:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(players.length / playersPerPage);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">Players</h2>

        {/* Filters */}
        <div className="row mb-3">
          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
              size={1} // Show only 1 option initially
            >
              <option value="">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              size={1}
            >
              <option value="">All Countries</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              name="league"
              value={filters.league}
              onChange={handleFilterChange}
              size={1}
            >
              <option value="">All Leagues</option>
              {leagues.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search by name"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <button className="btn btn-dark" onClick={fetchPlayers}>Search</button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Country</th>
                  <th>Team</th>
                  <th>League</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {currentPlayers.map(player => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.country}</td>
                    <td>{player.team}</td>
                    <td>{player.league}</td>
                    <td>{player.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav>
            <ul className="pagination justify-content-center mt-4">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Player;
