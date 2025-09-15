import axios from 'axios';
import perfil from '../assets/perfil.jpg';
import React from 'react';

const Header = () => {
  // Método para manejar el logout
  const handleLogOut = async () => {
    try {
      // Realiza la solicitud al backend
      const response = await axios.post(
        'http://localhost:3000/auth/logout', // URL del endpoint
        {}, // Cuerpo vacío
        { withCredentials: true } // Incluye las cookies
      );

      // Si es exitoso, redirigir o realizar alguna acción
      console.log(response.data.message);
      // Por ejemplo, redirigir al usuario:
      // window.location.href = '/login';
    } catch (error) {
      console.error(
        'Error al cerrar sesión:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <nav className="w-full bg-yellow-700 p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img
          src={perfil}
          alt="Logo"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <span className="text-white text-2xl font-semibold">Spend Tracker</span>
      </div>

      {/* Navegación */}
      <ul className="flex items-center space-x-8">
        <li>
          <a
            href="/"
            className="text-white text-lg font-medium hover:text-blue-300 transition-colors duration-200"
          >
            Gastos
          </a>
        </li>

        <li>
          <a
            href="graficos"
            className="text-white text-lg font-medium hover:text-blue-300 transition-colors duration-200"
          >
            Graficos
          </a>
        </li>
        <li>
          <a
            href="GastosCompartidos"
            className="text-white text-lg font-medium hover:text-blue-300 transition-colors duration-200"
          >
            Gastos compartidos
          </a>
        </li>
        <li>
          <button
            onClick={handleLogOut}
            className="text-white text-lg bg-red-500 py-2 px-4 rounded-md font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
