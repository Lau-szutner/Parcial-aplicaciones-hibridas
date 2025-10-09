import { useEffect, useState } from 'react';
import SharedSpend from '../components/SharedSpend.jsx';
import { fetchSharedSpends } from '../lib/utils.js';

const SharedSpends = () => {
  const [sharedSpends, setSharedSpends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerGastos = async () => {
      try {
        const data = await fetchSharedSpends();

        if (!data) {
          setError('No se encontraron gastos compartidos');
        } else {
          setSharedSpends(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerGastos();
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
