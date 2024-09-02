// src/components/StreamList.js
import React, { useState } from 'react';
import './StreamList.css';

const StreamList = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="streamlist-container">
      <h2>StreamList Page</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={input}
        onChange={handleInputChange}
        className="streamlist-input"
      />
    </div>
  );
};

export default StreamList;
