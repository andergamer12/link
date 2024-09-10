import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UrlForm from './UrlForm';
import UrlList from './UrlList';
import API_BASE_URL from '../config';

function UrlShortener() {
  const [urls, setUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/urls`);
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleShortenUrl = async (fullUrl) => {
    try {
      await axios.post(`${API_BASE_URL}/shorten`, { fullUrl });
      fetchUrls();
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleEditUrl = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedFields);
      setUrls(urls.map(url => url._id === id ? response.data : url));
    } catch (error) {
      console.error('Error editing URL:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Error al editar la URL');
      }
    }
  };

  const handleDeleteUrl = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setUrls(urls.filter(url => url._id !== id));
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando cambie la búsqueda
  };

  const filteredUrls = urls.filter(url =>
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular las URLs actuales para la página actual
  const indexOfLastUrl = currentPage * itemsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - itemsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Número total de páginas
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);

  return (
    <div className="UrlShortener" >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button className='volver-button'
          onClick={() => navigate('/app')} 
          style={{ marginRight: '10px' }}
        >
          Volver
        </button>
        <button className='logout-button' 
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
      <h1 style={{marginTop: 50}}>Acortador de Links</h1>
      
      
      <UrlForm onShortenUrl={handleShortenUrl} />
      <input
        type="text"
        placeholder="Buscar enlaces..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%', maxWidth: '600px' }}
      />
      <UrlList 
        urls={currentUrls} 
        onEditUrl={handleEditUrl} 
        onDeleteUrl={handleDeleteUrl} 
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

export default UrlShortener;
