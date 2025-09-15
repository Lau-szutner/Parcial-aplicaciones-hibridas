import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import Cookies from 'js-cookie'; // Importamos js-cookie para manejar cookies

// Validación de formulario con Yup
const registerValidationSchema = yup.object({
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar tu contraseña'),
});

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

const RegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para determinar si es login o registro
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(
      isLogin ? loginValidationSchema : registerValidationSchema
    ),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/register',
        data
      );
      Cookies.set('token', response.data.token, { expires: 7 }); // Guardamos el token en cookies
      Cookies.set('email', data.email, { expires: 7 }); // Guardamos el email en cookies
      console.log('Registro exitoso, token y email almacenados en cookies');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('email', {
        type: 'manual',
        message: 'Hubo un error al registrarse',
      });
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        data
      );
      Cookies.set('token', response.data.token, { expires: 7 }); // Guardamos el token en cookies
      Cookies.set('email', data.email, { expires: 7 }); // Guardamos el email en cookies
      console.log('Login exitoso, token y email almacenados en cookies');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('email', {
        type: 'manual',
        message: 'Credenciales incorrectas',
      });
    }
  };

  // Cambiar entre login y registro
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <form
      onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
      className="bg-stone-700 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6 text-black"
    >
      <h2 className="text-2xl font-semibold text-white">
        {isLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}
      </h2>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`w-full p-3 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`w-full p-3 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password (solo para registro) */}
      {!isLogin && (
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className={`w-full p-3 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      {/* Error message */}
      {errors.email && errors.email.type === 'manual' && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {isLogin ? 'Iniciar Sesión' : 'Registrar'}
      </button>

      {/* Toggle between login and register */}
      <p className="text-sm text-center text-white">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button
          type="button"
          onClick={toggleForm}
          className="text-indigo-600 ml-1"
        >
          {isLogin ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
