// components/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/gastos');
  };

  return (
    <div className="flex flex-col justify-center items-center h-full px-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4 animate-bounce">
        404
      </h1>
      <p className="text-xl  mb-6 text-center">
        Ooops! La página que buscas no existe.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFound;
