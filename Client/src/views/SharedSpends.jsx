import { useEffect, useState } from 'react';
import SharedSpend from '../components/SharedSpend.jsx';
import { getSharedSpends } from '../lib/utils.js';

const SharedSpends = () => {
  const [sharedSpends, setSharedSpends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerGastos = async () => {
      try {
        const data = await getSharedSpends();

        setSharedSpends(data);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerGastos();
  }, []);

  if (loading)
    return <p className="text-white">Cargando gastos compartidos...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
      {sharedSpends.map((spend) => (
        <SharedSpend
          key={spend._id}
          title={spend.title}
          description={spend.description}
          amount={spend.amount}
          categoria={spend.category}
          email={spend.sharedEmail}
          createdAt={new Date(spend.createdAt).toLocaleString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        />
      ))}
    </div>
  );
};

export default SharedSpends;
