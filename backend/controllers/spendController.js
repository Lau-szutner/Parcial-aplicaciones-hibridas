import Spend from '../models/spendModel.js';

// Obtener los gastos del usuario autenticado
export const getSpend = async (req, res) => {
  try {
    const { email } = req.user; // Obtener el email del usuario autenticado

    // Verificar si el email está presente
    if (!email) {
      return res.status(400).json({ message: 'Email no proporcionado' });
    }

    // Filtrar los gastos por el email del usuario autenticado
    const spends = await Spend.find({ email });

    res.status(200).json(spends); // Retornar los gastos encontrados
  } catch (error) {
    console.error('Error al obtener los gastos:', error);
    res.status(500).json({ message: 'Error al obtener los gastos' });
  }
};

export const getSpendsByMonth = async (req, res) => {
  try {
    const { email } = req.user;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        message: 'Debes especificar el año y el mes (ej: ?year=2025&month=9).',
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const spends = await Spend.find({
      email: email,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({ createdAt: 1 });

    if (!spends.length) {
      return res
        .status(404)
        .json({ message: 'No se encontraron gastos para ese mes.' });
    }

    res.status(200).json(spends);
  } catch (error) {
    console.error('Error al obtener los gastos por mes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const getSharedSpends = async (req, res) => {
  try {
    const { email } = req.user;
    const { sharedWith } = req.body;

    const spends = await Spend.find({
      email,
      sharedWith,
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

// Crear un gasto
export const createSpend = async (req, res) => {
  const { title, amount, description, category, email, sharedWith } = req.body; // Incluir sharedWith
  const userId = req.user._id; // Obtener el userId del usuario autenticado
  console.log(req.user);
  try {
    // Validar que los campos requeridos estén presentes
    if (!email || !category) {
      return res
        .status(400)
        .json({ message: 'El email y la categoría son obligatorios' });
    }

    // Crear un nuevo gasto asociado al usuario autenticado
    const newSpend = new Spend({
      userId, // Asignar el userId al gasto
      title, // Título del gasto
      amount, // Monto del gasto
      description, // Descripción del gasto
      category, // Categoría seleccionada
      email, // Email del usuario autenticado
      sharedWith: sharedWith || null, // Guardar null si no se ingresa
      createdAt: new Date(), // Fecha de creación
    });

    const savedSpend = await newSpend.save(); // Guardar el gasto en la base de datos
    res.status(201).json(savedSpend); // Retornar el gasto guardado
  } catch (error) {
    console.error('Error al crear el gasto:', error);
    res.status(400).json({ message: error.message }); // Manejo de errores
  }
};

// Eliminar un gasto
export const deleteSpend = async (req, res) => {
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
export const editSpend = async (req, res) => {
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
