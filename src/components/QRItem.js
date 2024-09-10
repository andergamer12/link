import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import StatsModal from './StatsModal';
import API_BASE_URL from '../config';

function QRItem({ qr, onEditQR, onDeleteQR }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, `${API_BASE_URL}/qr/${qr._id}`, (error) => {
        if (error) console.error('Error generating QR Code:', error);
      });
    }
  }, [qr._id]);
  

  const handleEdit = () => {
    const newUrl = prompt('Nueva URL:', qr.fullUrl);
    if (newUrl) {
      onEditQR(qr._id, { fullUrl: newUrl });
    }
  };

  const handleEditShortUrl = () => {
    const newShortUrl = prompt('Nuevo código corto (4 caracteres):', qr.shortUrl);
    if (newShortUrl) {
      if (newShortUrl.length <2) {
        alert('El código corto debe tener mínimo 2 caracteres.');
        return;
      }
      onEditQR(qr._id, { shortUrl: newShortUrl });
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este QR?')) {
      onDeleteQR(qr._id);
    }
  };

  const handleShowStats = () => {
    const processedStats = qr.clicks.map(click => {
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
    const fullShortUrl = `${API_BASE_URL}/qr/${qr.shortUrl}`;
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
      <div className="qr-canvas">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div>
      <p className="qr-url">{qr.shortUrl}</p>
      </div>
      <div style={{width: 150, textAlign: 'center'}}>
      {copyMessage && <span style={{ color: 'green', fontSize: '20px' }}>{copyMessage}</span>}
      </div>
      
      <div className="qr-buttons">
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
        totalClicks={qr.clicks.length}
      />
    </li>
  );
}

export default QRItem;