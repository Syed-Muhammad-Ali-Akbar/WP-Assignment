import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
