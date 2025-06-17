import React, { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        <h1>Welcome to Your Dashboard</h1>
        <p>This is your personal space. You can manage your profile, view your data, or customize your experience here.</p>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h2>Hello, User!</h2>
          <p>You are now logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
