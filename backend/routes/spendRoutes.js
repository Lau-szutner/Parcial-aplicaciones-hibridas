// routes/spendRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Middleware para proteger las rutas
import {
  getSpend,
  createSpend,
  deleteSpendsById,
  editSpendById,
  getSpendsByMonth,
  getSharedSpends,
} from '../controllers/spendController.js'; // Controladores de gastos

const router = express.Router();

// Ruta para obtener los gastos del usuario autenticado
router.get('/', protect, getSpend); // protect asegura que el usuario esté autenticado

router.get('/getSpendsByMonth', protect, getSpendsByMonth);
// Ruta para crear un nuevo gasto, solo accesible para usuarios autenticados

router.get('/getSharedSpends', protect, getSharedSpends);

router.post('/', protect, createSpend); // protect asegura que el usuario esté autenticado

// routes/spendRoutes.js
router.delete('/:id', protect, deleteSpendsById); // Ruta para eliminar el gasto por ID

router.put('/:id', protect, editSpendById);

export default router;
