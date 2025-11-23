import { useState, useEffect } from 'react';
import { createSpend } from '../lib/utils';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

const SpendForm = ({ email, onSubmit }) => {
  const [title, setTitle] = useState('Taxi al trabajo');
  const [amount, setAmount] = useState('1200');
  const [description, setDescription] = useState('Viaje al trabajo');
  const [sharedWith, setSharedWith] = useState('');
  const [category, setCategory] = useState('Viajes');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      amount,
      description,
      category,
      email,
      sharedWith: sharedWith || null,
    };

    const { data, error } = await createSpend(formData);

    if (error) {
      console.error('Error al crear el gasto:', error);
      alert('Error al crear el gasto');
      return;
    }

    onSubmit && onSubmit(data);
    alert('Gasto creado exitosamente');

    // limpiar campos
    setTitle('');
    setAmount('');
    setDescription('');
    setSharedWith('');
  };

  const fetchCategories = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/category/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const names = Array.isArray(data) ? data.map((c) => c.name) : [];
      setCategories(names);
      if (!selectedCategory && names.length > 0) setSelectedCategory(names[0]);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto text-black"
    >
      <h2 className="text-2xl font-semibold">Gastos</h2>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Título
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Monto
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2 mt-4">
        <label
          htmlFor="sharedWith"
          className="block text-sm font-medium text-gray-700"
        >
          Correo del usuario compartido (opcional)
        </label>
        <input
          id="sharedWith"
          type="email"
          value={sharedWith}
          onChange={(e) => setSharedWith(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 my-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Cargar
      </button>
    </form>
  );
};

export default SpendForm;
