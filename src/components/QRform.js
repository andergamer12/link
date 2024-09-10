import React, { useState } from 'react';

function QRForm({ onGenerateQR }) {
  const [fullUrl, setFullUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateQR(fullUrl);
    setFullUrl('');
  };

  return (
    <form className="qr-form" onSubmit={handleSubmit}>
      <input
        type="url"
        value={fullUrl}
        onChange={(e) => setFullUrl(e.target.value)}
        placeholder="Ingrese URL para generar QR"
        required
        className="search-input"
      />
      <button type="submit">Generar QR</button>
      <br></br>
    </form>
  );
}

export default QRForm;