import TotalUsers from '../components/backoffice/TotalUsers';
import LoginAdmin from '../components/backoffice/LoginAdmin';
import { useState } from 'react';

const BackOffice = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/auth/backOffice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
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
