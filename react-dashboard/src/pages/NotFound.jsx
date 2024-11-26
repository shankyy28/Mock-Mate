// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', color: '#ffffff' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        You can go back to the <Link to="/" style={{ color: '#90caf9' }}>home page</Link>.
      </p>
    </div>
  );
};

export default NotFound;
