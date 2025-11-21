import express from 'express';
import { createCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/createCategory', createCategory);

export default router;
