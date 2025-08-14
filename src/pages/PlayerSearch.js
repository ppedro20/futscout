import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";

function Player() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [positions, setPositions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [teams, setTeams] = useState([]);

  const [filters, setFilters] = useState({
    position: "",
    country: "",
    team: "",
    Age: "",
    search: "",
  });

  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [availableAges, setAvailableAges] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 15;

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Fetch players
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        let query = supabase.from("players").select("*");

        if (filters.position) query = query.eq("position", filters.position);
        if (filters.country) query = query.eq("country_id", filters.country);
        if (filters.team) query = query.eq("team_id", filters.team);
        if (filters.search) query = query.ilike("name", `%${filters.search}%`);

        // Exact age filter
        if (filters.Age) {
          const today = new Date();
          const selectedAge = parseInt(filters.Age);

          // Calculate birthdate range for exact age
          const birthDateMax = new Date(today);
          birthDateMax.setFullYear(today.getFullYear() - selectedAge);

          const birthDateMin = new Date(today);
          birthDateMin.setFullYear(today.getFullYear() - selectedAge - 1);
          birthDateMin.setDate(birthDateMin.getDate() + 1);

          query = query.gte("birth_date", birthDateMin.toISOString().split("T")[0])
                       .lte("birth_date", birthDateMax.toISOString().split("T")[0]);
        }

        const { data, error } = await query.order("name", { ascending: true });
        if (error) throw error;
        setPlayers(data || []);
      } catch (error) {
        console.error("Error fetching players:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [filters]);

  // Fetch filter options once
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data: positionsData } = await supabase.from("players").select("position");
        setPositions([...new Set(positionsData.map(p => p.position))]);

        const { data: countriesData } = await supabase.from("countries").select("id, name");
        setCountries(countriesData || []);

        const { data: teamsData } = await supabase.from("teams").select("id, name");
        setTeams(teamsData || []);
      } catch (error) {
        console.error("Error fetching filters:", error.message);
      }
    };
    fetchFilters();
  }, []);

  // Update available ages whenever players change
  useEffect(() => {
    if (players.length > 0) {
      const ages = players.map(p => calculateAge(p.birth_date));
      const uniqueAges = [...new Set(ages)].sort((a, b) => a - b);
      setAvailableAges(uniqueAges);
    } else {
      setAvailableAges([]);
    }
  }, [players]);

  const calculateAge = (birthDate) =>
    birthDate ? Math.floor((new Date() - new Date(birthDate)) / (1000 * 60 * 60 * 24 * 365.25)) : "";

  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(players.length / playersPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearchTerm(value);
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
      setCurrentPage(1);
    }
  };

  const getCountryName = (id) => countries.find(c => c.id === id)?.name || "";
  const getTeamName = (id) => teams.find(t => t.id === id)?.name || "";

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4">Players</h2>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search player..."
              name="search"
              value={searchTerm}
              onChange={handleFilterChange}
            />
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
            >
              <option value="">All Positions</option>
              {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="">All Countries</option>
              {countries.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              name="team"
              value={filters.team}
              onChange={handleFilterChange}
            >
              <option value="">All Teams</option>
              {teams.sort((a, b) => a.name.localeCompare(b.name)).map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Exact Age Select */}
          <div className="col-md-2 mb-2">
            <select
              className="form-select"
              name="Age"
              value={filters.Age}
              onChange={handleFilterChange}
            >
              <option value="">Age</option>
              {availableAges.map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
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
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {currentPlayers.map(player => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{getCountryName(player.country_id)}</td>
                    <td>{getTeamName(player.team_id)}</td>
                    <td>{calculateAge(player.birth_date)}</td>
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
                <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Player;
