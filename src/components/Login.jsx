import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: username, // 👈 importante que sea "login"
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/robots');
      } else {
        setError(data.message || 'Error de autenticación. Revise sus credenciales');
      }
    } catch (err) {
      setError('Error del servidor. Inténtalo más tarde');
      console.error(err);
    }
  };

  // 👇 Este return debe estar dentro de la función Login
  return (
    <div className="container-fluid mt-4 text-center px-5">
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <img src="src/public/Banner.png" alt="Robots" className="img-fluid my-4" />
      <form onSubmit={handleLogin}>
        <h2>Inicio de sesión</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <div className="buttons">
          <button type="submit" className="btn-ingresar">Ingresar</button>
          <button type="button" className="btn-cancelar" onClick={() => {
            setUsername('');
            setPassword('');
            setError('');
          }}>Cancelar</button>
        </div>
      </form>
      <footer>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</footer>
    </div>
  );
};

export default Login;
