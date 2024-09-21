import React, { useState } from 'react';
import './Movies.css'; // Import your CSS for styling

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Use environment variable

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Failed to fetch movies');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div className="movies-container">
      <h2>Movies Page</h2>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <ul className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              {/* Add more movie details or functionality as needed */}
            </li>
          ))
        ) : (
          <p className="no-results">No movies found</p>
        )}
      </ul>
    </div>
  );
};

export default Movies;
