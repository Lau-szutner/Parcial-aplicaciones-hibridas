import Spend from '../models/spendModel.js';
import {
  validateEmail,
  getAllspendsByEmail,
  getSpendsByDate,
  validateNewSpend,
  loadNewSpendData,
} from '../services/spendServices.js';

import {
  handleGetSpendsByEmailError,
  handleGetSpendsByMonthError,
  handleCreateSpendError,
} from '../utils/errorHandler.js';

export const getSpendsByEmail = async (req, res) => {
  try {
    const { email } = req.user;
    await validateEmail(email);
    const spends = await getAllspendsByEmail(email);

    res.status(200).json(spends);
  } catch (error) {
    handleGetSpendsByEmailError(error, res);
  }
};

export const getSpendsByMonth = async (req, res) => {
  try {
    const { email } = req.user;
    const { year, month } = req.query;

    await validateEmail(email);
    const spends = await getSpendsByDate(email, year, month);

    res.status(200).json(spends);
  } catch (error) {
    handleGetSpendsByMonthError(error, res);
  }
};

export const createSpend = async (req, res) => {
  const { title, amount, description, category, email, sharedWith } = req.body;
  const userId = req.user._id;

  try {
    validateNewSpend(email, category);
    const savedSpend = loadNewSpendData(
      title,
      amount,
      description,
      category,
      email,
      sharedWith,
      userId
    );
    res.status(201).json(savedSpend);
  } catch (error) {
    handleCreateSpendError(error);
  }
};

// Eliminar un gasto
export const deleteSpendById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del gasto desde los parámetros de la URL

  try {
    const deletedSpend = await Spend.findByIdAndDelete(id); // Eliminar el gasto con el ID proporcionado

    if (!deletedSpend) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    res.status(200).json({ message: 'Gasto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el gasto:', error);
    res.status(500).json({ message: 'Error al eliminar el gasto' });
  }
};
// Editar un gasto
export const editSpendById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del gasto desde los parámetros de la URL
  const { title, amount, description, category, sharedWith } = req.body; // Datos a actualizar

  try {
    // Buscar y actualizar el gasto con los datos proporcionados
    const updatedSpend = await Spend.findByIdAndUpdate(
      id,
      {
        title, // Título del gasto
        amount, // Monto del gasto
        description, // Descripción del gasto
        category, // Categoría seleccionada
        sharedWith: sharedWith || null, // Email compartido (si aplica)
      },
      { new: true } // Retornar el documento actualizado
    );

    // Verificar si se encontró y actualizó el gasto
    if (!updatedSpend) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }

    res.status(200).json(updatedSpend); // Retornar el gasto actualizado
  } catch (error) {
    console.error('Error al editar el gasto:', error);
    res.status(500).json({ message: 'Error al editar el gasto' });
  }
};

export const getSharedSpends = async (req, res) => {
  try {
    const { email } = req.user;

    const spends = await Spend.find({
      email: email,
      sharedWith: { $ne: null },
    });

    if (!spends.length) {
      return res
        .status(404)
        .json({ message: 'No se encontraron gastos compartidos' });
    }

    res.status(200).json(spends);
  } catch (error) {
    console.error('Error al obtener los gastos compartidos:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const getSharedSpendsWithMe = async (req, res) => {
  try {
    const { email } = req.user;

    const spends = await Spend.find({
      sharedWith: email,
    });

    if (!spends.length) {
      return res
        .status(404)
        .json({ message: 'No se encontraron gastos compartidos' });
    }

    res.status(200).json(spends);
  } catch (error) {
    console.error('Error al obtener los gastos compartidos:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
