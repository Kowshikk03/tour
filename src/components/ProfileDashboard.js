// src/components/ProfileDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfileDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response)

        setUser(response.data);
      } catch (err) {
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <h2 className="text-center">Profile Dashboard</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Profile</h5>
          <p className="card-text"><strong>Name:</strong> {user.name}</p>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-primary" onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileDashboard;
