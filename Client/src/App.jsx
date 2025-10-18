import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import SharedSpends from './views/SharedSpends.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import BackOffice from './views/BackOffice.jsx';
import Cookies from 'js-cookie';
import NotFound from './views/NotFound';
import Graficos from './views/Graficos.jsx';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const location = useLocation();
  const isErrorPage = location.pathname === '/404';

  function handleLogout() {
    Cookies.remove('token');
    Cookies.remove('email');
    setToken(null);
    setEmail(null);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = Cookies.get('token');
      const savedEmail = Cookies.get('email');
      setToken(savedToken || null);
      setEmail(savedEmail || null);
    }
  }, []);

  return (
    <div className="flex flex-col bg-stone-800 h-full text-white">
      <Navbar userEmail={email} />

      {!token ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center text-white">
            Regístrate para continuar
          </h2>
          <RegisterForm setEmail={setEmail} setToken={setToken} />
        </section>
      ) : (
        <>
          <div className="grid grid-cols-[0.25fr_1fr] h-full">
            {!isErrorPage && (
              <aside className="text-white bg-stone-900 p-20 h-full">
                <h1 className="text-3xl font-bold text-center">
                  Bienvenido a Spend Tacker
                </h1>
                <p className="mt-4 text-center">
                  Bienvenido/a, <span className="font-bold">{email}</span>
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded mx-auto block"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </aside>
            )}
            <Routes>
              <Route path="/" element={<Home email={email} />} />
              <Route path="/graficos" element={<Graficos />} />
              <Route path="/GastosCompartidos" element={<SharedSpends />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/back" element={<BackOffice />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
