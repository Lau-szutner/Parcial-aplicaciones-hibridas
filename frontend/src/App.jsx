import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import SharedSpends from './views/SharedSpends.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import AuthLanding from './components/AuthLanding.jsx';
import BackOffice from './views/BackOffice.jsx';
import NotFound from './views/NotFound';
import Graficos from './views/Graficos.jsx';
import Cookies from 'js-cookie';

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getTokenFromCookies } from './lib/utils.js';

function App() {
  const location = useLocation();
  const isErrorPage = location.pathname === '/404';
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState('register'); // 'login' | 'register'

  useEffect(() => {
    const storedToken = getTokenFromCookies();
    const storedEmail = Cookies.get('email');
    if (storedToken) setToken(storedToken);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    setToken(null);
    setEmail('');
    setShowAuthForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-800 text-white">
      {/* Navbar */}
      <Navbar userEmail={email} />
      {/* Contenido principal */}
      <main className="flex-grow flex">
        {!token ? (
          <section className="flex flex-col items-center justify-center flex-grow p-6">
            {!showAuthForm ? (
              <AuthLanding
                onChoose={(mode) => {
                  setAuthMode(mode);
                  setShowAuthForm(true);
                }}
              />
            ) : (
              <div className="w-full max-w-xl">
                <button
                  className="mb-4 text-sm text-gray-300"
                  onClick={() => setShowAuthForm(false)}
                >
                  {'< Volver'}
                </button>
                <RegisterForm
                  setEmail={setEmail}
                  setToken={setToken}
                  initialMode={authMode}
                />
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Contenido dinámico */}
            <section className="flex-grow overflow-auto p-6">
              <Routes>
                <Route path="/gastos" element={<Home email={email} />} />
                <Route path="/graficos" element={<Graficos />} />
                <Route path="/gastosCompartidos" element={<SharedSpends />} />
                <Route path="/backOffice" element={<BackOffice />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
