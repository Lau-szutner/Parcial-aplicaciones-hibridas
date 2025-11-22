import { Category } from '../models/categoryModel.js';

export const newCategory = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name } = req.body;

    const category = await Category.create({ user: userId, name: name });

    res.status(201).json({
      message: 'Categoría creada con éxito',
      category: category,
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  const userId = req.user._id;

  try {
    const category = await Category.find({ user: userId });

    res.status(200).json(category);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};
