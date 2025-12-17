import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import PieChart from '../components/charts/PieChart';
import { getSpendsByMonth } from '../lib/utils';

function Graficos() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalByCategory, setTotalByCategory] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMonthChange = async (e) => {
    const value = e.target.value;
    const [year, month] = value.split('-');

    setSelectedMonth(value);
    setLoading(true);
    setError(null);

    try {
      const spendsByMonthData = await getSpendsByMonth(year, month);

      if (!spendsByMonthData || spendsByMonthData.length === 0) {
        setError('No se encontraron datos para este mes.');
        setTotalByCategory({});
        Cookies.remove('chartData');
        Cookies.remove('chartMonth');
        setLoading(false);
        return;
      }

      const totals = spendsByMonthData.reduce((acc, spend) => {
        acc[spend.category] = (acc[spend.category] || 0) + spend.amount;
        return acc;
      }, {});

      setTotalByCategory(totals);
      Cookies.set('chartData', JSON.stringify(totals), { expires: 7 });
      Cookies.set('chartMonth', value, { expires: 7 });
    } catch (err) {
      console.error('Error al obtener los gastos:', err);
      setError('Ocurrió un error al cargar los datos.');
      setTotalByCategory({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedData = Cookies.get('chartData');
    const savedMonth = Cookies.get('chartMonth');
    if (savedData && savedMonth) {
      try {
        setTotalByCategory(JSON.parse(savedData));
        setSelectedMonth(savedMonth);
      } catch {
        console.warn('Error al parsear datos guardados');
      }
    }
  }, []);

  return (
    <div className="h-full p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Gráficos de Gastos
        </h2>

        <div className="bg-neutral-800 p-6 rounded-lg mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="text-white font-medium">
              Seleccionar mes y año:
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-600 transition-colors"
            />
          </div>
        </div>

        {loading && (
          <div className="text-center text-white py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2">Cargando datos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 p-4 rounded-lg mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          Object.keys(totalByCategory).length === 0 &&
          selectedMonth && (
            <div className="text-center text-gray-400 py-8">
              <p>No hay gastos registrados para este mes.</p>
              <p>
                Selecciona otro mes o añade gastos desde la página principal.
              </p>
            </div>
          )}

        {!loading && Object.keys(totalByCategory).length > 0 && (
          <div className="bg-neutral-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Distribución de Gastos por Categoría -{' '}
              {selectedMonth
                ? new Date(selectedMonth + '-01').toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                  })
                : ''}
            </h2>
            <PieChart spendsData={totalByCategory} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Graficos;
