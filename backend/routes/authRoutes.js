import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  loginAdminUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/backOffice', loginAdminUser);

router.post('/logout', logoutUser);

export default router;
