import express from 'express';
import {
  getAllUsers,
  deleteUser,
} from '../controllers/backOfficeController.js';

const router = express.Router();

router.get('/users', getAllUsers);

router.delete('/users/deleteUser/:id', deleteUser);

// router.post('/logout', logoutUser);

export default router;
