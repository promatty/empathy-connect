import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS
import Home from './components/Home';
import Community from './components/Community';
import Post from './components/Post';
import Header from './components/Header';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>
);