import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../LOGO-RUNWAY-7.png';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías implementar la lógica real de autenticación
    if (username === 'rw7fw943' && password === 'ujnsdfijsd12') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/app');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    
    <div className="login-container">
  <img src={imagen} alt='logo' height={'120px'} width={'120px'} className="logo" />
  <form onSubmit={handleSubmit} className="login-form">
    <h2>Iniciar Sesión</h2>
    <div>
      <label>Usuario:</label>
      <input
        required
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label>Contraseña:</label>
      <input
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit">Iniciar Sesión</button>
  </form>
</div>

  );
}

export default Login;
