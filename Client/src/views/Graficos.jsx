import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import PieChart from '../components/charts/PieChart';
import { getSpendsByMonth } from '../lib/utils';

function Graficos() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalByCategory, setTotalByCategory] = useState({});
  const [error, setError] = useState(null);

  const handleMonthChange = async (e) => {
    const value = e.target.value;
    const [year, month] = value.split('-');
    setSelectedMonth(value);

    try {
      const totals = await getSpendsByMonth(year, month);

      if (!totals) {
        setError('No se encontraron datos para este mes.');
        setTotalByCategory({});
        Cookies.remove('spendData');
        return;
      }

      setError(null);
      setTotalByCategory(totals);
      Cookies.set('spendData', JSON.stringify(totals), { expires: 7 });
    } catch (err) {
      console.error('Error al obtener los gastos:', err);
      setError('Ocurrió un error al cargar los datos.');
    }
  };

  // Recupera los datos desde las cookies al cargar el componente
  useEffect(() => {
    const savedData = Cookies.get('spendData');
    if (savedData) {
      try {
        setTotalByCategory(JSON.parse(savedData));
      } catch {
        console.warn('Error al parsear datos guardados');
      }
    }
  }, []);

  return (
    <div className="h-full grid p-10 gap-5">
      <div>
        <label className="text-white mr-4">Elegir mes y año:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        />
      </div>

      {error && (
        <div className="text-red-400 bg-neutral-800 p-3 rounded-lg">
          {error}
        </div>
      )}

      <PieChart spendsData={totalByCategory} />
    </div>
  );
}

export default Graficos;
