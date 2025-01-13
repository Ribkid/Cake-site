import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Services from './pages/Services';
import About from './pages/About';
import Music from './pages/Music';
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/music" element={<Music />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Services />} />
      </Routes>
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;