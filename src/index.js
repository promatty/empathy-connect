import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS
import Home from './components/Home';
import Community from './components/Community';
import Post from './components/Post';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/community/:id" element={<Community />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>
);