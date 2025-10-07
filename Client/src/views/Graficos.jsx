import PieChart from '../components/charts/PieChart';
import { useState } from 'react';

function Graficos({ token }) {
  let url = 'http://localhost:3000/spend/';
  const [categories, setCategories] = useState([]);
  const [totalByCategory, setTotalByCategory] = useState({
    comida: 0,
    servicios: 0,
    gastosVarios: 0,
    transporte: 0,
    salud: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  function validateUser(user) {
    if (!token) return console.log('Token no encontrado en las cookies');
  }

  const getSpendsByMonth = async (year, month) => {
    validateUser();

    if (year && month) {
      url += `getSpendsByMonth?year=${year}&month=${month}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const spendsByMonthData = await response.json();

      // Calcular totales por categoría
      const totals = spendsByMonthData.reduce((acc, spend) => {
        acc[spend.category] = (acc[spend.category] || 0) + spend.amount;
        return acc;
      }, {});

      setTotalByCategory(totals);

      // Categorías únicas
      const uniqueCategories = [
        ...new Set(spendsByMonthData.map((s) => s.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split('-');
    setSelectedMonth(e.target.value);
    getSpendsByMonth(year, month);
  };

  return (
    <div className="grid p-10 gap-5">
      <div>
        <label className="text-white mr-4">Elegir mes y año:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="bg-neutral-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        />
      </div>

      <PieChart spendsData={totalByCategory} />
    </div>
  );
}

export default Graficos;
