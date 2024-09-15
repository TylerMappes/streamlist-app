import React, { useState } from 'react'; // Import useState hook for managing state
import './StreamList.css'; // Import CSS file for styling

// Functional component for the "StreamList" page
const StreamList = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input value

  // Handler for when the user types in the search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm state with the input value
  };

  return (
    <div className="streamlist-container">
      <h2>StreamList Page</h2> {/* Page Title */}
      <div className="search-container">
        <i className="fas fa-search search-icon"></i> {/* Search icon */}
        <input
          type="text"
          placeholder="Search for content..." // Placeholder text
          value={searchTerm} // Bind input to searchTerm state
          onChange={handleSearchChange} // Update searchTerm state on input change
          className="search-bar"
        />
      </div>
    </div>
  );
};

export default StreamList; // Export component to be used in the app
