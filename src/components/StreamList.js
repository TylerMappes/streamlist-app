import React, { useState, useEffect } from 'react'; // Import necessary hooks
import './StreamList.css'; // Import CSS file for styling

// Functional component for the "StreamList" page
const StreamList = () => {
  const [movieTitle, setMovieTitle] = useState(''); // State for movie input
  const [movieList, setMovieList] = useState([]); // State for storing movies
  const [editingIndex, setEditingIndex] = useState(null); // State for keeping track of the movie being edited
  const [editedTitle, setEditedTitle] = useState(''); // State for the edited title

  // Load movies from local storage when the component mounts
  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovieList(JSON.parse(storedMovies)); // Parse and set the stored movies
    }
  }, []);

  // Save the movie list to local storage whenever the movie list changes
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movieList));
  }, [movieList]);

  // Handler for when the user types in the input field
  const handleInputChange = (event) => {
    setMovieTitle(event.target.value); // Update the input value state
  };

  // Handler for submitting a new movie to the list
  const handleAddMovie = () => {
    if (movieTitle.trim()) { // Ensure the movie title is not empty
      setMovieList([...movieList, { title: movieTitle, watched: false }]); // Add new movie to the list
      setMovieTitle(''); // Clear the input field
    }
  };

  // Handler for marking a movie as watched
  const handleMarkAsWatched = (index) => {
    const updatedList = [...movieList];
    updatedList[index].watched = !updatedList[index].watched; // Toggle the "watched" status
    setMovieList(updatedList); // Update the movie list
  };

  // Handler for deleting a movie
  const handleDeleteMovie = (index) => {
    const updatedList = movieList.filter((_, i) => i !== index); // Remove the movie at the specified index
    setMovieList(updatedList); // Update the movie list
  };

  // Handler for editing a movie
  const handleEditMovie = (index) => {
    setEditingIndex(index); // Set the movie being edited
    setEditedTitle(movieList[index].title); // Set the current title in the edit field
  };

  // Handler for saving an edited movie
  const handleSaveEdit = () => {
    const updatedList = [...movieList];
    updatedList[editingIndex].title = editedTitle; // Update the title of the movie being edited
    setMovieList(updatedList); // Update the movie list
    setEditingIndex(null); // Exit edit mode
  };

  return (
    <div className="streamlist-container">
      <h2>StreamList Page</h2> {/* Page Title */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a movie title..." // Placeholder text
          value={movieTitle} // Bind input to movieTitle state
          onChange={handleInputChange} // Update movieTitle state on input change
          className="movie-input"
        />
        <button onClick={handleAddMovie} className="submit-button">
          Add Movie
        </button> {/* Button to submit new movie */}
      </div>

      <ul className="movie-list">
        {movieList.map((movie, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                />
                <button onClick={handleSaveEdit} className="save-button">
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: movie.watched ? 'line-through' : 'none', // Line-through if watched
                  }}
                >
                  {movie.title}
                </span>
                <button onClick={() => handleMarkAsWatched(index)} className="watched-button">
                  {movie.watched ? 'Unwatch' : 'Watched'}
                </button>
                <button onClick={() => handleEditMovie(index)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteMovie(index)} className="delete-button">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList; // Export component to be used in the app
