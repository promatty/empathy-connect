import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css'; // Import Tailwind CSS
import Home from './components/Home';
import Community from './components/Community';
import Post from './components/Post';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './components/Login'; // Import the Login page

// Create a component to conditionally render Header and Sidebar based on the current route
function App() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Header />} {/* Only render Header if not on login page */}
      <div className="flex flex-1">
        {!isLoginPage && <Sidebar />} {/* Only render Sidebar if not on login page */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App /> {/* Render the App component which contains the conditional logic */}
    </Router>
  </React.StrictMode>
);
