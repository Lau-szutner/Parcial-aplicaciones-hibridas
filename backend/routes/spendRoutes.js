import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getSpend,
  createSpend,
  deleteSpendById,
  editSpendById,
  getSpendsByMonth,
  getSharedSpends,
  getSharedSpendsWithMe,
} from '../controllers/spendController.js';

const router = express.Router();

router.get('/', protect, getSpend);

router.get('/getSpendsByMonth', protect, getSpendsByMonth);

router.get('/getSharedSpends', protect, getSharedSpends);

router.get('/getSharedSpendsWithMe', protect, getSharedSpendsWithMe);

router.post('/', protect, createSpend);

router.delete('/:id', protect, deleteSpendById);

router.put('/:id', protect, editSpendById);

export default router;
