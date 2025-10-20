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

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    setToken(null);
    setEmail(null);
  };

  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedEmail = Cookies.get('email');
    setToken(savedToken || null);
    setEmail(savedEmail || null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-800 text-white">
      {/* Navbar */}
      <Navbar userEmail={email} />

      {/* Contenido principal */}
      <main className="flex-grow flex">
        {!token ? (
          <section className="flex flex-col items-center justify-center flex-grow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Regístrate para continuar
            </h2>
            <RegisterForm setEmail={setEmail} setToken={setToken} />
          </section>
        ) : (
          <>
            {/* Sidebar */}
            {!isErrorPage && (
              <aside className="w-64 bg-stone-900 flex flex-col items-center justify-start  py-8 px-4">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2">Spend Tracker</h1>
                  <p>
                    Bienvenido/a, <span className="font-bold">{email}</span>
                  </p>
                </div>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </aside>
            )}

            {/* Contenido dinámico */}
            <section className="flex-grow overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Home email={email} />} />
                <Route path="/graficos" element={<Graficos />} />
                <Route path="/GastosCompartidos" element={<SharedSpends />} />
                <Route path="/back" element={<BackOffice />} />
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
