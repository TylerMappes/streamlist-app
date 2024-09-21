
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome library
import App from './App'; // Main App component

// Create the root and render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

