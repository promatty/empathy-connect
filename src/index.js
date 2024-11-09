import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Community from './components/Community';
import Post from './components/Post';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community/:id" element={<Community />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  </React.StrictMode>
);