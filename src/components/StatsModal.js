import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

function StatsModal({ isOpen, onClose, stats, totalClicks }) {
  const [selectedChart, setSelectedChart] = useState('clicks');

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const dateCounts = stats.reduce((acc, stat) => {
    if (stat.fecha !== 'Desconocido') {
      const date = formatDate(stat.fecha);
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const browserCounts = stats.reduce((acc, stat) => {
    if (stat.fecha !== 'Desconocido') {
      const date = formatDate(stat.fecha);
      if (!acc[date]) acc[date] = { Chrome: 0, Edge: 0, Opera: 0, Firefox: 0, Brave: 0, Otros: 0 };
      const browser = ['Chrome', 'Edge', 'Opera', 'Firefox', 'Brave'].includes(stat.navegador) ? stat.navegador : 'Otros';
      acc[date][browser]++;
    }
    return acc;
  }, {});

  const osCounts = stats.reduce((acc, stat) => {
    if (stat.fecha !== 'Desconocido') {
      const date = formatDate(stat.fecha);
      if (!acc[date]) acc[date] = { Windows: 0, macOS: 0, Linux: 0, Android: 0, iOS: 0, Otros: 0 };
      const os = ['Windows', 'macOS', 'Linux', 'Android', 'iOS'].includes(stat.sistemaOperativo) ? stat.sistemaOperativo : 'Otros';
      acc[date][os]++;
    }
    return acc;
  }, {});

  const sortedDates = Object.keys(dateCounts).sort((a, b) => new Date(a) - new Date(b));

  const clicksData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Número de Clics',
        data: sortedDates.map(date => dateCounts[date]),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const browsersData = {
    labels: sortedDates,
    datasets: [
      { label: 'Chrome', data: sortedDates.map(date => browserCounts[date]?.Chrome || 0), borderColor: '#4285F4' },
      { label: 'Edge', data: sortedDates.map(date => browserCounts[date]?.Edge || 0), borderColor: '#0078D7' },
      { label: 'Opera', data: sortedDates.map(date => browserCounts[date]?.Opera || 0), borderColor: '#FF1B2D' },
      { label: 'Firefox', data: sortedDates.map(date => browserCounts[date]?.Firefox || 0), borderColor: '#FF7139' },
      { label: 'Brave', data: sortedDates.map(date => browserCounts[date]?.Brave || 0), borderColor: '#FB542B' },
      { label: 'Otros', data: sortedDates.map(date => browserCounts[date]?.Otros || 0), borderColor: '#808080' },
    ],
  };

  const osData = {
    labels: sortedDates,
    datasets: [
      { label: 'Windows', data: sortedDates.map(date => osCounts[date]?.Windows || 0), borderColor: '#0078D6' },
      { label: 'macOS', data: sortedDates.map(date => osCounts[date]?.macOS || 0), borderColor: '#ff2d00' },
      { label: 'Linux', data: sortedDates.map(date => osCounts[date]?.Linux || 0), borderColor: '#FCC624' },
      { label: 'Android', data: sortedDates.map(date => osCounts[date]?.Android || 0), borderColor: '#A4C639' },
      { label: 'iOS', data: sortedDates.map(date => osCounts[date]?.iOS || 0), borderColor: '#000000' },
      { label: 'Otros', data: sortedDates.map(date => osCounts[date]?.Otros || 0), borderColor: '#808080' },
    ],
  };

  const getChartData = () => {
    switch(selectedChart) {
      case 'clicks': return clicksData;
      case 'browsers': return browsersData;
      case 'os': return osData;
      default: return clicksData;
    }
  };

  const getChartTitle = () => {
    switch(selectedChart) {
      case 'clicks': return 'Gráfico de Clics';
      case 'browsers': return 'Gráfico de Navegadores';
      case 'os': return 'Gráfico de Sistemas Operativos';
      default: return 'Gráfico';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width:'80%' }}>
      <button onClick={onClose} style={{ marginLeft: 'auto' }}>Cerrar</button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:20 }}>
          <h2 style={{ textAlign: 'center', flex: 1 }}>Estadísticas</h2>
          

        </div>
        <table>
          <thead>
            <tr>
              <th>IP</th>
              <th>Fecha</th>
              <th>Navegador</th>
              <th>Sistema Operativo</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.ip}</td>
                <td>{stat.fecha !== 'Desconocido' ? formatDate(stat.fecha) : 'Desconocido'}</td>
                <td>{stat.navegador}</td>
                <td>{stat.sistemaOperativo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total de clics: {totalClicks}</p>
        <select
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          style={{ marginBottom: '20px', padding: '5px', fontSize: '16px' }}
        >
          <option value="clicks">Gráfico de Clics</option>
          <option value="browsers">Gráfico de Navegadores</option>
          <option value="os">Gráfico de Sistemas Operativos</option>
        </select>
        <div className='grafico'>
            <h1 className='grafico-title'>{getChartTitle()}</h1>
            <Line data={getChartData()} />
        </div>

        
      </div>
    </div>
  );
}

export default StatsModal;