// components/UnderConstruction.jsx

import PieChart from '../components/charts/PieChart';
import { useEffect } from 'react';
import { getTokenFromCookies } from '../lib/utils';
// Función para obtener los gastos
const fetchSpends = async () => {
  const token = getTokenFromCookies();

  if (!token) {
    setError('Token no encontrado en las cookies');
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/spend/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los gastos');
    }

    const data = await response.json();

    // Filtrar los gastos que NO tienen un sharedEmail (gastos normales)
    const normalSpends = data.filter((spend) => !spend.sharedEmail);
    setSpends(normalSpends);
    setLoading(false);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

function UnderConstruction() {
  useEffect(() => {
    fetchSpends(); // Llamar a la API al cargar el componente
  }, []);
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen bg-stone-950">
      <PieChart />
    </div>
  );
}

export default UnderConstruction;
