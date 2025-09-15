import React, { useState } from 'react';
import SpendForm from '../components/SpendForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import SpendList from '../components/SpendList.jsx';

const Home = ({ email }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };
  const handleFormSubmit = (data) => {
    console.log('Datos enviados:', data);
  };
  return (
    <main>
      <>
        {/* Botón para abrir/cerrar el formulario de gasto */}
        <button
          onClick={toggleFormVisibility}
          className="m-6 bg-amber-800 text-white py-2 px-4 rounded-lg hover:bg-amber-900 transition-colors"
        >
          {isFormVisible ? 'Cerrar Formulario' : 'Agregar Nuevo Gasto'}
        </button>
        <SpendList></SpendList>
        {/* Mostrar formulario de gasto si está visible */}
        {isFormVisible && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-center text-white">
              Agregar nuevo gasto
            </h2>
            <SpendForm email={email} onSubmit={handleFormSubmit} />
          </section>
        )}
      </>
    </main>
  );
};

export default Home;
