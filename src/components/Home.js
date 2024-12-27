import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Home.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const Home = () => {
  const [query, setQuery] = useState('');
  const [beaches, setBeaches] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
   
    axios.get('http://localhost:5000/api/listbeaches')
      .then(response => {
        console.log('API Response:', response.data); 
        setBeaches(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching beach names:', error); 
        setError('Failed to load beach names');
        setLoading(false);
      });
  }, []);

 
  const filteredBeaches = beaches.filter(beach =>
    beach.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>{error}</p>;
  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex flex-column h-100">
        <div className="d-flex flex-column justify-content-center align-items-center flex-grow-0 mt-5">
          <input
            type="text"
            className="form-control mb-3 custom-search-box"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 overflow-auto">
          <ul className="list-group">
            {filteredBeaches.length > 0 ? (
              filteredBeaches.map((beach, index) => (
                <li key={index} className="list-group-item mt-3">
                  <Link to={`/beach/${encodeURIComponent(beach)}`}>{beach}</Link>
                </li>
              ))
            ) : (
              <li className="list-group-item">No beaches found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
