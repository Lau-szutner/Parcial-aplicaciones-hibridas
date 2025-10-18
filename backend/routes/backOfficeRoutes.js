import express from 'express';
import { getAllUsers } from '../controllers/backOfficeController.js';

const router = express.Router();

router.get('/users', getAllUsers);

// router.post('/login', loginUser);

// router.post('/logout', logoutUser);

export default router;
