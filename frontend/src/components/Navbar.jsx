import { useNavigate, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ userEmail, token, setToken, setShowWelcome, setEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar cookies importantes
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('chartData');
    Cookies.remove('chartMonth');
    Cookies.remove('spendsMonth');
    Cookies.remove('spendsSaved');

    // Resetear estados en el padre
    setToken(null);
    setEmail(''); // <- Limpiar email
    setShowWelcome(false);

    // Redirigir al home
    navigate('/');
  };

  // Clase dinámica para resaltar ruta activa
  const linkClass = ({ isActive }) =>
    `text-white font-medium transition-colors duration-200 p-2 rounded-md hover:bg-green-600 ${
      isActive ? 'bg-green-500' : 'bg-green-900'
    }`;

  return (
    <header className="w-full bg-green-700 shadow-lg z-50 ">
      <nav className="mx-auto flex justify-between py-3 px-10 h-20">
        {/* Logo y título */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-2xl">
              Spend Tracker
            </span>
            <span className="text-white font-light text-sm truncate max-w-[200px]">
              {userEmail || ''}
            </span>
          </div>
        </div>

        {/* Navegación: solo si hay token */}
        {token && (
          <ul className="flex items-center gap-6 w-fit">
            <li>
              <NavLink to="/gastos" className={linkClass}>
                Gastos
              </NavLink>
            </li>
            <li>
              <NavLink to="/graficos" className={linkClass}>
                Gráficos
              </NavLink>
            </li>
            <li>
              <NavLink to="/gastosCompartidos" className={linkClass}>
                Gastos compartidos
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white font-medium transition-colors duration-200 p-2 rounded-md bg-red-600 hover:bg-red-800 cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
