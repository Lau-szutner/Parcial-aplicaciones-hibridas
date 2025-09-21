import PieChart from '../components/charts/PieChart';
import { useEffect, useState } from 'react';
import { getTokenFromCookies } from '../lib/utils';

function Graficos() {
  const [spends, setSpends] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalByCategory, setTotalByCategory] = useState({
    comida: 0,
    servicios: 0,
    comida: 0,
    gastosVarios: 0,
    transporte: 0,
    salud: 0,
  });

  const fetchSpends = async () => {
    const token = getTokenFromCookies();
    if (!token) return console.log('Token no encontrado en las cookies');

    try {
      const response = await fetch('http://localhost:3000/spend/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Error al obtener los gastos');

      const data = await response.json();

      // Calculamos totales por categoría
      const totals = data.reduce((acc, spend) => {
        acc[spend.category] = (acc[spend.category] || 0) + spend.amount;
        return acc;
      }, {});

      setTotalByCategory(totals);
      console.log('Totales por categoría:', totals);

      // Para llenar categories
      const uniqueCategories = [...new Set(data.map((s) => s.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpends();
  }, []);

  useEffect(() => {
    const uniqueCategories = [];
    spends.forEach((spend) => {
      if (!uniqueCategories.includes(spend.category)) {
        uniqueCategories.push(spend.category);
      }
    });
    setCategories(uniqueCategories);
  }, [spends]);

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen bg-stone-950">
      <PieChart spendsData={totalByCategory} />
    </div>
  );
}

export default Graficos;
