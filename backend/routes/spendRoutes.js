// routes/spendRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Middleware para proteger las rutas
import {
  getSpend,
  createSpend,
  deleteSpend,
  editSpend,
} from '../controllers/spendController.js'; // Controladores de gastos

const router = express.Router();

// Ruta para obtener los gastos del usuario autenticado
router.get('/', protect, getSpend); // protect asegura que el usuario esté autenticado

// Ruta para crear un nuevo gasto, solo accesible para usuarios autenticados
router.post('/', protect, createSpend); // protect asegura que el usuario esté autenticado

// routes/spendRoutes.js
router.delete('/:id', protect, deleteSpend); // Ruta para eliminar el gasto por ID

router.put('/:id', protect, editSpend);
export default router;
