// components/SharedSpends.jsx
import { useEffect, useState } from 'react';
import SharedSpend from '../components/SharedSpend.jsx'; // Asegúrate de que el path sea correcto
import { getTokenFromCookies } from '../lib/utils.js';

const SharedSpends = () => {
  const [sharedSpends, setSharedSpends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los gastos compartidos
  // Pero debo llevar esta funcion a utils
  const fetchSharedSpends = async () => {
    const token = getTokenFromCookies();

    if (!token) {
      setError('Token no encontrado en las cookies');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/spend/getSharedSpends?sharedWith=lautaroszutner123123@gmail.com`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los gastos');
      }

      const data = await response.json();

      setSharedSpends(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedSpends(); // Llamar a la API al cargar el componente
  }, []);

  if (loading) return <p>Cargando gastos compartidos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
      {sharedSpends.map((spend) => (
        <SharedSpend
          key={spend._id}
          title={spend.title}
          description={spend.description}
          amount={spend.amount}
          categoria={spend.category}
          email={spend.sharedEmail} // Pasar el email compartido al componente SharedSpend
          createdAt={new Date(spend.createdAt).toLocaleString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })} // Formateando la fecha directamente
        />
      ))}
    </div>
  );
};

export default SharedSpends;
