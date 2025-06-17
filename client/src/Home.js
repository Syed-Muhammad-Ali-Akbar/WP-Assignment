// src/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // We'll style this next

export default function Home() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      alert(res.data.message || "Login successful");

      // Redirect to dashboard after login
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <h1>Welcome to Our Platform</h1>
        <p>Track tasks, manage accounts, and get the most out of your productivity.</p>
        <p>Start by logging in or creating a new account to begin your journey.</p>
      </div>

      <div className="right-section">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <p className="register-link">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>Create New</span>
          </p>
        </form>
      </div>
    </div>
  );
}
