import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect hooks for state management and side effects
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
    }
  }, [movies]); // Runs whenever the `movies` array changes

  // Handler for when the user types in the input field
  const handleInputChange = (event) => {
    setInput(event.target.value); // Update the input state with the current input field value
  };

  // Function to add a new movie to the list
  const addMovie = () => {
    if (input.trim() === '') return; // Prevent adding if the input is empty
    const newMovie = { id: Date.now(), title: input, watched: false }; // Create a new movie object with unique ID and watched status
    setMovies([...movies, newMovie]); // Add the new movie to the existing list
    setInput(''); // Clear the input field after adding
  };

  // Function to delete a movie by its ID
  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id); // Remove the movie with the matching ID
    setMovies(updatedMovies); // Update the state with the filtered list
  };

  // Function to edit a movie
  const editMovie = (movie) => {
    setIsEditing(true); // Set editing mode to true
    setCurrentMovie(movie); // Set the movie currently being edited
    setInput(movie.title); // Pre-fill the input field with the movie's title
  };

  // Function to save the edited movie
  const saveMovie = () => {
    setMovies(
      movies.map((movie) =>
        movie.id === currentMovie.id ? { ...movie, title: input } : movie
      )
    ); // Update the movie title and save it
    setIsEditing(false); // Exit editing mode
    setCurrentMovie(null); // Clear the current movie
    setInput(''); // Clear the input field
  };

  // Function to mark a movie as watched/unwatched
  const toggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    ); // Toggle the watched status of the movie
  };

  return (
    <div className="streamlist-container">
      <h2>StreamList</h2>

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
            {/* Movie title and watched status */}
            <span style={{ textDecoration: movie.watched ? 'line-through' : 'none' }}>
              {movie.title}
            </span>
            {/* Button to toggle the watched status */}
            <button onClick={() => toggleWatched(movie.id)}>
              {movie.watched ? 'Unwatch' : 'Watched'}
            </button>
            {/* Button to edit the movie */}
            <button onClick={() => editMovie(movie)}>Edit</button>
            {/* Button to delete the movie */}
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
