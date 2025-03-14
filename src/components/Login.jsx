import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const intl = useIntl(); // 👈 para traducir placeholders

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
    <div className="container-fluid mt-4 text-center px-5">
      <h1><FormattedMessage id="title" /></h1>
      <img src="src/public/Banner.png" alt="Robots" className="img-fluid my-4" />
      <form onSubmit={handleLogin}>
        <h2><FormattedMessage id="loginTitle" /></h2>

        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'username' })}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={intl.formatMessage({ id: 'password' })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}

        <div className="buttons">
          <button type="submit" className="btn-ingresar">
            <FormattedMessage id="login" />
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setUsername('');
              setPassword('');
              setError('');
            }}
          >
            <FormattedMessage id="cancel" />
          </button>
        </div>
      </form>

      <footer>
        <FormattedMessage id="contact" />
      </footer>
    </div>
  );
};

export default Login;
