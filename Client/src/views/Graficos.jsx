import PieChart from '../components/charts/PieChart';
import { useState } from 'react';
import { getSpendsByMonth } from '../lib/utils';

function Graficos() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [totalByCategory, setTotalByCategory] = useState({});

  const handleMonthChange = async (e) => {
    const [year, month] = e.target.value.split('-');
    setSelectedMonth(e.target.value);

    try {
      const totals = await getSpendsByMonth(year, month);
      if (totals) {
        setTotalByCategory(totals);
      } else {
        error = 'bg-red-500';
        setTotalByCategory({});
      }
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    }
  };

  return (
    <div className="h-full  grid p-10 gap-5">
      <div>
        <label className="text-white mr-4">Elegir mes y año:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        />
      </div>

      <PieChart spendsData={totalByCategory || {}} />
    </div>
  );
}

export default Graficos;
