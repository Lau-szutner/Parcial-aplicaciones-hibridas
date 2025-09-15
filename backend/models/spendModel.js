import mongoose from 'mongoose';

// Definir el esquema
const spendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'El monto es obligatorio'],
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Comida', 'Servicios', 'Gastos varios', 'Transporte', 'Salud'],
    required: [true, 'La categoría es obligatoria'],
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Por favor ingrese un correo electrónico válido'],
  },
  sharedEmail: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Por favor ingrese un correo electrónico válido'],
    default: null, // No es obligatorio
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo a partir del esquema
const Spend = mongoose.model('Spend', spendSchema);

// Exportar el modelo
export default Spend;
