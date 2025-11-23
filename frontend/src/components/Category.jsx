import { useState, useEffect } from 'react';

const Category = () => {
  const [isNewCategoryVisible, setIsNewCategoryVisible] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [message, setMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // CATEGORIAS
  const handleNewCategoryNameChange = (e) => setNewCategoryName(e.target.value);

  const handleCreateNewCategory = async () => {
    setMessage(null);

    if (newCategoryName.trim() === '') {
      setMessage({
        type: 'error',
        text: 'El nombre de la categoría no puede estar vacío.',
      });
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      setMessage({
        type: 'error',
        text: 'No se encontró un token de autenticación.',
      });
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/category/newCategory`,
        { name: newCategoryName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: 'success',
        text: `Categoría "${newCategoryName}" creada con éxito.`,
      });
      setNewCategoryName('');
      setIsNewCategoryVisible(false);
      await fetchCategories();
      setSelectedCategory(newCategoryName);
    } catch (err) {
      console.error('Error al crear la categoría:', err);
      setMessage({
        type: 'error',
        text: 'Error al crear la categoría. Inténtalo de nuevo.',
      });
    }
  };

  const handleCategoryClick = (category) => setSelectedCategory(category);

  return (
    <div>
      {' '}
      <div className="mt-4 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium text-white flex items-center justify-center transition-colors duration-200 ease-in-out ${
              selectedCategory === cat
                ? 'bg-indigo-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            <p className="m-0">{cat}</p>
          </div>
        ))}
        {!isNewCategoryVisible && (
          <button
            type="button"
            onClick={() => setIsNewCategoryVisible(true)}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md cursor-pointer transition duration-150 flex-shrink-0"
          >
            Nueva Categoria
          </button>
        )}
      </div>
      {isNewCategoryVisible && (
        <div className="mt-4 flex items-end gap-3 rounded-lg">
          <div className="space-y-1 w-full">
            <label
              htmlFor="newCategoryName"
              className="block text-sm font-semibold text-gray-700"
            >
              Nombre de la Nueva Categoría
            </label>
            <input
              id="newCategoryName"
              value={newCategoryName}
              onChange={handleNewCategoryNameChange}
              placeholder="Ej: Viajes, Regalos, Inversiones"
              className="w-full p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
            />
          </div>

          <button
            type="button"
            onClick={handleCreateNewCategory}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md cursor-pointer transition duration-150 flex-shrink-0"
          >
            Agregar categoria
          </button>

          <button
            type="button"
            onClick={() => setIsNewCategoryVisible(false)}
            className="p-3 bg-red-600 hover:bg-red-800 text-white rounded-xl shadow-md cursor-pointer transition duration-150 flex-shrink-0"
          >
            Cerrar
          </button>
        </div>
      )}
      {message && (
        <div
          className={`mt-2 p-2 rounded ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Category;
