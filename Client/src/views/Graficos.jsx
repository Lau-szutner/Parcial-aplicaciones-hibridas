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
      const normalSpends = data.filter((spend) => !spend.sharedEmail);
      console.log(data);

      data.map((spend) => {
        setTotalByCategory((prev) => ({ ...prev, spend }));
      });

      console.log(totalByCategory);
      setSpends(normalSpends);
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
      <PieChart categories={categories} />
    </div>
  );
}

export default Graficos;
