import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRForm from './QRform';
import QRList from './QRList';
import API_BASE_URL from '../config';

function QRGenerator() {
  const [qrs, setQRs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQRs();
  }, []);

  const fetchQRs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/qr/urls`);
      setQRs(response.data);
    } catch (error) {
      console.error('Error fetching QR URLs:', error);
    }
  };

  const handleGenerateQR = async (fullUrl) => {
    try {
      await axios.post(`${API_BASE_URL}/qr/shorten`, { fullUrl });
      fetchQRs();
    } catch (error) {
      console.error('Error generating QR:', error);
    }
  };

  const handleEditQR = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/qr/${id}`, updatedFields);
      setQRs(qrs.map(qr => qr._id === id ? response.data : qr));
    } catch (error) {
      console.error('Error editing QR URL:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Error al editar el QR');
      }
    }
  };

  const handleDeleteQR = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/qr/${id}`);
      setQRs(qrs.filter(qr => qr._id !== id));
    } catch (error) {
      console.error('Error deleting QR URL:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredQRs = qrs.filter(qr =>
    qr.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastQR = currentPage * itemsPerPage;
  const indexOfFirstQR = indexOfLastQR - itemsPerPage;
  const currentQRs = filteredQRs.slice(indexOfFirstQR, indexOfLastQR);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredQRs.length / itemsPerPage);

  return (
    <div className="QRGenerator" >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button className='volver-button'
          onClick={() => navigate('/app')} 
          style={{  }}
        >
          Volver
        </button>
        <button className='logout-button' 
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
      <h1 style={{marginTop: 50}} >Generador de QR</h1>
      <QRForm onGenerateQR={handleGenerateQR} />
      <input
        type="text"
        placeholder="Buscar QR..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%', maxWidth: '600px' }}
        className='buscar'
      />
      <QRList 
        qrs={currentQRs} 
        onEditQR={handleEditQR} 
        onDeleteQR={handleDeleteQR} 
      />
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index + 1} className={currentPage === index + 1 ? 'active' : ''}>
            <a href="#!" onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QRGenerator;