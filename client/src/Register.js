import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Submit form logic here
    alert("Registered successfully (fake)");
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        <h1>Join Us</h1>
        <p>Create your account and start exploring the full experience.</p>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
            <input type="text" name="contact" placeholder="Contact Number" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            <button type="submit">Register</button>
          </form>
          <div className="redirect-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
