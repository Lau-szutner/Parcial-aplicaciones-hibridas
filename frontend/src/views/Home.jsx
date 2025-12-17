import { useState, useEffect } from 'react';
import SpendForm from '../components/SpendForm.jsx';
import Spends from '../components/Spends.jsx';
import { getSpendsByMonth } from '../lib/utils';
import Cookies from 'js-cookie';

const Home = ({ email }) => {
  const [newSpendForm, setNewSpendForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [spendsByMonth, setSpendsByMonth] = useState([]);
  const [error, setError] = useState(null);

  const toggleFormVisibility = () => {
    setNewSpendForm((prev) => !prev);
  };

  const handleSpendsChange = (updatedSpends) => {
    setSpendsByMonth(updatedSpends);
    saveSpendsCookies(updatedSpends, selectedMonth);
  };

  const handleFormSubmit = async (data) => {
    console.log('Datos enviados:', data);
    // Refrescar los gastos después de añadir uno nuevo
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-');
      try {
        const spendsByMonthData = await getSpendsByMonth(year, month);
        if (spendsByMonthData) {
          setSpendsByMonth(spendsByMonthData);
          saveSpendsCookies(spendsByMonthData, selectedMonth);
        }
      } catch (err) {
        console.error('Error al refrescar gastos:', err);
      }
    }
  };

  const handleMonthChange = async (e) => {
    const value = e.target.value;
    const [year, month] = value.split('-');
    setSelectedMonth(value);

    try {
      const spendsByMonthData = await getSpendsByMonth(year, month);
      if (!spendsByMonthData) {
        console.log('No se encontraron datos para este mes.');
        setError(' No hay gastos en el mes seleccionado');
        Cookies.remove('spendsSaved');
        Cookies.remove('spendsMonth');
        setSpendsByMonth([]);
        return;
      }
      setSpendsByMonth(spendsByMonthData);
      saveSpendsCookies(spendsByMonthData, value);
      setError(null);
    } catch (err) {
      console.error('Error al obtener los gastos:', err);
      setError('Ocurrió un error al cargar los datos.');
    }
  };

  function saveSpendsCookies(spends, month) {
    Cookies.set('spendsSaved', JSON.stringify(spends), { expires: 7 });
    Cookies.set('spendsMonth', JSON.stringify(month), { expires: 7 });
  }

  useEffect(() => {
    const spendsSaved = Cookies.get('spendsSaved');
    const spendsMonth = Cookies.get('spendsMonth');
    if (spendsSaved) {
      try {
        setSpendsByMonth(JSON.parse(spendsSaved));
        setSelectedMonth(JSON.parse(spendsMonth));
      } catch {
        console.warn('Error al parsear datos guardados');
      }
    }
  }, []);

  return (
    <main className="h-full p-10">
      <div className="flex flex-col  mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Gastos
        </h2>
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
        {error && <p className="text-red-500 ml-6 text-lg">{error}</p>}

        {newSpendForm ? (
          <section className="mt-5">
            <h2 className="text-xl font-semibold mb-4 text-center text-white">
              Agregar nuevo gasto
            </h2>
            <SpendForm email={email} onSubmit={handleFormSubmit} />
          </section>
        ) : (
          <Spends
            spendsData={spendsByMonth}
            onSpendsChange={handleSpendsChange}
          />
        )}
      </div>
    </main>
  );
};
export default Home;
