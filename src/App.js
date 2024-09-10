import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UrlShortener from './components/UrlShortener';
import QRGenerator from './components/QRGenerator';
import imagen from './Logo-negro.png';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route path="/shortener" element={
            <ProtectedRoute>
              <UrlShortener />
            </ProtectedRoute>
          } 
        />
        <Route path="/qr" element={
            <ProtectedRoute>
              <QRGenerator />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="home-page">
      <img src={imagen} alt='logo' height={'120px'} width={'120px'} className="logo-negro"></img>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      <div className="home-page-content">
        <div className="left-half">
          <button 
            className="button-app button-black" 
            onClick={() => navigate('/shortener')}
          >
            Ir al Acortador de Links
          </button>
        </div>
        <div className="right-half">
          <button 
            className="button-app button-white" 
            onClick={() => navigate('/qr')}
          >
            Ir al Generador de QR
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
