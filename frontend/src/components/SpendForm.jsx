import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createSpend } from '../lib/utils';
import Category from './Category';

// Schema de validación con Yup
const spendValidationSchema = yup.object({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),

  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .positive('El monto debe ser mayor a 0')
    .required('El monto es obligatorio'),

  description: yup
    .string()
    .max(200, 'Máximo 200 caracteres')
    .required('La descripción es obligatoria'),

  category: yup.string().required('Debes seleccionar una categoría'),

  email: yup
    .string()
    .email('Email inválido')
    .required('Tu email es obligatorio'),

  sharedWith: yup.string().email('Email inválido').nullable().notRequired(),
});

const SpendForm = ({ email, onSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(spendValidationSchema),
    defaultValues: {
      title: '',
      amount: '',
      description: '',
      category: '',
      sharedWith: '',
      email: email || '',
    },
  });

  const onSubmitForm = async (data) => {
    const { data: result, error } = await createSpend(data);

    if (error) {
      console.error('Error al crear gasto:', error);
      return;
    }

    onSubmit && onSubmit(result);

    reset();
  };

  const handleCategorySelect = (value) => {
    setValue('category', value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto text-black space-y-4"
    >
      <h2 className="text-2xl font-semibold">Registrar Gasto</h2>

      {/* Título */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Título</label>
        <input
          {...register('title')}
          className={`w-full p-3 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-lg`}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Monto */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Monto</label>
        <input
          type="number"
          {...register('amount')}
          className={`w-full p-3 border ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          } rounded-lg`}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          {...register('description')}
          className={`w-full p-3 border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } rounded-lg`}
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Categoría</label>
        <Category categorySelected={handleCategorySelect} />
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Compartir con */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Compartir con (email, opcional)
        </label>
        <input
          {...register('sharedWith')}
          className={`w-full p-3 border ${
            errors.sharedWith ? 'border-red-500' : 'border-gray-300'
          } rounded-lg`}
        />
        {errors.sharedWith && (
          <p className="text-sm text-red-500">{errors.sharedWith.message}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500"
      >
        Cargar Gasto
      </button>
    </form>
  );
};

export default SpendForm;
