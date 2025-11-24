import { useState } from 'react';
import SpendForm from '../components/SpendForm.jsx';
import Spends from '../components/Spends.jsx';

const Home = ({ email }) => {
  const [newSpendForm, setNewSpendForm] = useState(false);

  const toggleFormVisibility = () => {
    setNewSpendForm((prev) => !prev);
  };

  const handleFormSubmit = (data) => {
    console.log('Datos enviados:', data);
  };

  return (
    <main className="">
      <div className="flex flex-col">
        <div className="flex place-items-center">
          <button
            onClick={toggleFormVisibility}
            className="m-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors w-fit h-fit cursor-pointer"
          >
            {newSpendForm ? 'Cerrar Formulario' : 'Nuevo Gasto'}
          </button>

          {!newSpendForm && (
            <div>
              <label className="text-white mr-4">Elegir mes y año:</label>
              <input
                type="month"
                // value={selectedMonth}
                // onChange={handleMonthChange}
                className="bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {newSpendForm ? (
          <section className="mt-5">
            <h2 className="text-xl font-semibold mb-4 text-center text-white">
              Agregar nuevo gasto
            </h2>
            <SpendForm email={email} onSubmit={handleFormSubmit} />
          </section>
        ) : (
          <Spends />
        )}
      </div>
    </main>
  );
};

export default Home;
