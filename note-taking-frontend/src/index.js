import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from './context/ApiContext'; // Import the context provider

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped with the context provider
root.render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

// Optional: Measure performance
reportWebVitals();