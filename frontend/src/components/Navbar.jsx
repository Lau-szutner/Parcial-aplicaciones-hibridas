import perfil from '../assets/perfil.jpg';
import { getTokenFromCookies } from '../lib/utils';
import { useLocation } from 'react-router-dom';

const Navbar = ({ userEmail }) => {
  const token = getTokenFromCookies();
  const location = useLocation();

  return (
    <header className="w-full bg-green-700 shadow-lg z-50">
      <nav className="mx-auto flex justify-between py-3 px-10">
        {/* Logo y título */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-2xl">
              Spend Tracker
            </span>
            <span className="text-white font-light text-sm truncate max-w-[200px]">
              {userEmail}
            </span>
          </div>
        </div>

        {/* Navegación */}
        {token && (
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="/gastos"
                className={`text-white font-medium  transition-colors duration-200  p-2 rounded-md hover:bg-green-600 ${
                  location.pathname == '/gastos'
                    ? 'bg-green-500'
                    : 'bg-green-900'
                }`}
              >
                Gastos
              </a>
            </li>
            <li>
              <a
                href="/graficos"
                className={`text-white font-medium  transition-colors duration-200  p-2 rounded-md hover:bg-green-600  ${
                  location.pathname == '/graficos'
                    ? 'bg-green-500'
                    : 'bg-green-900'
                }`}
              >
                Gráficos
              </a>
            </li>
            <li>
              <a
                href="/gastosCompartidos"
                className={`text-white font-medium  transition-colors duration-200  p-2 rounded-md hover:bg-green-600 ${
                  location.pathname == '/gastosCompartidos'
                    ? 'bg-green-500'
                    : 'bg-green-900'
                }`}
              >
                Gastos compartidos
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
