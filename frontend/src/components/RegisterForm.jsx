import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Validación de formulario con Yup
const registerValidationSchema = yup.object({
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
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
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .required('La contraseña es obligatoria'),
});

const RegisterForm = ({ setEmail, setToken, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  // Usamos la variable de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('email', data.email, { expires: 7 });

      setEmail(data.email);
      setToken(response.data.token);
      navigate('/gastos');
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
      const response = await axios.post(`${API_URL}/auth/login`, data);
      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('email', data.email, { expires: 7 });

      setEmail(data.email);
      setToken(response.data.token);
      navigate('/gastos');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('email', {
        type: 'manual',
        message: 'Credenciales incorrectas',
      });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <form
      onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
      className="bg-stone-700 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6 text-white w-full"
    >
      <h2 className="text-2xl font-semibold">
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
        <div className="flex">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`flex-1 p-3 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="px-3 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 flex items-center justify-center cursor-pointer"
            aria-label={
              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7 1.07-2.31 2.89-4.19 5.11-5.35" />
                <path d="M1 1l22 22" />
                <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
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
          <div className="flex">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className={`flex-1 p-3 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="px-3 bg-gray-200 text-gray-700 rounded-r-lg  hover:bg-gray-300 flex items-center justify-center cursor-pointer"
              aria-label={
                showConfirmPassword
                  ? 'Ocultar confirmación'
                  : 'Mostrar confirmación'
              }
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7 1.07-2.31 2.89-4.19 5.11-5.35" />
                  <path d="M1 1l22 22" />
                  <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
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
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      >
        {isLogin ? 'Iniciar Sesión' : 'Registrar'}
      </button>

      {/* Toggle between login and register */}
      <p className="text-sm text-center text-white ">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button
          type="button"
          onClick={toggleForm}
          className="text-green-500 ml-1 font-bold cursor-pointer"
        >
          {isLogin ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
