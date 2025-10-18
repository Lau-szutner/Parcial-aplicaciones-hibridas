import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import spendRoutes from './routes/spendRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', (req, res) => {
  res.json({ message: 'this is a message from cors' });
});

app.use('/spend', protect, spendRoutes);
app.use('/auth', authRoutes);
app.use('/backOffice', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexión con MongoDB exitosa'))
  .catch((err) => console.log('Error en la conexión', err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
