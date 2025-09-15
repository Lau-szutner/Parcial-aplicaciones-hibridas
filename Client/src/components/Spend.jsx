import React, { useState } from 'react';

const Spend = ({
  title,
  description,
  amount,
  categoria,
  createdAt,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSpend, setEditedSpend] = useState({
    title,
    description,
    amount,
    categoria,
  });

  const handleChange = (e) => {
    setEditedSpend({
      ...editedSpend,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(editedSpend); // Llama al prop `onEdit` y pasa `editedSpend`
      setIsEditing(false); // Sal del modo edición
    } else {
      console.error('onEdit no está definido');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-sm">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedSpend.title}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            value={editedSpend.description}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="amount"
            value={editedSpend.amount}
            onChange={handleChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="mt-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Guardar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="mt-4 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 ml-2"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <h3 className="text-sm text-gray-500">{createdAt}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-500 text-sm">Monto:</span>
            <span className="text-green-600 font-bold text-2xl">${amount}</span>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span>Categoría: </span>
            <span className="font-semibold">{categoria}</span>
          </div>
          <button
            onClick={onDelete}
            className="mt-6 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Eliminar
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ml-2"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default Spend;
