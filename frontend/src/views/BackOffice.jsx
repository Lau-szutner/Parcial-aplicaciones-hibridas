import TotalUsers from '../components/backoffice/TotalUsers';
import LoginAdmin from '../components/backoffice/LoginAdmin';
import { useState } from 'react';
import Cookies from 'js-cookie';

// Usamos la variable de entorno para construir las rutas de la API
const API_URL = import.meta.env.VITE_API_URL;

const BackOffice = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/auth/backOffice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Guardar token y email en cookies para que las llamadas protegidas puedan usarlas
    if (data.token) {
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('email', email, { expires: 7 });
    }

    setIsAdmin(true);
  };

  return (
    <>
      {isAdmin ? (
        <TotalUsers />
      ) : (
        <LoginAdmin
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
};

export default BackOffice;
