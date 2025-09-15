import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spendValidationSchema } from '../validation/spendValidationSchema';
import axios from 'axios'; // Importar axios
import Cookies from 'js-cookie'; // Importar js-cookie para manejar las cookies

const SpendForm = ({ email, onSubmit }) => {
  const [categoria, setCategoria] = useState('Comida');
  const categorias = [
    'Comida',
    'Servicios',
    'Gastos varios',
    'Transporte',
    'Salud',
  ];

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
    defaultValues: {
      title: '',
      amount: '',
      description: '',
    },
  });

  // Al enviar el formulario, incluir el email en los datos
  const handleFormSubmit = async (data) => {
    // Obtener el token desde las cookies
    const token = Cookies.get('token');

    console.log('Token enviado:', `Bearer ${token}`);
    // Verifica si el token está presente
    if (!token) {
      alert('No se encontró un token de autenticación');
      return;
    }

    const formData = {
      ...data,
      email, // Agregar email principal del usuario
      category: categoria,
      sharedEmail: data.sharedEmail || null, // Asegurar que sea null si no se ingresa
    };

    try {
      // Realizar la solicitud POST al backend para crear un gasto
      const response = await axios.post(
        'http://localhost:3000/spend',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Usar el token de las cookies
          },
        }
      );

      // Llamar a la función onSubmit con la respuesta del backend
      onSubmit(response.data);
      alert('Gasto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el gasto:', error);
      alert('Error al crear el gasto');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6 text-black"
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

      {/*Categoria*/}
      <div className="mt-4 flex flex-wrap gap-3">
        {categorias.map((categoriaOption) => (
          <div
            key={categoriaOption}
            onClick={() => handleCategoriaClick(categoriaOption)}
            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium text-white text-center transition-colors duration-200 ease-in-out ${
              categoria === categoriaOption
                ? 'bg-indigo-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {categoriaOption}
          </div>
        ))}
      </div>

      {/* Usuario compartido */}
      <div className="space-y-2">
        <label
          htmlFor="sharedEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Correo del usuario compartido (opcional)
        </label>
        <input
          id="sharedEmail"
          type="email"
          {...register('sharedEmail')}
          className={`w-full p-3 border ${
            errors.sharedEmail ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.sharedEmail && (
          <p className="text-sm text-red-500">{errors.sharedEmail.message}</p>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <span>Categoría seleccionada: </span>
        <span className="font-semibold">{categoria}</span>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Enviar
      </button>
    </form>
  );
};

export default SpendForm;
