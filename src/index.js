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

// Register the service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
