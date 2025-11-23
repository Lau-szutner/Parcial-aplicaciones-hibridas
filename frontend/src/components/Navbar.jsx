import perfil from '../assets/perfil.jpg';
import { getTokenFromCookies } from '../lib/utils';

const Navbar = ({ userEmail }) => {
  const token = getTokenFromCookies();

  return (
    <header className="w-full bg-green-700 shadow-lg z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
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
        {token.data && (
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="/"
                className="text-white font-medium hover:text-blue-300 transition-colors duration-200"
              >
                Gastos
              </a>
            </li>
            <li>
              <a
                href="/graficos"
                className="text-white font-medium hover:text-blue-300 transition-colors duration-200"
              >
                Gráficos
              </a>
            </li>
            <li>
              <a
                href="/GastosCompartidos"
                className="text-white font-medium hover:text-blue-300 transition-colors duration-200"
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
