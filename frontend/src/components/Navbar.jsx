import { getTokenFromCookies } from '../lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ userEmail }) => {
  let token = getTokenFromCookies();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('spendData');
    // navigate('/gastos');
    // setToken(null);
    // setEmail('');
    // setShowAuthForm(false);
  };

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
        {token.data === undefined && (
          <ul className="flex items-center gap-6 w-fit">
            {location.pathname !== '/backOffice' && (
              <>
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
              </>
            )}
            <button
              onClick={() => handleLogout()}
              className={`text-white font-medium  transition-colors duration-200  p-2 rounded-md bg-red-600 hover:bg-red-800 cursor-pointer
            }`}
            >
              Logout
            </button>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
