import { getAllUsers, deleteUser, getAllSpends } from '../../lib/utils';
import { useState, useEffect, Fragment } from 'react';

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const [spends, setSpends] = useState([]);
  const [openUserRows, setOpenUserRows] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSpends = async () => {
      try {
        const data = await getAllSpends();
        console.log(data);
        setSpends(data);
      } catch (error) {
        console.error('Error al obtener gastos:', error);
      }
    };
    fetchSpends();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const getUserSpends = (userId) =>
    spends.filter((spend) => spend.userId === userId);

  const toggleRow = (userId) => {
    setOpenUserRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="p-6  min-h-screen text-white">
      <h2 className="text-xl font-semibold mb-4">Usuarios registrados</h2>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="w-full border border-white text-white">
          <thead>
            <tr className="bg-gray-900 border-b border-white">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Gastos</th>
              <th className="p-2 text-left w-40">Ver detalle</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const userSpends = getUserSpends(user._id);

              return (
                <Fragment key={user._id}>
                  {/* Fila del usuario */}
                  <tr className="border-b border-white">
                    <td className="p-2">{user.email}</td>
                    <td className="p-2 font-semibold">{userSpends.length}</td>

                    <td className="p-2">
                      <button
                        onClick={() => toggleRow(user._id)}
                        className="text-blue-400 hover:underline"
                      >
                        {openUserRows[user._id] ? 'Ocultar' : 'Ver gastos'}
                      </button>
                    </td>

                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>

                  {/* Fila expandida */}
                  {openUserRows[user._id] && (
                    <tr key={`spends-${user._id}`}>
                      <td colSpan="4" className="p-4">
                        {userSpends.length === 0 ? (
                          <p className="text-sm">El usuario no tiene gastos.</p>
                        ) : (
                          <table className="w-full border border-white text-white">
                            <thead>
                              <tr className="bg-green-800 border-b">
                                <th className="p-2 text-left">Título</th>
                                <th className="p-2 text-left">Monto</th>
                                <th className="p-2 text-left">Descripción</th>
                                <th className="p-2 text-left">Fecha</th>
                              </tr>
                            </thead>

                            <tbody>
                              {userSpends.map((spend) => (
                                <tr
                                  key={spend._id}
                                  className="border-b border-white"
                                >
                                  <td className="p-2">{spend.title}</td>
                                  <td className="p-2">${spend.amount}</td>
                                  <td className="p-2">{spend.description}</td>
                                  <td className="p-2">
                                    {new Date(
                                      spend.createdAt
                                    ).toLocaleDateString('es-AR')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalUsers;
