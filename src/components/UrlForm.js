import React, { useState } from 'react';

function UrlForm({ onShortenUrl }) {
  const [fullUrl, setFullUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onShortenUrl(fullUrl);
    setFullUrl('');
  };

  return (
    <form className="qr-form" onSubmit={handleSubmit}>
      <input
        type="url"
        value={fullUrl}
        onChange={(e) => setFullUrl(e.target.value)}
        placeholder="Ingrese URL"
        required
        className="search-input"
      />
      <button type="submit">Acortar</button>
      <br></br><br></br><br></br>
    </form>
  );
}

export default UrlForm;