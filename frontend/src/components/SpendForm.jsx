import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spendValidationSchema } from '../validation/spendValidationSchema';
import axios from 'axios';
import Cookies from 'js-cookie';

const SpendForm = ({ email, onSubmit }) => {
  const [showNewCategory, setShowNewCategory] = useState(true);
  const [setNewCategory, setMName] = useState('');
  const [message, setMessage] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const BASE_URL = 'http://127.0.0.1:3000';

  const handleNewCategory = (event) => {
    setMName(event.target.value);
  };

  const handleNewCategorySubmit = async () => {
    setMessage(null); // Limpiar mensajes anteriores

    if (setNewCategory.trim() === '') {
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
      const response = await axios.post(
        `${BASE_URL}/category/newCategory`,
        { name: setNewCategory }, // <-- DATA (setNewCategory) enviada en el body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({
        type: 'success',
        text: `Categoría "${setNewCategory}" creada con éxito.`,
      });
      setMName('');
      setShowNewCategory(false);
      await fetchCategories();
      setCategoria(setNewCategory);
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      setMessage({
        type: 'error',
        text: 'Error al crear la categoría. Inténtalo de nuevo.',
      });
    }
  };

  const handleCategoriaClick = (categoriaSeleccionada) => {
    setCategoria(categoriaSeleccionada);
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(spendValidationSchema),
    defaultValues: { title: '', amount: '', description: '' },
  });

  const handleFormSubmit = async (data) => {
    const token = Cookies.get('token');
    console.log('Token enviado:', `Bearer ${token}`);
    if (!token) {
      alert('No se encontró un token de autenticación');
      return;
    }
    const formData = {
      ...data,
      email,
      category: categoria,
      sharedWith: data.sharedWith || null,
    };
    try {
      console.log(formData);
      const response = await axios.post(`${BASE_URL}/spend`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      onSubmit(response.data);
      alert('Gasto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el gasto:', error);
      alert('Error al crear el gasto');
    }
  };

  const fetchCategories = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('No hay token de usuario disponible.');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/category/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const dataJson = await response.json();
      const categoryNames = dataJson.map((category) => category.name);
      setCategorias(categoryNames);
      if (!categoria && categoryNames.length > 0)
        setCategoria(categoryNames[0]);
    } catch (error) {
      console.error('Error de red o servidor:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto text-black"
    >
      <h2 className="text-2xl font-semibold">Gastos</h2>

      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Título
        </label>
        <input
          id="title"
          {...register('title')}
          className={`w-full p-3 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Amount */}
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
          {...register('amount')}
          className={`w-full p-3 border ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id="description"
              {...field}
              className={`w-full p-3 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {categorias.map((categoriaOption) => (
          <div
            key={categoriaOption}
            onClick={() => handleCategoriaClick(categoriaOption)}
            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium text-white flex items-center justify-center transition-colors duration-200 ease-in-out ${
              categoria === categoriaOption
                ? 'bg-indigo-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            <p className="m-0">{categoriaOption}</p>
          </div>
        ))}
        {showNewCategory == false && (
          <button
            type="button"
            onClick={() => setShowNewCategory(true)}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md cursor-pointer transition duration-150 flex-shrink-0"
            title="Guardar nueva categoría"
          >
            Nueva Categoria
          </button>
        )}
      </div>

      {showNewCategory && (
        <div className="mt-4 flex items-end gap-3  rounded-lg ">
          <div className="space-y-1 w-full">
            <label
              htmlFor="setNewCategory"
              className="block text-sm font-semibold text-gray-700"
            >
              Nombre de la Nueva Categoría
            </label>
            <input
              id="setNewCategory"
              value={setNewCategory}
              onChange={handleNewCategory}
              placeholder="Ej: Viajes, Regalos, Inversiones"
              className={`w-full p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150`}
            />
          </div>

          <button
            type="button"
            onClick={handleNewCategorySubmit}
            className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md cursor-pointer transition duration-150 flex-shrink-0"
            title="Guardar nueva categoría"
          >
            Agregar categoria
          </button>

          <button
            type="button"
            onClick={() => setShowNewCategory(false)}
            className="p-3 bg-red-600 hover:bg-red-800 text-white rounded-xl shadow-md cursor-pointer transition duration-150 flex-shrink-0"
            title="Guardar nueva categoría"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Usuario compartido */}
      <div className="space-y-2">
        <label
          htmlFor="sharedWith"
          className="block text-sm font-medium text-gray-700"
        >
          Correo del usuario compartido (opcional)
        </label>
        <input
          id="sharedWith"
          type="email"
          {...register('sharedWith')}
          className={`w-full p-3 border ${
            errors.sharedWith ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.sharedWith && (
          <p className="text-sm text-red-500">{errors.sharedWith.message}</p>
        )}
      </div>

      {/* Submit Button */}
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
