import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import spendRoutes from './routes/spendRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Rutas de autenticación
import { protect } from './middleware/authMiddleware.js'; // Middleware de autenticación
import cors from 'cors'; // Importa el paquete cors

dotenv.config();

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilitar CORS para todas las rutas
app.use(
  cors({
    origin: 'http://localhost:5173', // Asegúrate de que esto apunte a tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir Authorization en los encabezados
    credentials: true, // Permitir el envío de cookies
  })
);

// Middlewares
app.use(express.json()); // Solo esta línea es suficiente para parsear JSON
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos desde 'public'

// Rutas
app.get('/api/data', (req, res) => {
  res.json({ message: 'this is a message from cors' });
});

app.use('/spend', protect, spendRoutes); // Rutas de gastos, protegidas
app.use('/auth', authRoutes); // Rutas de autenticación, no protegidas

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas para las vistas de login y registro
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Conectar con MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexión con MongoDB exitosa'))
  .catch((err) => console.log('Error en la conexión', err));

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
