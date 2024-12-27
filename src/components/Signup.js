import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      navigate('/signin');
  
    } catch (err) {
      console.error(err);
      alert('Error signing up');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
    <form onSubmit={handleSubmit} className="container p-4 border rounded bg-light shadow-sm" style={{ maxWidth: '500px' }}>
    <div className="text-center mb-4">
          <h2>SIGN UP</h2>
        </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
      <div className="text-center mt-3">
        I already have an account <a href="signin">Sign In</a>
      </div>
    </form>
  </div>
  );
};

export default Signup;
