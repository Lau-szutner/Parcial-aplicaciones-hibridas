// components/Spends.jsx
import Spend from './Spend.jsx';
import { useEffect, useState } from 'react';
import {
  fetchAllSpends,
  deleteSpendById,
  editSpendById,
} from '../lib/utils.js';

const Spends = () => {
  const [spends, setSpends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSpends = async () => {
      setLoading(true);
      const { data, error } = await fetchAllSpends();
      if (error) setError(error);
      if (data) setSpends(data);
      setLoading(false);
    };

    loadSpends();
  }, []);

  async function handleDelete(id) {
    const { success, message, error } = await deleteSpendById(id);

    if (success) {
      console.log(message);
      setSpends((prev) => prev.filter((s) => s._id !== id));
    } else {
      console.error(error);
      setError(error);
    }
  }

  async function handleEditSpend(id, updatedSpendData) {
    const { success, message, updatedSpend } = await editSpendById(
      id,
      updatedSpendData
    );

    if (success) {
      setSpends(
        spends.map((spend) =>
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
          onEdit={(updatedSpend) => handleEditSpend(spend._id, updatedSpend)} // Envía los datos editados
        />
      ))}
    </div>
  );
};

export default Spends;
