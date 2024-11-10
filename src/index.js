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
import Login from './components/Login';
import Profile from './components/Profile'
import PostForm from './components/PostForm';

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Header />} 
      <div className="flex flex-1">
        {!isLoginPage && <Sidebar />} 
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/createPost" element={<PostForm />} /> 
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
      <App /> 
    </Router>
  </React.StrictMode>
);
