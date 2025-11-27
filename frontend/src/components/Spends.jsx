// components/Spends.jsx
import Spend from './Spend.jsx';
import { useEffect, useState } from 'react';
import { deleteSpendById, editSpendById } from '../lib/utils.js';

const Spends = ({ spendsData }) => {
  const [spends, setSpends] = useState([]); // ✅ Inicializar como array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // ✅ Siempre aseguramos que sea array (vacío si no lo es)
    setSpends(Array.isArray(spendsData) ? spendsData : []);

    setLoading(false);
  }, [spendsData]);

  // ❌ Antes se rompía cuando spends era undefined
  // Ahora siempre es array, por lo que map() es seguro

  async function handleDelete(id) {
    const { success, error } = await deleteSpendById(id);

    if (success) {
      // ✅ Elimina correctamente del estado
      setSpends((prev) => prev.filter((s) => s._id !== id));
    } else {
      setError(error);
    }
  }

  async function handleEditSpend(id, updatedSpendData) {
    const { success, message } = await editSpendById(id, updatedSpendData);

    if (success) {
      setSpends((prev) =>
        prev.map((spend) =>
          spend._id === id ? { ...spend, ...updatedSpendData } : spend
        )
      );
    } else {
      console.log(message);
    }
  }

  if (loading) return <p>Cargando gastos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5 place-items-center">
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
          onEdit={(updatedSpend) => handleEditSpend(spend._id, updatedSpend)}
        />
      ))}
    </div>
  );
};

export default Spends;
