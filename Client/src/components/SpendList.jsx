// components/SpendList.jsx
import React, { useEffect, useState } from 'react';
import Spend from './Spend.jsx'; // Asegúrate de que el path sea correcto

const SpendList = () => {
  const [spends, setSpends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el token de las cookies
  const getTokenFromCookies = () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    return token ? token.split('=')[1] : null;
  };

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

  useEffect(() => {
    fetchSpends(); // Llamar a la API al cargar el componente
  }, []);

  // Manejo de eliminación de un gasto
  const handleDelete = async (id) => {
    const token = getTokenFromCookies();

    if (!token) {
      setError('Token no encontrado en las cookies');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/spend/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el gasto');
      }

      // Si la eliminación es exitosa, actualizar el estado para quitar el gasto de la lista
      setSpends(spends.filter((spend) => spend._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Manejo de edición de un gasto
  const handleEdit = async (id, updatedSpend) => {
    const token = getTokenFromCookies();

    if (!token) {
      setError('Token no encontrado en las cookies');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/spend/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Usa el token obtenido de las cookies
        },
        body: JSON.stringify(updatedSpend), // Envía los datos actualizados
      });

      if (!response.ok) {
        throw new Error('Error al editar el gasto');
      }

      const updatedSpendData = await response.json();

      // Actualizar el estado con el gasto editado
      setSpends(
        spends.map((spend) =>
          spend._id === id ? { ...spend, ...updatedSpendData } : spend
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Cargando gastos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
      {spends.map((spend) => (
        <Spend
          key={spend._id}
          title={spend.title}
          description={spend.description}
          amount={spend.amount}
          categoria={spend.category}
          createdAt={new Date(spend.createdAt).toLocaleString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
          onDelete={() => handleDelete(spend._id)}
          onEdit={(updatedSpend) => handleEdit(spend._id, updatedSpend)} // Envía los datos editados
        />
      ))}
    </div>
  );
};

export default SpendList;
