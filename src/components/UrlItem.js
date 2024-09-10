import React, { useState } from 'react';
import StatsModal from './StatsModal';
import API_BASE_URL from '../config';

function UrlItem({ url, onEditUrl, onDeleteUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');

  const handleEdit = () => {
    const newUrl = prompt('Nueva URL:', url.fullUrl);
    if (newUrl) {
      onEditUrl(url._id, { fullUrl: newUrl });
    }
  };

  const handleEditShortUrl = () => {
    const newShortUrl = prompt('Nuevo código corto (4 caracteres):', url.shortUrl);
    if (newShortUrl) {
      if (newShortUrl.length <2) {
        alert('El código corto debe tener mínimo 2 caracteres.');
        return;
      }
      onEditUrl(url._id, { shortUrl: newShortUrl });
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta URL?')) {
      onDeleteUrl(url._id);
    }
  };

  const handleShowStats = () => {
    const processedStats = url.clicks.map(click => {
      const ip = click.ip || 'Desconocido';
      const fecha = click.timestamp ? new Date(click.timestamp).toISOString() : 'Desconocido';
      
      let navegador = 'Desconocido';
      let sistemaOperativo = 'Desconocido';
      try {
        const userAgentData = JSON.parse(click.userAgent);
        navegador = userAgentData.browser?.name || 'Desconocido'; 
        sistemaOperativo = userAgentData.os?.name || 'Desconocido';
      } catch (error) {
        console.error('Error parsing userAgent:', error);
      }

      return {
        ip,
        fecha,
        navegador,
        sistemaOperativo
      };
    });

    setStats(processedStats);
    setIsModalOpen(true);
  };

  const handleCopyLink = () => {
    const fullShortUrl = `${API_BASE_URL}/${url.shortUrl}`;
    navigator.clipboard.writeText(fullShortUrl).then(() => {
      setCopyMessage('Enlace copiado!');
      setTimeout(() => setCopyMessage(''), 2000);
    }, (err) => {
      console.error('Error al copiar: ', err);
      setCopyMessage('Error al copiar');
    });
  };

  return (
    <li className="qr-item">
      <a 
        href={`${API_BASE_URL}/${url.shortUrl}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className='qr-url'
      >
        {url.shortUrl}
      </a>
      {copyMessage && <span style={{ color: 'green', marginLeft: '10px', marginRight: '10px', fontSize: '20px' }}>{copyMessage}</span>}
      <div className='qr-buttons'>
        <button className='ver' onClick={handleShowStats}>Ver estadísticas</button>
        <button className='copiar' onClick={handleCopyLink}>Copiar</button>
        <button className='editar' onClick={handleEdit}>Editar URL</button>
        <button className='editar-corto' onClick={handleEditShortUrl}>Editar código</button>
        <button className='eliminar' onClick={handleDelete}>Eliminar</button>
      </div>
      
      <StatsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stats={stats}
        totalClicks={url.clicks.length}
      />
    </li>
  );
}

export default UrlItem;