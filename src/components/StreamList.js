import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect hooks
import './StreamList.css'; // Import the CSS file for styling the component

// Main StreamList component
const StreamList = () => {
  // State to hold the movie input, list of movies, and a toggle for edit mode
  const [input, setInput] = useState(''); // Holds the current value of the movie input field
  const [movies, setMovies] = useState([]); // Stores the list of added movies
  const [isEditing, setIsEditing] = useState(false); // Indicates whether we are in edit mode
  const [currentMovie, setCurrentMovie] = useState(null); // Holds the movie currently being edited

  // This useEffect loads movies from localStorage when the component mounts
  useEffect(() => {
    const storedMovies = localStorage.getItem('movies'); // Retrieve 'movies' from localStorage
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies)); // If there are saved movies, parse them and set them to state
    }
  }, []); // Runs only on component mount

  // This useEffect saves the movies to localStorage whenever the movies state changes
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies)); // Save the current movies list to localStorage
    } else {
      localStorage.removeItem('movies'); // Clear localStorage if no movies are present
    }
  }, [movies]); // Runs whenever the movies array changes

  // Handler for when the user types in the input field
  const handleInputChange = (event) => {
    setInput(event.target.value); // Update the input state with the current input field value
  };

  // Function to add a new movie to the list
  const addMovie = () => {
    if (input.trim() === '') return; // Prevent adding if the input is empty
    const newMovie = { id: Date.now(), title: input, watched: false }; // Create a new movie object
    setMovies([...movies, newMovie]); // Add the new movie to the existing list
    setInput(''); // Clear the input field after adding
  };

  // Function to delete a movie by its ID
  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id); // Remove the movie with the matching ID
    setMovies(updatedMovies); // Update the state with the filtered list

    // Update localStorage with the new movie list
    localStorage.setItem('movies', JSON.stringify(updatedMovies)); // Save the updated movies list to localStorage
  };

  // Function to edit a movie
  const editMovie = (movie) => {
    setIsEditing(true); // Set editing mode to true
    setCurrentMovie(movie); // Set the movie currently being edited
    setInput(movie.title); // Pre-fill the input field with the movie's title
  };

  // Function to save the edited movie
  const saveMovie = () => {
    const updatedMovies = movies.map((movie) =>
      movie.id === currentMovie.id ? { ...movie, title: input } : movie
    ); // Update the movie title and save it
    setMovies(updatedMovies); // Update state with the new movies list
    localStorage.setItem('movies', JSON.stringify(updatedMovies)); // Update localStorage
    setIsEditing(false); // Exit editing mode
    setCurrentMovie(null); // Clear the current movie
    setInput(''); // Clear the input field
  };

  // Function to mark a movie as watched/unwatched
  const toggleWatched = (id) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ); // Toggle the watched status of the movie
    setMovies(updatedMovies); // Update the state
    localStorage.setItem('movies', JSON.stringify(updatedMovies)); // Update localStorage
  };

  return (
    <div className="streamlist-container">
      <div className="streamlist-content">
        <h2>My Movie Tracker</h2>
  
        {/* Input field and button for adding or saving a movie */}
        <div className="streamlist-input-container">
          <input
            type="text"
            placeholder="Enter movie title"
            value={input} // Bind the input field to the input state
            onChange={handleInputChange} // Update the input state on change
          />
          <button onClick={isEditing ? saveMovie : addMovie}>
            {isEditing ? 'Save' : 'Add'} {/* Show "Save" if editing, otherwise show "Add" */}
          </button>
        </div>
  
        {/* List of movies */}
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <span style={{ textDecoration: movie.watched ? 'line-through' : 'none' }}>
                {movie.title}
              </span>
              <button onClick={() => toggleWatched(movie.id)}>
                {movie.watched ? 'Unwatch' : 'Watched'}
              </button>
              <button onClick={() => editMovie(movie)}>Edit</button>
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamList;
