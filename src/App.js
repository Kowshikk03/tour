import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import BeachDetail from './components/BeachDetail'; 
import ProfileDashboard from './components/ProfileDashboard';
import EditProfile from './components/EditProfile';


const App = () => (
  <Router>
    <Routes>
      <Route path="/p" element={<ProfileDashboard />} /> 
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/beach/:name" element={<BeachDetail />} />
      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/edit-profile" element={<EditProfile />} />

    
    </Routes>
  </Router>
);
export default App;
