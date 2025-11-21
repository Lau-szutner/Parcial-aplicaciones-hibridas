import perfil from '../assets/perfil.jpg';

const Navbar = ({ userEmail }) => {
  return (
    <header className="w-full bg-green-700 shadow-lg z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo y título */}
        <div className="flex items-center gap-4">
          <img
            src={perfil}
            alt="Logo del usuario"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-lg">
              Spend Tracker
            </span>
            <span className="text-white font-light text-sm truncate max-w-[200px]">
              {userEmail}
            </span>
          </div>
        </div>

        {/* Navegación */}
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
      </nav>
    </header>
  );
};

export default Navbar;
