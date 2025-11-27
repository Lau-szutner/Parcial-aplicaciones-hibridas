import { useState } from 'react';
import SpendForm from '../components/SpendForm.jsx';
import Spends from '../components/Spends.jsx';
import { getSpendsByMonth } from '../lib/utils';

const Home = ({ email }) => {
  const [newSpendForm, setNewSpendForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [spendsByMonth, setSpendsByMonth] = useState([]);
  const [error, setError] = useState(null);

  const toggleFormVisibility = () => {
    setNewSpendForm((prev) => !prev);
  };

  const handleFormSubmit = (data) => {
    console.log('Datos enviados:', data);
  };

  const handleMonthChange = async (e) => {
    const value = e.target.value;
    const [year, month] = value.split('-');

    setSelectedMonth(value);

    try {
      const spendsByMonthData = await getSpendsByMonth(year, month);

      if (!spendsByMonthData) {
        console.log('No se encontraron datos para este mes.');
        return;
      }

      console.log('DATA:', spendsByMonthData);
      setSpendsByMonth(spendsByMonthData);

      setError(null);
    } catch (err) {
      console.error('Error al obtener los gastos:', err);
      setError('Ocurrió un error al cargar los datos.');
    }
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
                value={selectedMonth}
                onChange={handleMonthChange}
                className="bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-500 ml-6">{error}</p>}

        {newSpendForm ? (
          <section className="mt-5">
            <h2 className="text-xl font-semibold mb-4 text-center text-white">
              Agregar nuevo gasto
            </h2>
            <SpendForm email={email} onSubmit={handleFormSubmit} />
          </section>
        ) : (
          <Spends spendsData={spendsByMonth} />
        )}
      </div>
    </main>
  );
};

export default Home;
