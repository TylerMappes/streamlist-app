
import React, { useState } from 'react';
import './StreamList.css';

const StreamList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="streamlist-container">
      <h2>StreamList Page</h2>
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search for content..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
    </div>
  );
};

export default StreamList;
