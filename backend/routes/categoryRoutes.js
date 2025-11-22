import express from 'express';
import {
  newCategory,
  getAllCategories,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/newCategory', newCategory);

router.get('/', getAllCategories);

export default router;
