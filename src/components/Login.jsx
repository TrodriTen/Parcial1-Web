import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const intl = useIntl();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: username,
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

  return (
    <div className="container-fluid mt-4 px-4 d-flex flex-column align-items-center">
      {/* Selector de idioma (opcional)
      <div className="text-end w-100 mb-2">
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="form-select-sm"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div> */}

      <h1 className="text-center mb-3">
        <FormattedMessage id="title" defaultMessage="Adopta un Robot con Robot Lovers!" />
      </h1>

      <div className="text-center mb-4">
        <img src="src/public/Banner.png" alt="Robots" className="img-fluid" />
      </div>

      <form onSubmit={handleLogin} className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-3 text-center">
          <FormattedMessage id="loginTitle" defaultMessage="Inicio de sesión" />
        </h2>

        <input
          type="text"
          className="form-control mb-2"
          placeholder={intl.formatMessage({ id: 'username' })}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder={intl.formatMessage({ id: 'password' })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            <FormattedMessage id="login" defaultMessage="Ingresar" />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setUsername('');
              setPassword('');
              setError('');
            }}
          >
            <FormattedMessage id="cancel" defaultMessage="Cancelar" />
          </button>
        </div>
      </form>

      <footer className="text-center mt-4">
        <FormattedMessage id="contact" defaultMessage="Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers" />
      </footer>
    </div>
  );
};

export default Login;
