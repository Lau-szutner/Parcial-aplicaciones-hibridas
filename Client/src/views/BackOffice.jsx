import { getAllUsers, deleteUser } from '../lib/utils';
import { useState, useEffect } from 'react';

const BackOffice = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const totalUser = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    totalUser();
  }, []);

  async function handleDeleteUser(userId) {
    console.log(userId);
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Usuarios registrados</h2>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user._id} // 👈 importante si usás MongoDB
              className="border p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm ">{user.email}</p>
              </div>

              <button
                onClick={() => handleDeleteUser(user._id)}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BackOffice;
