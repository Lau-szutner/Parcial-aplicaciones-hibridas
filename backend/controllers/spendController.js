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

// Crear un gasto
export const createSpend = async (req, res) => {
  const { title, amount, description, category, email, sharedEmail } = req.body; // Incluir sharedEmail
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
      sharedEmail: sharedEmail || null, // Guardar null si no se ingresa
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
  const { title, amount, description, category, sharedEmail } = req.body; // Datos a actualizar

  try {
    // Buscar y actualizar el gasto con los datos proporcionados
    const updatedSpend = await Spend.findByIdAndUpdate(
      id,
      {
        title, // Título del gasto
        amount, // Monto del gasto
        description, // Descripción del gasto
        category, // Categoría seleccionada
        sharedEmail: sharedEmail || null, // Email compartido (si aplica)
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
