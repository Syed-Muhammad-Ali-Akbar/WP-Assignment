import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Keep using this for styling

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [popup, setPopup] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      setPopup(res.data.message || 'Login successful!');
      
      // ✅ Store login status
      localStorage.setItem("isLoggedIn", "true");
  
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setPopup(err.response?.data?.error || 'Login failed');
    }
  };
  

  return (
    <div className="page-container">
      <div className="left-panel">
        <h1>Welcome Back</h1>
        <p>Log in to access your dashboard and explore our features.</p>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
          </form>
          {popup && <p style={{ color: popup.includes('success') ? 'green' : 'red', textAlign: 'center' }}>{popup}</p>}
          <div className="redirect-link">
            Don't have an account? <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}
